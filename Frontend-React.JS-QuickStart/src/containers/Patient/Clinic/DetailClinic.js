// src/containers/System/Specialty/DetailClinic.jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorsId: [],
            dataDetailClinic: {},
        };
    }

    componentDidMount() {
        if (this.props?.match?.params?.id) {
            const id = this.props.match.params.id;
            this.props.fetchDetailClinicById(id);
        }
    }

    componentDidUpdate(prevProps) {
        const { detailClinic } = this.props;
        if (prevProps.detailClinic !== detailClinic) {
            this.setState({
                dataDetailClinic: detailClinic || {},
                arrDoctorsId: detailClinic?.doctorClinic || [],
            });
        }
    }

    // why: FE may receive raw base64 (no prefix) or full data: url
    getImageSrc = (image) => {
        if (!image) return '';
        if (typeof image === 'string' && image.startsWith('data:')) return image;
        return `data:image/jpeg;base64,${image}`;
    };

    render() {
        const { arrDoctorsId, dataDetailClinic } = this.state;
        const { isLoadingDetailClinic } = this.props;
        return (
            <>
                <HomeHeader />

                <div className='background-clinic'>
                    <div className="background" style={{ backgroundImage: `url(${this.getImageSrc(dataDetailClinic.background)})` }}></div>

                </div>

                <div className='detail-clinic-container'>
                    {/* Nội dung chi tiết khác sẽ được render ở đây */}
                    <div className="clinic-description">
                        <div className="cl-top">
                            <div className="cl-left">
                                <div className="clinic-image" style={{ backgroundImage: `url(${this.getImageSrc(dataDetailClinic.image)})` }}></div>
                            </div>
                            <div className="cl-right">
                                <div className="clinic-title">{dataDetailClinic.name}</div>
                                <div className="clinic-address">{dataDetailClinic.address}</div>
                            </div>
                        </div>
                        <div className="cl-bottom">
                            <a
                                href="#clinic-doctor"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document
                                        .querySelector('.clinic-doctor')
                                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                            >
                                Đặt lịch khám
                            </a>
                            <a
                                href="#clinic-detail"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document
                                        .querySelector('.clinic-detail')
                                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                            >
                                Giới thiệu
                            </a>
                        </div>
                    </div>
                    <div className="clinic-doctor">

                        {isLoadingDetailClinic ? (
                            <div className="generic-loading">
                                <div className="skeleton-card" />
                                <div className="skeleton-card" />
                                <div className="skeleton-card" />
                            </div>
                        ) : (
                            <>
                                {Array.isArray(arrDoctorsId) && arrDoctorsId.length > 0 ? (
                                    arrDoctorsId.map((doctor) => {
                                        let doctorId = doctor.doctorId;
                                        return (
                                            <div className="each-doctor-container" key={doctorId}>
                                                <div className="dt-content-left">
                                                    <ProfileDoctor
                                                        key={`profile-${doctorId}`}
                                                        doctorId={doctorId}
                                                        isShowDescriptionDoctor={true}
                                                        isShowLinkDetail={true}
                                                    />
                                                </div>
                                                <div className="dt-content-right">
                                                    <div className="up">
                                                        <DoctorSchedule key={`schedule-${doctorId}`} doctorId={doctorId} />
                                                    </div>
                                                    <div className="down">
                                                        <DoctorExtraInfo key={`extra-info-${doctorId}`} doctorId={doctorId} />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <span className='none-doctor'></span>
                                )}
                            </>
                        )}
                    </div>
                    <div className="clinic-detail">
                        {dataDetailClinic?.descriptionHTML ? (
                            <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }} />
                        ) : (
                            <span />
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    detailClinic: state.admin.detailClinic,
    isLoadingDetailClinic: state.admin.isLoadingDetailClinic,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
});

const mapDispatchToProps = (dispatch) => ({
    fetchDetailClinicById: (id) => dispatch(actions.getDetailsClinicById(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailClinic));
