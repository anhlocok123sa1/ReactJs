import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './DoctorExtraInfo.scss';
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format'
import { lang } from 'moment';


class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailsInfo: false
        };
    }

    componentDidMount() {
        let { doctorId } = this.props
        this.props.getExtraDoctorInfo(doctorId)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.extraDoctorInfo !== this.props.extraDoctorInfo) {
            // console.log("New extraDoctorInfo:", this.props.extraDoctorInfo);
        }
        if (prevProps.doctorId !== this.props.doctorId) {
            this.props.getExtraDoctorInfo(this.props.doctorId);
        }
    }

    toggleDetailInfo = (status) => {
        this.setState({
            isShowDetailsInfo: status
        })
    }

    render() {
        let { isShowDetailsInfo } = this.state
        let { extraDoctorInfo, language } = this.props
        console.log("Check props extradoctorinfo", extraDoctorInfo);

        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className='text-address'>
                        <FormattedMessage id="patient.extra-info-doctor.text-address" />
                    </div>
                    <div className='name-clinic'>{extraDoctorInfo && extraDoctorInfo.nameClinic ? extraDoctorInfo.nameClinic : ''}</div>
                    <div className='detail-address'>{extraDoctorInfo && extraDoctorInfo.addressClinic ? extraDoctorInfo.addressClinic : ''}</div>
                </div>
                <div className="content-down">
                    {!isShowDetailsInfo &&
                        <div className="short-info">
                            <FormattedMessage id="patient.extra-info-doctor.price" />
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
                            <span onClick={() => this.toggleDetailInfo(!isShowDetailsInfo)}>
                                <FormattedMessage id="patient.extra-info-doctor.detail" />

                            </span>
                        </div>
                    }
                    {isShowDetailsInfo &&
                        <>
                            <div className="title-price">
                                <FormattedMessage id="patient.extra-info-doctor.price" />
                            </div>
                            <div className="detail-info">
                                <div className="price">
                                    <span className="left">
                                        <FormattedMessage id="patient.extra-info-doctor.price" />
                                    </span>
                                    <span className="right">
                                        {
                                            extraDoctorInfo &&
                                                extraDoctorInfo.priceData &&
                                                language === LANGUAGES.VI ?
                                                <NumberFormat
                                                    className='currency'
                                                    value={extraDoctorInfo.priceData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                />
                                                :
                                                <NumberFormat
                                                    className='currency'
                                                    value={extraDoctorInfo.priceData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'$'}
                                                />
                                        }
                                    </span>
                                </div>
                                <div className="note">
                                    {extraDoctorInfo && extraDoctorInfo.note ? extraDoctorInfo.note : ''}
                                </div>
                            </div>
                            <div className="payment">
                                {extraDoctorInfo && extraDoctorInfo.paymentData && language === LANGUAGES.VI ? extraDoctorInfo.paymentData.valueVi : extraDoctorInfo.paymentData.valueEn}
                            </div>
                            <div className="hide-price"><span onClick={() => this.toggleDetailInfo(!isShowDetailsInfo)}>
                                <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                            </span>
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        extraDoctorInfo: state.admin.extraDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getExtraDoctorInfo: (doctorId) => dispatch(actions.getExtraDoctorInfo(doctorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DoctorExtraInfo));