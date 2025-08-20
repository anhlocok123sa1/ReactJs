import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './ProfileDoctor.scss';
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import NumberFormat from 'react-number-format'
import _ from 'lodash';



class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        };
    }

    componentDidMount() {
        if (this.props.doctorId) {
            this.props.getDetailDoctor(this.props.doctorId);
            this.props.getExtraDoctorInfo(this.props.doctorId);
        }
    }
    renderTimeBooking = (dataTime, language) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            return (
                <p>
                    {/* Tóm tắt slot đã chọn */}
                    <div className="schedule-summary" >
                        <div className="label">
                            <FormattedMessage id="patient.booking.time" defaultMessage="Thời gian" />:
                        </div>
                        <div className="value">
                            {this.buildTimeBooking(dataTime, language) || '—'}
                        </div>
                    </div >
                </p>
            )
        }
        return <></>
    }
    renderPriceBooking = (extraDoctorInfo, language) => {
        if (extraDoctorInfo && !_.isEmpty(extraDoctorInfo)) {
            return (
                <>
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
                </>
            )
        }
        return <></>
    }

    componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {
            this.buildTimeBooking(this.props.dataTime, this.props.language)
        }
        if (prevProps.doctorId !== this.props.doctorId) {
            console.log('Doctor ID changed:', this.props.doctorId);

            this.props.getDetailDoctor(this.props.doctorId);
            this.props.getExtraDoctorInfo(this.props.doctorId);
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

        // `dataTime.date` là ms (startOf('day')) bạn đã truyền từ DoctorSchedule
        const m = moment(Number(dataTime.date || 0));
        const dateLabel =
            language === LANGUAGES.VI
                ? this.capitalizeFirstLetter(m.locale('vi').format('dddd, DD/MM/YYYY'))
                : m.locale('en').format('ddd, MM/DD/YYYY');

        return `${timeLabel} • ${dateLabel}`;
    };


    render() {

        let { detailDoctor, language, isShowDescriptionDoctor, dataTime, extraDoctorInfo } = this.props;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }


        return (
            <div className="intro-doctor">
                <div className="content-left" style={detailDoctor && detailDoctor.image ? { backgroundImage: `url(${detailDoctor.image})` } : {}}>

                </div>
                <div className="content-right">
                    <div className="up">
                        <h3>{detailDoctor && detailDoctor.name ? detailDoctor.name : ''}</h3>
                        <p>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </p>
                    </div>
                    <div className="down">
                        {isShowDescriptionDoctor ?
                            <>
                                {detailDoctor && detailDoctor.markdownData && detailDoctor.markdownData.description &&
                                    <span>{detailDoctor.markdownData.description}</span>
                                }
                            </>
                            :
                            <>
                                {this.renderTimeBooking(dataTime, language)}
                                {this.renderPriceBooking(extraDoctorInfo, language)}
                            </>
                        }

                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        language: state.app.language,
        detailDoctor: state.admin.detailDoctorById?.[ownProps.doctorId],
        extraDoctorInfo: state.admin.extraDoctorInfoById?.[ownProps.doctorId],
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctor: (data) => dispatch(actions.getDetailDoctorAction(data)),
        getExtraDoctorInfo: (doctorId) => dispatch(actions.getExtraDoctorInfo(doctorId))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileDoctor));