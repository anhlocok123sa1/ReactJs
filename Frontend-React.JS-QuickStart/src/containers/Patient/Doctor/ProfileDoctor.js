// ProfileDoctor.jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import './ProfileDoctor.scss';
import { LANGUAGES } from '../../../utils';
import { path } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import _ from 'lodash';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        };
    }

    componentDidMount() {
        const { doctorId } = this.props;
        if (doctorId) {
            this.props.getDetailDoctor(doctorId);
            this.props.getExtraDoctorInfo(doctorId);
        }
    }

    componentDidUpdate(prevProps) {
        const { language, doctorId } = this.props;
        if (prevProps.language !== language) {
            this.buildTimeBooking(this.props.dataTime, language);
        }
        if (prevProps.doctorId !== doctorId) {
            this.props.getDetailDoctor(doctorId);
            this.props.getExtraDoctorInfo(doctorId);
        }
    }

    capitalizeFirstLetter = (val) => {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    buildTimeBooking = (dataTime, language) => {
        if (!dataTime) return '';
        const timeLabel =
            language === LANGUAGES.VI
                ? dataTime?.timeTypeData?.valueVi
                : dataTime?.timeTypeData?.valueEn;

        const m = moment(Number(dataTime.date || 0));
        const dateLabel =
            language === LANGUAGES.VI
                ? this.capitalizeFirstLetter(m.locale('vi').format('dddd, DD/MM/YYYY'))
                : m.locale('en').format('ddd, MM/DD/YYYY');

        return `${timeLabel} • ${dateLabel}`;
    };

    renderTimeBooking = (dataTime, language) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            return (
                <div className="schedule-summary">
                    <div className="label">
                        <FormattedMessage id="patient.booking.time" defaultMessage="Thời gian" />:
                    </div>
                    <div className="value">
                        {this.buildTimeBooking(dataTime, language) || '—'}
                    </div>
                </div>
            );
        }
        return null;
    };

    renderPriceBooking = (extraDoctorInfo, language) => {
        if (extraDoctorInfo && !_.isEmpty(extraDoctorInfo)) {
            const price = language === LANGUAGES.VI
                ? extraDoctorInfo?.priceData?.valueVi
                : extraDoctorInfo?.priceData?.valueEn;
            const suffix = language === LANGUAGES.VI ? 'VND' : '$';
            return (
                <div className="price-summary">
                    <div className="label">
                        <FormattedMessage id="patient.extra-info-doctor.price" defaultMessage="Giá khám:" />
                    </div>
                    <div className="value">
                        <NumberFormat
                            className='currency'
                            value={price}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={suffix}
                        />
                    </div>
                </div>
            );
        }
        return null;
    };

    render() {
        const {
            detailDoctor,
            language,
            isShowDescriptionDoctor,
            dataTime,
            extraDoctorInfo,
            isShowLinkDetail
        } = this.props;

        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        const linkTo = isShowLinkDetail && this.props.doctorId
            ? path.DETAIL_DOCTOR.replace(':id', this.props.doctorId)
            : null;

        const avatarDiv = (
            <div
                className="content-left"
                style={detailDoctor && detailDoctor.image ? { backgroundImage: `url(${detailDoctor.image})` } : {}}
            />
        );

        const nameBlock = (
            <>
                <h3>{detailDoctor?.name || ''}</h3>
                <p>{language === LANGUAGES.VI ? nameVi : nameEn}</p>
            </>
        );

        return (
            <div className="intro-doctor">
                {linkTo ? (
                    <Link to={linkTo} aria-label="Xem chi tiết bác sĩ" className="content-left-link" style={{ textDecoration: 'none' }}>
                        {avatarDiv}
                    </Link>
                ) : (
                    avatarDiv
                )}

                <div className="content-right">
                    {linkTo ? (
                        <Link to={linkTo} className="up primary" aria-label="Xem chi tiết bác sĩ" style={{ textDecoration: 'none' }}>
                            {nameBlock}
                        </Link>
                    ) : (
                        <div className="up">
                            {nameBlock}
                        </div>
                    )}
                    <div className="down">
                        {isShowDescriptionDoctor ? (
                            detailDoctor?.markdownData?.description && <p>{detailDoctor.markdownData.description}</p>
                        ) : (
                            <>
                                {this.renderTimeBooking(dataTime, language)}
                                {this.renderPriceBooking(extraDoctorInfo, language)}
                            </>
                        )}

                        {linkTo && (
                            <Link to={linkTo} className="view-detail-doctor" style={{ textDecoration: 'none' }}>
                                <FormattedMessage id="patient.detail-doctor.view-detail" defaultMessage="Xem thêm" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    language: state.app.language,
    detailDoctor: state.admin.detailDoctorById?.[ownProps.doctorId],
    extraDoctorInfo: state.admin.extraDoctorInfoById?.[ownProps.doctorId],
});

const mapDispatchToProps = dispatch => ({
    getDetailDoctor: (data) => dispatch(actions.getDetailDoctorAction(data)),
    getExtraDoctorInfo: (doctorId) => dispatch(actions.getExtraDoctorInfo(doctorId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileDoctor));
