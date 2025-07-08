import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutStandingDoctoc.scss'
import OutStandingDoctocImg from '../../../assets/outstanding-doctor/142438-quynh-pgs.jpg'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OutStandingDoctoc extends Component {

    render() {

        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>

                            <div className='img-customize'>
                                <div className='customize-border'>
                                    <div className="outer-bg">
                                        <img src={OutStandingDoctocImg} alt="OutStandingDoctocImg" />
                                    </div>
                                    <div className="position text-center">
                                        <div>Phó giáo sư, Tiến sĩ, Bác sĩ CK II</div>
                                        <div>Nguyễn Văn Quýnh</div>
                                        <div>Tim mạch</div>
                                    </div>
                                </div>
                            </div>
                            <div className='img-customize'>
                                <div className='customize-border'>
                                    <div className="outer-bg">
                                        <img src={OutStandingDoctocImg} alt="OutStandingDoctocImg" />
                                    </div>
                                    <div className="position text-center">
                                        <div>Phó giáo sư, Tiến sĩ, Bác sĩ CK II</div>
                                        <div>Nguyễn Văn Quýnh</div>
                                        <div>Tim mạch</div>
                                    </div>
                                </div>
                            </div>
                            <div className='img-customize'>
                                <div className='customize-border'>
                                    <div className="outer-bg">
                                        <img src={OutStandingDoctocImg} alt="OutStandingDoctocImg" />
                                    </div>
                                    <div className="position text-center">
                                        <div>Phó giáo sư, Tiến sĩ, Bác sĩ CK II</div>
                                        <div>Nguyễn Văn Quýnh</div>
                                        <div>Tim mạch</div>
                                    </div>
                                </div>
                            </div>
                            <div className='img-customize'>
                                <div className='customize-border'>
                                    <div className="outer-bg">
                                        <img src={OutStandingDoctocImg} alt="OutStandingDoctocImg" />
                                    </div>
                                    <div className="position text-center">
                                        <div>Phó giáo sư, Tiến sĩ, Bác sĩ CK II</div>
                                        <div>Nguyễn Văn Quýnh</div>
                                        <div>Tim mạch</div>
                                    </div>
                                </div>
                            </div>
                            <div className='img-customize'>
                                <div className='customize-border'>
                                    <div className="outer-bg">
                                        <img src={OutStandingDoctocImg} alt="OutStandingDoctocImg" />
                                    </div>
                                    <div className="position text-center">
                                        <div>Phó giáo sư, Tiến sĩ, Bác sĩ CK II</div>
                                        <div>Nguyễn Văn Quýnh</div>
                                        <div>Tim mạch</div>
                                    </div>
                                </div>
                            </div>
                            <div className='img-customize'>
                                <div className='customize-border'>
                                    <div className="outer-bg">
                                        <img src={OutStandingDoctocImg} alt="OutStandingDoctocImg" />
                                    </div>
                                    <div className="position text-center">
                                        <div>Phó giáo sư, Tiến sĩ, Bác sĩ CK II</div>
                                        <div>Nguyễn Văn Quýnh</div>
                                        <div>Tim mạch</div>
                                    </div>
                                </div>
                            </div>
                            <div className='img-customize'>
                                <div className='customize-border'>
                                    <div className="outer-bg">
                                        <img src={OutStandingDoctocImg} alt="OutStandingDoctocImg" />
                                    </div>
                                    <div className="position text-center">
                                        <div>Phó giáo sư, Tiến sĩ, Bác sĩ CK II</div>
                                        <div>Nguyễn Văn Quýnh</div>
                                        <div>Tim mạch</div>
                                    </div>
                                </div>
                            </div>
                            <div className='img-customize'>
                                <div className='customize-border'>
                                    <div className="outer-bg">
                                        <img src={OutStandingDoctocImg} alt="OutStandingDoctocImg" />
                                    </div>
                                    <div className="position text-center">
                                        <div>Phó giáo sư, Tiến sĩ, Bác sĩ CK II</div>
                                        <div>Nguyễn Văn Quýnh</div>
                                        <div>Tim mạch</div>
                                    </div>
                                </div>
                            </div>

                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctoc);
