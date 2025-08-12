import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './BookingModal.scss';
import { Modal } from 'reactstrap'
import { LANGUAGES } from '../../../../utils'
import { FormattedMessage } from 'react-intl';
import 'moment/locale/vi';
import ProfileDoctor from '../ProfileDoctor';

class BookingModal extends Component {
    

    
    componentDidUpdate(prevProps) {
        
    }

    render() {
        const { isOpen, closeBookingModal, dataTime, language,  } = this.props;


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
                        />
                        

                        

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
});

export default connect(mapStateToProps)(withRouter(BookingModal));
