import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import specialtyImg from '../../../assets/specialty/iStock-1366650119.jpg'

class Specialty extends Component {


    render() {

        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
        };

        return (
            <div className="section-specialty">
                <div className="specialty-container">
                    <div className="specialty-header">
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className="specialty-body">
                        <Slider {...settings}>
                            <div className='img-customize'>
                                <img src={specialtyImg} alt="specialtyImg" />
                                <span>Cơ xương khớp 1</span>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} alt="specialtyImg" />
                                <span>Cơ xương khớp 2</span>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} alt="specialtyImg" />
                                <span>Cơ xương khớp 3</span>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} alt="specialtyImg" />
                                <span>Cơ xương khớp 4</span>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} alt="specialtyImg" />
                                <span>Cơ xương khớp 5</span>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} alt="specialtyImg" />
                                <span>Cơ xương khớp 6</span>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} alt="specialtyImg" />
                                <span>Cơ xương khớp 7</span>
                            </div>
                            <div className='img-customize'>
                                <img src={specialtyImg} alt="specialtyImg" />
                                <span>Cơ xương khớp 8</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
