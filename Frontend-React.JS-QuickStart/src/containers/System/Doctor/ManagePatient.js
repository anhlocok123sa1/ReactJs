import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';
import RemedyModal from './RemedyModal';
import LoadingOverlay from 'react-loading-overlay'

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.state = {
      selectedDate: today.getTime(),
      doctorId: '',
      listPatient: [],
      isOpenRemedyModal: false,
      dataModal: {}
    };
  }

  componentDidMount() {
    const doctorId = this.props.user?.id;
    if (doctorId) {
      this.setState({ doctorId }, () => {
        this.props.getListPatientForDoctor({ doctorId, date: this.state.selectedDate });
      });
    }
  }

  componentDidUpdate(prevProps) {
    let { doctorId, selectedDate } = this.state
    if (prevProps.listPatientForDoctor !== this.props.listPatientForDoctor) {
      this.setState({ listPatient: this.props.listPatientForDoctor || [] });
    }
    if (prevProps.resultRemedy !== this.props.resultRemedy) {
      this.props.getListPatientForDoctor({ doctorId: this.state.doctorId, date: this.state.selectedDate });
    }
    if (prevProps.isSendingRemedy && !this.props.isSendingRemedy) {
      if (doctorId && selectedDate) {
        this.props.getListPatientForDoctor({ doctorId, date: selectedDate });
      }
    }
  }

  handleChangeDate = (date) => {
    const picked = Array.isArray(date) ? date[0] : date;
    const ms = new Date(picked).setHours(0, 0, 0, 0);
    this.setState({ selectedDate: ms }, () => {
      const { selectedDate, doctorId } = this.state;
      if (selectedDate && doctorId) {
        this.props.getListPatientForDoctor({ doctorId, date: selectedDate });
      }
    });
  };

  handleBtnConfirm = (item) => {
    this.setState({ isOpenRemedyModal: true, dataModal: item });
  };

  toggleRemedyModal = () => {
    this.setState((prev) => ({ isOpenRemedyModal: !prev.isOpenRemedyModal }));
  };

  handleSendRemedy = (data) => {
    this.props.sendRemedy(data);
  };

  render() {
    const { selectedDate, listPatient, dataModal, isOpenRemedyModal, doctorId } = this.state;
    const { language, isLoadingListPatientForDoctor, isSendingRemedy, resultRemedy } = this.props;

    return (
      <>
        <LoadingOverlay
          active={isSendingRemedy}
          spinner
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>

            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label>Chọn ngày khám</label>
                <DatePicker onChange={this.handleChangeDate} className="form-control" value={selectedDate} />
              </div>

              <div className="col-12">
                {isLoadingListPatientForDoctor ? (
                  <div className="generic-loading mt-4">
                    <div className="skeleton-card" />
                    <div className="skeleton-card" />
                    <div className="skeleton-card" />
                  </div>
                ) : (
                  <table className="table table-bordered table-striped mt-4">
                    <thead>
                      <tr className="table-primary">
                        <th scope="col">STT</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">Giới tính</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Thời gian khám</th>
                        <th scope="col">Lý do khám</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(listPatient || []).map((item, index) => (
                        <tr key={item.id || index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item?.patientData?.firstName || ''}</td>
                          <td>
                            {language === LANGUAGES.VI
                              ? item?.patientData?.genderData?.valueVi
                              : item?.patientData?.genderData?.valueEn}
                          </td>
                          <td>{item?.patientData?.address || ''}</td>
                          <td>
                            {language === LANGUAGES.VI
                              ? item?.timeTypeDataPatient?.valueVi
                              : item?.timeTypeDataPatient?.valueEn}
                          </td>
                          <td>{item?.reasonText || ''}</td>
                          <td>
                            <button className="btn btn-primary btn-sm me-2" onClick={() => this.handleBtnConfirm(item)}>
                              Xác nhận
                            </button>
                          </td>
                        </tr>
                      ))}
                      {(!listPatient || listPatient.length === 0) && (
                        <tr>
                          <td colSpan={7} className="text-center text-muted">
                            Không có bệnh nhân cho ngày này
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          <RemedyModal
            isOpen={isOpenRemedyModal}
            closeRemedyModal={this.toggleRemedyModal}
            dataModal={dataModal}
            onSendRemedy={this.handleSendRemedy}
            doctorId={doctorId}
            language={language}
          />


        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  language: state.app.language,
  isLoadingListPatientForDoctor: state.admin.isLoadingListPatientForDoctor,
  listPatientForDoctor: state.admin.listPatientForDoctor,
  user: state.user.userInfo,
  isSendingRemedy: state.admin.isSendingRemedy,
  resultRemedy: state.admin.resultRemedy,
});

const mapDispatchToProps = (dispatch) => ({
  getListPatientForDoctor: (payload) => dispatch(actions.getListPatientForDoctor(payload)),
  sendRemedy: (data) => dispatch(actions.sendRemedy(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);