import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import FormattedDate from '../../../components/Formating/FormattedDate';
import DatePicker from '../../../components/Input/DatePicker';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        let today = new Date();
        today.setHours(0, 0, 0, 0); // Đặt về đầu ngày
        this.state = {
            selectedDate: today.getTime(),
        };
    }
    componentDidMount() {
        console.log("check props: ",this.props);
        
    }
    componentDidUpdate(prevProps) {
    }
    handleChangeDate = (date) => {
        this.setState({
            selectedDate: date[0],
            selectedTime: [],
        }, () => {
            const { selectedDoctor, selectedDate } = this.state;
            if (selectedDoctor && selectedDate) {
                this.props.getDoctorSchedule({
                    doctorId: selectedDoctor.value,
                    date: new Date(selectedDate).getTime()
                });
            }
        });
    };
    render() {
        let { selectedDate } = this.state;
        return (
            <div className="manage-patient-container">
                <div className="m-p-title">
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className="manage-patient-body row">
                    <div className="col-4 form-group">
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleChangeDate}
                            className="form-control"
                            value={selectedDate}
                        />
                    </div>
                    <div className="col-12">
                        <table className='table table-bordered table-striped mt-4'>
                            <thead>
                                <tr className='table-primary'>
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
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Nguyễn Văn A</td>
                                    <td>Nam</td>
                                    <td>Hà Nội</td>
                                    <td><FormattedDate date={new Date()} /></td>
                                    <td>Khám tổng quát</td>
                                    <td>
                                        <button className='btn btn-primary btn-sm me-2'>Xác nhận</button>
                                        <button className='btn btn-secondary btn-sm'>Gửi hóa đơn</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Trần Thị B</td>
                                    <td>Nữ</td>
                                    <td>Hồ Chí Minh</td>
                                    <td><FormattedDate date={new Date()} /></td>
                                    <td>Khám tim mạch</td>
                                    <td>
                                        <button className='btn btn-primary btn-sm me-2'>Xác nhận</button>
                                        <button className='btn btn-secondary btn-sm'>Gửi hóa đơn</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        isLoadingListPatientForDoctor: state.admin.isLoadingListPatientForDoctor,
        listPatientForDoctor: state.admin.listPatientForDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getListPatientForDoctor: (doctorId, date) => dispatch(actions.getListPatientForDoctor(doctorId, date)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
