import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import * as actions from '../../store/actions';
import HomeHeader from '../HomePage/HomeHeader';
import "./VerifyEmail.scss"

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'loading', // 'loading' | 'success' | 'fail'
            message: ''
        };
    }

    componentDidMount() {
        // Ưu tiên query string: /verify-booking?token=...&doctorId=...&patientId=...
        let token, doctorId, patientId;

        if (this.props.location && this.props.location.search) {
            const parsed = queryString.parse(this.props.location.search);
            token = parsed.token;
            doctorId = parsed.doctorId;
            patientId = parsed.patientId;
        }

        // Fallback: path params: /verify-booking/:token/:doctorId/:patientId
        if ((!token || !doctorId || !patientId) && this.props.match && this.props.match.params) {
            const { token: pToken, doctorId: pDoctorId, patientId: pPatientId } = this.props.match.params;
            token = token || pToken;
            doctorId = doctorId || pDoctorId;
            patientId = patientId || pPatientId;
        }

        if (!token || !doctorId || !patientId) {
            this.setState({
                status: 'fail',
                message: 'Thiếu tham số xác nhận (token/doctorId/patientId).'
            });
            return;
        }

        // Gọi action verify
        this.props.postVerifyBookAppointment({ token, doctorId, patientId });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.verifyBookAppointment !== this.props.verifyBookAppointment) {
            const resp = this.props.verifyBookAppointment;
            if (!resp) return;

            if (resp.errCode === 0) {
                // Có thể là “Verify booking success” hoặc “Appointment already verified”
                this.setState({
                    status: 'success',
                    message: resp.errMessage || 'Xác nhận lịch hẹn thành công!'
                });
            } else {
                this.setState({
                    status: 'fail',
                    message: resp.errMessage || 'Xác nhận lịch hẹn thất bại.'
                });
            }
        }
    }

    renderBody() {
        const { status, message } = this.state;

        if (status === 'loading') {
            return (
                <div className="verify-email__box">
                    <div className="verify-email__title">Đang xác nhận lịch hẹn…</div>
                    <div className="verify-email__desc">Vui lòng chờ trong giây lát.</div>
                </div>
            );
        }

        if (status === 'success') {
            return (
                <div className="verify-email__box verify-email__box--success">
                    <div className="verify-email__title">Thành công 🎉</div>
                    <div className="verify-email__desc">{message}</div>
                </div>
            );
        }

        return (
            <div className="verify-email__box verify-email__box--fail">
                <div className="verify-email__title">Xác nhận thất bại</div>
                <div className="verify-email__desc">{message || 'Có lỗi xảy ra. Vui lòng thử lại.'}</div>
            </div>
        );
    }

    render() {
        return (
            <>
                <HomeHeader />
                <div className="verify-email container">
                    {this.renderBody()}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    language: state.app.language,
    verifyBookAppointment: state.admin.verifyBookAppointment, // có thể là "success" hoặc object {errCode, errMessage}
});

const mapDispatchToProps = dispatch => ({
    postVerifyBookAppointment: (data) => dispatch(actions.postVerifyBookAppointment(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VerifyEmail));
