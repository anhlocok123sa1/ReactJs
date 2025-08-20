// src/containers/HomePage/Section/OutStandingDoctoc.jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './OutStandingDoctoc.scss';
import OutStandingDoctocImg from '../../../assets/outstanding-doctor/142438-quynh-pgs.jpg';
import * as actions from '../../../store/actions';
import { LANGUAGES, path } from '../../../utils/constant';
import { CommonUtils } from '../../../utils';

class OutStandingDoctoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrTopDoctors: [],
        };
    }

    componentDidMount() {
        this.props.fetchTopDoctorHome();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({ arrTopDoctors: this.props.topDoctorsRedux });
        }
    }

    handleViewDetailDoctor = (doctor) => {
        const detailPath = path.DETAIL_DOCTOR.replace(':id', doctor.id);
        this.props.history.push(detailPath);
    };

    render() {
        const { arrTopDoctors } = this.state;
        const { language, isLoadingTopDoctors } = this.props;

        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="home-page.outstanding-doctor" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="home-page.see-more" />
                        </button>
                    </div>

                    <div className="section-body">
                        {isLoadingTopDoctors ? (
                            <div className="doctor-loading">
                                <div className="skeleton-card" />
                                <div className="skeleton-card" />
                                <div className="skeleton-card" />
                                <div className="skeleton-card" />
                            </div>
                        ) : (
                            <Slider {...this.props.settings}>
                                {(arrTopDoctors || []).map((item) => {
                                    const image = item.image
                                        ? CommonUtils.bufferToBase64(item.image)
                                        : OutStandingDoctocImg;

                                    let name = `${language === LANGUAGES.VI ? item.positionData.valueVi + `, ` + item.lastName + ` ` + item.firstName : item.positionData.valueEn + `, ` + item.firstName + ` ` + item.lastName}`;

                                    return (
                                        <div
                                            className="img-customize"
                                            key={item.id || `${'$'}{item.lastName}-${'$'}{item.firstName}`}
                                            onClick={() => this.handleViewDetailDoctor(item)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') this.handleViewDetailDoctor(item);
                                            }}
                                        >
                                            <div className="customize-border">
                                                <div className="outer-bg">
                                                    <img src={image} alt={name} />
                                                </div>
                                                <div className="position text-center">
                                                    <p className="text-break fw-bold fs-5" style={{ maxWidth: '240px' }}>
                                                        {name}
                                                    </p>
                                                    <p>{language === LANGUAGES.VI ? item.positionData.valueVi : item.positionData.valueEn}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {(!arrTopDoctors || arrTopDoctors.length === 0) && (
                                    <div className="img-customize" key="fallback">
                                        <div className="customize-border">
                                            <div className="outer-bg">
                                                <img src={OutStandingDoctocImg} alt="doctor-fallback" />
                                            </div>
                                            <div className="position text-center">
                                                <p className="text-break fw-bold fs-5" style={{ maxWidth: '240px' }}>
                                                    <FormattedMessage id="home-page.no-doctor" defaultMessage="No doctors" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Slider>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
    isLoadingTopDoctors: state.admin.isLoadingTopDoctors, // cần có trong Redux
});

const mapDispatchToProps = (dispatch) => ({
    fetchTopDoctorHome: () => dispatch(actions.fetchTopDoctorHome()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(OutStandingDoctoc));
