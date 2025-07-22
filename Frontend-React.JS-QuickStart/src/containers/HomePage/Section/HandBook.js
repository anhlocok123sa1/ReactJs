import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HandBookImg from '../../../assets/hand-book/105523-chuyen-gia-tham-van-tu-van-tam-ly-hon-nhan-gia-dinh-uy-tin.jpg'

class HandBook extends Component {


    render() {
        
        return (
            <div className="section-share section-hand-book">
                <div className="section-container">
                    <div className="section-header">
                        <span className='title-section'>
                            <FormattedMessage id="home-page.handbook" />
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id="home-page.see-more" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className='img-customize'>
                                <img src={HandBookImg} alt="HandBookImg" />
                                <span>Cơ xương khớp 1</span>
                            </div>
                            <div className='img-customize'>
                                <img src={HandBookImg} alt="HandBookImg" />
                                <span>Cơ xương khớp 2</span>
                            </div>
                            <div className='img-customize'>
                                <img src={HandBookImg} alt="HandBookImg" />
                                <span>Cơ xương khớp 3</span>
                            </div>
                            <div className='img-customize'>
                                <img src={HandBookImg} alt="HandBookImg" />
                                <span>Cơ xương khớp 4</span>
                            </div>
                            <div className='img-customize'>
                                <img src={HandBookImg} alt="HandBookImg" />
                                <span>Cơ xương khớp 5</span>
                            </div>
                            <div className='img-customize'>
                                <img src={HandBookImg} alt="HandBookImg" />
                                <span>Cơ xương khớp 6</span>
                            </div>
                            <div className='img-customize'>
                                <img src={HandBookImg} alt="HandBookImg" />
                                <span>Cơ xương khớp 7</span>
                            </div>
                            <div className='img-customize'>
                                <img src={HandBookImg} alt="HandBookImg" />
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
