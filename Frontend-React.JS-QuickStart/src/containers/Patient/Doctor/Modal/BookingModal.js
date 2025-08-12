import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './BookingModal.scss';
import { Modal } from 'reactstrap'
import { LANGUAGES } from '../../../../utils'
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import 'moment/locale/vi';
import ProfileDoctor from '../ProfileDoctor';
import NumberFormat from 'react-number-format'

class BookingModal extends Component {
    capitalizeFirstLetter = (val) => {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    buildTimeBooking = (dataTime, language) => {
        if (!dataTime) return '';
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
    };
    componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {
            this.buildTimeBooking(this.props.dataTime, this.props.language)
        }
    }

    render() {
        const { isOpen, closeBookingModal, dataTime, language, extraDoctorInfo } = this.props;
        console.log("Check extraDoctorInfo from BookingModals: ", extraDoctorInfo);


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
                        <ProfileDoctor />
                        {/* Tóm tắt slot đã chọn */}
                        <div className="schedule-summary">
                            <div className="label">
                                <FormattedMessage id="patient.booking.time" defaultMessage="Thời gian" />:
                            </div>
                            <div className="value">
                                {this.buildTimeBooking(dataTime, language) || '—'}
                            </div>
                        </div>

                        {/* Giá khám */}
                        <div className="price-summary">
                            <div className="label">
                                <FormattedMessage id="patient.extra-info-doctor.price" defaultMessage="Giá khám:" />

                            </div>
                            <div className="value">
                                {
                                    extraDoctorInfo &&
                                        extraDoctorInfo.priceData &&
                                        language === LANGUAGES.VI ?
                                        <NumberFormat
                                            className='currency'
                                            value={extraDoctorInfo?.priceData?.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        />
                                        :
                                        <NumberFormat
                                            className='currency'
                                            value={extraDoctorInfo?.priceData?.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                        />
                                }
                            </div>
                        </div>

                        {/* Form thông tin bệnh nhân (placeholder — bạn có thể nối state/validate sau) */}
                        <div className="row form-group">
                            <div className="col-6">
                                <label><FormattedMessage id="patient.booking.fullname" defaultMessage="Họ và tên" /></label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="patient.booking.phone" defaultMessage="Số điện thoại" /></label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 mt-3">
                                <label><FormattedMessage id="patient.booking.email" defaultMessage="Email" /></label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 mt-3">
                                <label><FormattedMessage id="patient.booking.address" defaultMessage="Địa chỉ" /></label>
                                <input className="form-control" />
                            </div>
                            <div className="col-12 mt-3">
                                <label><FormattedMessage id="patient.booking.reason" defaultMessage="Lý do khám" /></label>
                                <textarea className="form-control" rows={3} />
                            </div>
                            <div className="col-6 mt-3">
                                <label><FormattedMessage id="patient.booking.for-who" defaultMessage="Đặt cho ai" /></label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 mt-3">
                                <label><FormattedMessage id="patient.booking.gender" defaultMessage="Giới tính" /></label>
                                <input className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="booking-modal-footer">
                        <button className="btn btn-primary">
                            <FormattedMessage id="patient.booking.confirm" defaultMessage="Xác nhận" />
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
    extraDoctorInfo: state.admin.extraDoctorInfo
});

export default connect(mapStateToProps)(withRouter(BookingModal));
