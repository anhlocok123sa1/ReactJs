import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './RemedyModal.scss';
import { Modal } from 'reactstrap';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            file: null,
            fileName: '',
            base64: '',
            error: ''
        };
    }

    componentDidUpdate(prevProps) {
        const { isSendingRemedy, resultRemedy } = this.props;
        // Sync email from incoming data when opening or when the data changes
        if (
            this.props.isOpen &&
            (prevProps.isOpen !== this.props.isOpen || prevProps.dataModal !== this.props.dataModal)
        ) {
            const email = this.props?.dataModal?.patientData?.email || '';
            this.setState({ email, error: '' });
        }

        // Khi modal đóng → reset state
        if (prevProps.isOpen && !this.props.isOpen) {
            this.resetState();
        }

        if (
            prevProps.isSendingRemedy &&
            !isSendingRemedy &&
            resultRemedy?.errCode === 0
        ) {
            this.handleClose();
        }
    }

    resetState = () => {
        this.setState({ email: '', file: null, fileName: '', base64: '', error: '' });
    };

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value, error: '' });
    };

    handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            this.setState({ file: null, base64: '', fileName: '' });
            return;
        }
        const base64 = await CommonUtils.getBase64(file);
        this.setState({ file, base64, fileName: file.name, error: '' });
    };

    validate = () => {
        const { email, base64 } = this.state;
        if (!email) return 'Vui lòng nhập email.';
        // Simple email check; backend should re-validate
        const ok = /.+@.+\..+/.test(email);
        if (!ok) return 'Email không hợp lệ.';
        if (!base64) return 'Vui lòng chọn file đơn thuốc.';
        return '';
    };

    handleSendRemedy = async () => {
        const error = this.validate();
        if (error) {
            this.setState({ error });
            return;
        }

        const { onSendRemedy, dataModal, doctorId, language } = this.props;
        const { email, base64 } = this.state;

        const payload = {
            email,
            attachmentBase64: base64, // why: allow API to send file as base64
            // fileName,
            patientId: dataModal?.patientId || dataModal?.patientData?.id || null,
            doctorId: dataModal?.doctorId || doctorId || null,
            timeType: dataModal?.timeType || null,
            // bookingId: dataModal?.id || null,
            language: language || 'vi'
        };

        this.setState({ error: '' });
        try {
            if (typeof onSendRemedy === 'function') {
                await onSendRemedy(payload);
            }
        } catch (err) {
            this.setState({ error: 'Gửi hóa đơn thất bại. Hãy thử lại.' });
        }
    };

    handleClose = () => {
        this.resetState();
        this.props.closeRemedyModal();
    };

    render() {
        const { isOpen, closeRemedyModal, dataModal, isSendingRemedy } = this.props;
        const { email, fileName, error } = this.state;

        return (
            <Modal
                isOpen={isOpen}
                toggle={closeRemedyModal}
                centered
                backdrop
                size="lg"
                contentClassName="remedy-modal-container" className="remedy-modal-dialog"
            >
                <div className="remedy-modal-header">
                    <span className="left">Gửi hóa đơn khám bệnh</span>
                    <span className="right" onClick={this.handleClose} role="button" aria-label="Close">
                        <i className="fas fa-times" />
                    </span>
                </div>

                <div className="remedy-modal-body">
                    {/* Optional summaries if the data is available */}
                    {dataModal?.timeTypeDataPatient?.valueVi && (
                        <div className="schedule-summary">
                            <span className="label">Thời gian:</span>
                            <span className="value">{dataModal.timeTypeDataPatient.valueVi}</span>
                        </div>
                    )}

                    {typeof dataModal?.price === 'number' && (
                        <div className="price-summary">
                            <span className="label">Chi phí:</span>
                            <span className="value">{dataModal.price.toLocaleString('vi-VN')}₫</span>
                        </div>
                    )}

                    <div className="row form-group">
                        <div className="col-6 form-group">
                            <label>Email bệnh nhân</label>
                            <input
                                className="form-control"
                                type="email"
                                value={email}
                                onChange={this.handleEmailChange}
                                placeholder="email@email.com"
                                disabled={isSendingRemedy}
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label>Chọn file đơn thuốc</label>
                            <input
                                className="form-control"
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={this.handleFileChange}
                                disabled={isSendingRemedy}
                            />
                            {fileName && (
                                <small className="text-muted">Đã chọn: {fileName}</small>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="alert alert-danger py-2" role="alert">
                            {error}
                        </div>
                    )}
                </div>

                <div className="remedy-modal-footer">
                    <button className="btn btn-primary" onClick={this.handleSendRemedy} disabled={isSendingRemedy}>
                        {/* {isSendingRemedy ? 'Đang gửi…' : 'Xác nhận'} */}
                        {isSendingRemedy ? (
                            <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                        ) : (
                            <p>Xác nhận</p>
                        )}
                    </button>
                    <button className="btn btn-secondary" onClick={this.handleClose} disabled={isSendingRemedy}>
                        Hủy
                    </button>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    isSendingRemedy: state.admin.isSendingRemedy,
    resultRemedy: state.admin.resultRemedy,
});

export default connect(mapStateToProps, null)(withRouter(RemedyModal));