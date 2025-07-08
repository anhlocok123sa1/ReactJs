import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import medicalFacilityImg from '../../../assets/medical-facility/093035-benh-vien-thu-cuc-1.jpg'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {

    render() {

        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className='img-customize'>
                                <img src={medicalFacilityImg} alt="medicalFacilityImg" />
                                <span>Hệ thống Y tế Thu Cúc 1</span>
                            </div>
                            <div className='img-customize'>
                                <img src={medicalFacilityImg} alt="medicalFacilityImg" />
                                <span>Hệ thống Y tế Thu Cúc 2</span>
                            </div>
                            <div className='img-customize'>
                                <img src={medicalFacilityImg} alt="medicalFacilityImg" />
                                <span>Hệ thống Y tế Thu Cúc 3</span>
                            </div>
                            <div className='img-customize'>
                                <img src={medicalFacilityImg} alt="medicalFacilityImg" />
                                <span>Hệ thống Y tế Thu Cúc 4</span>
                            </div>
                            <div className='img-customize'>
                                <img src={medicalFacilityImg} alt="medicalFacilityImg" />
                                <span>Hệ thống Y tế Thu Cúc 5</span>
                            </div>
                            <div className='img-customize'>
                                <img src={medicalFacilityImg} alt="medicalFacilityImg" />
                                <span>Hệ thống Y tế Thu Cúc 6</span>
                            </div>
                            <div className='img-customize'>
                                <img src={medicalFacilityImg} alt="medicalFacilityImg" />
                                <span>Hệ thống Y tế Thu Cúc 7</span>
                            </div>
                            <div className='img-customize'>
                                <img src={medicalFacilityImg} alt="medicalFacilityImg" />
                                <span>Hệ thống Y tế Thu Cúc 8</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
