import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutStandingDoctoc.scss'
import OutStandingDoctocImg from '../../../assets/outstanding-doctor/142438-quynh-pgs.jpg'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import { CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class OutStandingDoctoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrTopDoctors: []
        };
    }

    componentDidMount() {
        this.props.fetchTopDoctorHome();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrTopDoctors: this.props.topDoctorsRedux
            });
        }
    }
    render() {
        let { arrTopDoctors } = this.state;
        let language = this.props.language
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className='title-section'>
                            <FormattedMessage id="home-page.outstanding-doctor" />
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id="home-page.see-more" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {arrTopDoctors && arrTopDoctors.length > 0 &&
                                arrTopDoctors.map((item, index) => {
                                    let image = '';
                                    if (!item.image) {
                                        image = OutStandingDoctocImg; // Fallback image
                                    } else {
                                        image = CommonUtils.bufferToBase64(item.image);
                                    }
                                    let name = `${language === LANGUAGES.VI ? item.positionData.valueVi + `, ` + item.lastName + ` ` + item.firstName : item.positionData.valueEn + `, ` + item.firstName + ` ` + item.lastName}`;

                                    return (
                                        <div className='img-customize' key={index}>
                                            <div className='customize-border'>
                                                <div className="outer-bg">
                                                    <img src={image} alt={item.name} />
                                                </div>
                                                <div className="position text-center">
                                                    <p className='text-break fw-bold fs-5' style={{ maxWidth: '240px' }}>{name}</p>
                                                    <p>{item.positionData.valueVi}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctorHome: () => dispatch(actions.fetchTopDoctorHome())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctoc);
