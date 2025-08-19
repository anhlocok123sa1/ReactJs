// src/containers/HomePage/Section/Specialty.jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as actions from '../../../store/actions';

import specialtyImg from '../../../assets/specialty/iStock-1366650119.jpg';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSpecialty: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllSpecialty();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allSpecialty !== this.props.allSpecialty) {
            this.setState({ arrSpecialty: this.props.allSpecialty || [] });
        }
    }

    // Điều hướng sang trang chi tiết chuyên khoa
    handleOnClick = (item) => {
        if (this.props.history && item?.id) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    };

    // Điều hướng sang trang xem thêm danh sách chuyên khoa
    handleSeeMore = () => {
        if (this.props.history) {
            this.props.history.push('/all-specialties');
        }
    };

    // Hỗ trợ ảnh base64 (từ DB) hoặc URL đầy đủ; trả về fallback nếu không có ảnh
    getImageSrc = (image) => {
        if (!image) return specialtyImg;
        if (typeof image === 'string' && image.startsWith('data:')) return image;
        return `data:image/jpeg;base64,${image}`;
    };

    render() {
        const { arrSpecialty } = this.state;
        const { isLoadingAllSpecialty } = this.props;

        const sliderSettings =
            this.props.settings || {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [
                    { breakpoint: 1200, settings: { slidesToShow: 3 } },
                    { breakpoint: 992, settings: { slidesToShow: 2 } },
                    { breakpoint: 576, settings: { slidesToShow: 1 } },
                ],
            };

        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="home-page.outstanding-specialty" />
                        </span>
                        <button className="btn-section" onClick={this.handleSeeMore}>
                            <FormattedMessage id="home-page.see-more" />
                        </button>
                    </div>

                    <div className="section-body">
                        {isLoadingAllSpecialty ? (
                            <div className="specialty-loading">
                                <div className="skeleton-card" />
                                <div className="skeleton-card" />
                                <div className="skeleton-card" />
                                <div className="skeleton-card" />
                            </div>
                        ) : (
                            <Slider {...sliderSettings}>
                                {(arrSpecialty || []).map((item) => (
                                    <div
                                        className="img-customize"
                                        key={item.id}
                                        onClick={() => this.handleOnClick(item)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') this.handleOnClick(item);
                                        }}
                                    >
                                        <img src={this.getImageSrc(item.image)} alt={item.name || 'specialty'} />
                                        <span>{item.name || ''}</span>
                                    </div>
                                ))}
                                {(!arrSpecialty || arrSpecialty.length === 0) && (
                                    <div className="img-customize" key="fallback">
                                        <img src={specialtyImg} alt="specialty-fallback" />
                                        <span>
                                            <FormattedMessage id="home-page.no-specialty" defaultMessage="No specialties" />
                                        </span>
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
    isLoadingAllSpecialty: state.admin.isLoadingAllSpecialty,
    allSpecialty: state.admin.allSpecialty,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Specialty));
