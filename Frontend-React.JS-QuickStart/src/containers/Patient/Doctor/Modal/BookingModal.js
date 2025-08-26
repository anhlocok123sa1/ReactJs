import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import { LANGUAGES } from '../../../../utils'
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import 'moment/locale/vi';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from '../../../../store/actions'
import Select from "react-select"
import _ from 'lodash';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: [],
            doctorId: '',
            selectedGender: null,
            errors: {}
        }
    }
    validate = () => {
        const errors = {};
        const { firstName, lastName, phoneNumber, email, selectedGender } = this.state;
        if (!firstName) errors.firstName = 'Vui lòng nhập họ';
        if (!lastName) errors.lastName = 'Vui lòng nhập tên';
        if (!email) errors.email = 'Vui lòng nhập email';
        if (!phoneNumber) errors.phoneNumber = 'Vui lòng nhập số điện thoại';
        if (!selectedGender) errors.selectedGender = 'Vui lòng chọn giới tính';
        return errors;
    };

    componentDidMount() {
        this.props.getGenders();
    }

    capitalizeFirstLetter = (val) => {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language || prevProps.genders !== this.props.genders) {
            const genders = this.buildDataGender(this.props.genders);
            this.setState(prev => ({
                genders,
                selectedGender: prev.selectedGender
                    ? genders.find(g => g.value === prev.selectedGender.value) || genders[0]
                    : (genders[0] || null)
            }));
        }

        if (prevProps.dataTime !== this.props.dataTime && this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
            this.setState({ doctorId: this.props.dataTime.doctorId });
        }
        if (
            prevProps.isLoadingPatientBookingAppointment &&
            !this.props.isLoadingPatientBookingAppointment &&
            this.props.patientBookingAppointment
        ) {
            // reset form
            this.setState({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birthday: '',
                selectedGender: this.state.genders?.[0] || null,
                errors: {},
            });
            // đóng modal
            this.props.closeBookingModal?.();
        }
    }

    handleOnchangeInput = (e, id) => {
        let valueInput = e.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleOnchangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption })
    }

    handleConfirmBooking = async () => {
        const errors = this.validate();
        if (Object.keys(errors).length) {
            this.setState({ errors });
            return;
        }

        const { dataTime, language } = this.props;
        if (!dataTime || !dataTime.doctorId || !dataTime.timeType || !dataTime.date) return;

        const {
            firstName, lastName, phoneNumber, email, address, reason, birthday, selectedGender
        } = this.state;

        const timeString = this.buildTimeBooking(dataTime);
        const doctorName = this.buildDoctorName(dataTime);

        const payload = {
            firstName,
            lastName,
            phoneNumber,
            email,
            address,
            reason,
            // birthday: Date (ms) hoặc chuỗi ISO — tùy bạn; dưới đây convert ms
            birthday: birthday ? new Date(birthday).getTime() : null,
            selectedGender: selectedGender?.value, // CHỈ GỬI value ('M','F','O'…)
            doctorId: dataTime.doctorId,
            timeType: dataTime.timeType,
            date: dataTime.date,         // ms (startOf('day')) như bạn đang làm
            language,
            timeString,
            doctorName
        };

        try {
            this.setState({ isSubmitting: true });
            await this.props.savePatientBookingAppointment(payload);
            // Có thể toast thành công và đóng modal
            // toast.success('Đặt lịch thành công, vui lòng kiểm tra email để xác nhận');
            // this.props.closeBookingModal();
        } finally {
            this.setState({ isSubmitting: false });
        }
    };

    buildTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            const timeLabel =
                language === LANGUAGES.VI
                    ? dataTime?.timeTypeData?.valueVi
                    : dataTime?.timeTypeData?.valueEn;

            // `dataTime.date` là ms (startOf('day')) bạn đã truyền từ DoctorSchedule
            const m = moment(Number(dataTime.date || 0));
            const dateLabel =
                language === LANGUAGES.VI
                    ? this.capitalizeFirstLetter(m.locale('vi').format('dddd, DD/MM/YYYY'))
                    : m.locale('en').format('ddd, MM/DD/YYYY');

            return `${timeLabel} • ${dateLabel}`;
        }
        return ``
    };

    buildDoctorName = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name;
        }
        return ``
    }

    render() {
        let { isOpen, closeBookingModal, dataTime, language, } = this.props;
        let { firstName, lastName, phoneNumber, email, address, reason, birthday, genders, doctorId, selectedGender } = this.state
        // console.log('Check dataTime from bookingmodal: ', dataTime);



        return (
            <Modal
                isOpen={isOpen}
                toggle={closeBookingModal}
                centered
                backdrop
                size="lg"
                className="booking-modal-container"
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">
                            <FormattedMessage id="patient.booking.title" defaultMessage="Thông tin đặt lịch khám bệnh" />
                        </span>
                        <span className="right" onClick={closeBookingModal} role="button" aria-label="Close">
                            <i className="fas fa-times" />
                        </span>
                    </div>

                    <div className="booking-modal-body">
                        <ProfileDoctor
                            isShowDescriptionDoctor={false}
                            dataTime={dataTime}
                            doctorId={dataTime?.doctorId}
                        />
                        {/* Form thông tin bệnh nhân (placeholder — bạn có thể nối state/validate sau) */}
                        <div className="row form-group">
                            <div className="col-6">
                                <label><FormattedMessage id="patient.booking.lastName" defaultMessage="Họ" /></label>
                                <input className="form-control"
                                    value={lastName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'lastName')} />
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="patient.booking.firstName" defaultMessage="Tên" /></label>
                                <input className="form-control"
                                    value={firstName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'firstName')} />
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="patient.booking.phone" defaultMessage="Số điện thoại" /></label>
                                <input className="form-control"
                                    value={phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')} />
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="patient.booking.email" defaultMessage="Email" /></label>
                                <input className="form-control"
                                    value={email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')} />
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="patient.booking.address" defaultMessage="Địa chỉ" /></label>
                                <input className="form-control"
                                    value={address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')} />
                            </div>
                            <div className="col-12">
                                <label><FormattedMessage id="patient.booking.reason" defaultMessage="Lý do khám" /></label>
                                <textarea className="form-control" rows={3}
                                    value={reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')} />
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="patient.booking.birthday" defaultMessage="Ngày sinh" /></label>
                                <DatePicker
                                    onChange={(event) => this.handleOnchangeDatePicker(event)}
                                    className='form-control'
                                    value={birthday}
                                />
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="patient.booking.gender" defaultMessage="Giới tính" /></label>
                                <Select
                                    value={selectedGender}
                                    onChange={this.handleOnchangeSelect}
                                    options={genders}
                                    menuPlacement="top"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="booking-modal-footer">
                        <button
                            className="btn btn-primary"
                            onClick={() => this.handleConfirmBooking()}
                            disabled={this.props.isLoadingPatientBookingAppointment}
                        >
                            {this.props.isLoadingPatientBookingAppointment ? (
                                <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                            ) : (
                                <FormattedMessage id="patient.booking.confirm" defaultMessage="Xác nhận" />
                            )}
                        </button>
                        <button className="btn btn-secondary" onClick={closeBookingModal}>
                            <FormattedMessage id="patient.booking.cancel" defaultMessage="Hủy" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    genders: state.admin.genders,
    patientBookingAppointment: state.admin.patientBookingAppointment,
    isLoadingPatientBookingAppointment: state.admin.isLoadingPatientBookingAppointment,
});

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
        savePatientBookingAppointment: (data) => dispatch(actions.savePatientBookingAppointment(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookingModal));
