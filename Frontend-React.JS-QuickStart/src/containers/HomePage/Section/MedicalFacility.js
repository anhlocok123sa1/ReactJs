import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './MedicalFacility.scss'
import medicalFacilityImg from '../../../assets/medical-facility/093035-benh-vien-thu-cuc-1.jpg'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';

import * as actions from '../../../store/actions'
import { path } from '../../../utils/constant';

class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []
        }
    }

    componentDidMount() {
        this.props.fetchAllClinics();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allClinic !== this.props.allClinic) {
            // Sync local state when Redux data changes
            this.setState({
                dataClinics: this.props.allClinic || []
            })
        }
    }

    // Điều hướng sang trang chi tiết cơ sở y tế
    handleViewDetailClinic = (item) => {
        // why: guard missing id & avoid pushing invalid routes
        if (this.props.history && item?.id) {
            const detailPath = path.DETAIL_CLINIC
                ? path.DETAIL_CLINIC.replace(':id', item.id)
                : `/detail-clinic/${item.id}`; // fallback if constant missing
            this.props.history.push(detailPath);
        }
    };

    getImageSrc = (image) => {
        if (!image) return medicalFacilityImg;
        if (typeof image === 'string' && image.startsWith('data:')) return image;
        return `data:image/jpeg;base64,${image}`;
    };

    render() {
        let { dataClinics } = this.state;
        const { isLoadingAllClinic } = this.props;

        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className='title-section'>
                            <FormattedMessage id="home-page.outstanding-health-facility" />
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id="home-page.see-more" />
                        </button>
                    </div>
                    <div className="section-body">
                        {isLoadingAllClinic ? (
                            <div className="specialty-loading">
                                <div className="skeleton-card" />
                                <div className="skeleton-card" />
                                <div className="skeleton-card" />
                                <div className="skeleton-card" />
                            </div>
                        ) : (
                            <Slider {...this.props.settings}>
                                {dataClinics && dataClinics.length > 0 &&
                                    dataClinics.map((item, index) => {
                                        return (
                                            <div
                                                className='img-customize'
                                                key={index}
                                                onClick={() => this.handleViewDetailClinic(item)}
                                                role="button"
                                                tabIndex={0}
                                                onKeyPress={(e) => { if (e.key === 'Enter') this.handleViewDetailClinic(item); }}
                                            >
                                                <img src={this.getImageSrc(item.image)} alt={item.name || 'medicalFacilityImg'} />
                                                <span className='name'>{item.name}</span>
                                            </div>
                                        )
                                    })

                                }
                            </Slider>
                        )}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allClinic: state.admin.allClinic,
        // why: enable skeleton state; default to false if store key absent
        isLoadingAllClinic: state.admin && state.admin.isLoadingAllClinic,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClinics: () => dispatch(actions.fetchAllClinics()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MedicalFacility));
