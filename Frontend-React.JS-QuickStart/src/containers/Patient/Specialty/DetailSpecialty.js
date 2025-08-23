// src/containers/System/Specialty/DetailSpecialty.jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorsId: [],
            descriptionHTML: '',
            // location filter
            locations: [],
            selectedLocation: { value: 'ALL', label: 'Toàn quốc' },
        };
    }

    componentDidMount() {
        // provinces for location filter
        this.props.getRequiredDoctorInfo();

        const specialtyId = this.props?.match?.params?.id;
        if (specialtyId) {
            this.props.fetchDetailSpecialtyById(specialtyId, 'ALL');
        }
    }

    componentDidUpdate(prevProps) {
        const { detailSpecialty, allRequiredDoctorInfo, language } = this.props;

        // hydrate doctor ids + description
        if (prevProps.detailSpecialty !== detailSpecialty) {
            const ds = detailSpecialty || {};
            let ids = Array.isArray(ds.arrDoctorsId)
                ? ds.arrDoctorsId
                : Array.isArray(ds.doctorSpecialty)
                    ? ds.doctorSpecialty.map((i) => i.doctorId)
                    : [];
            ids = [...new Set(ids)].filter(Boolean);
            this.setState({ arrDoctorsId: ids, descriptionHTML: ds.descriptionHTML || '' });
        }

        // build location options (ALL + provinces)
        if (
            prevProps.allRequiredDoctorInfo !== allRequiredDoctorInfo ||
            prevProps.language !== language
        ) {
            const resProvince = allRequiredDoctorInfo?.resProvince || [];
            const base = [{ value: 'ALL', label: language === LANGUAGES.VI ? 'Toàn quốc' : 'Nationwide' }];
            const opts = resProvince.map((p) => ({
                value: p.keyMap,
                label: language === LANGUAGES.VI ? p.valueVi : p.valueEn,
            }));
            // keep current value if still exists; else fallback ALL with proper label
            const current = this.state.selectedLocation?.value || 'ALL';
            const nextSelected = [...base, ...opts].find((o) => o.value === current) || base[0];
            this.setState({ locations: [...base, ...opts], selectedLocation: nextSelected });
        }
    }

    handleChangeLocation = (opt) => {
        const specialtyId = this.props?.match?.params?.id;
        this.setState({ selectedLocation: opt });
        if (specialtyId) {
            this.props.fetchDetailSpecialtyById(specialtyId, opt.value);
        }
    };

    render() {
        const { arrDoctorsId, descriptionHTML, locations, selectedLocation } = this.state;
        const { isLoadingDetailSpecialty } = this.props;

        return (
            <div className="detail-specialty-container">
                <HomeHeader isShowBanner={false} />

                <div className="description-specialty">
                    {descriptionHTML ? (
                        <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
                    ) : (
                        <span />
                    )}
                </div>



                <div className="detail-specialty-body">
                    <div className="detail-specialty-filter">
                        <label htmlFor="location-select" className="filter-label">Khu vực</label>
                        <div className="filter-select">
                            <Select
                                inputId="location-select"
                                value={selectedLocation}
                                onChange={this.handleChangeLocation}
                                options={locations}
                                placeholder={selectedLocation?.label || 'Chọn khu vực'}
                                styles={{
                                    // Fixes the overlapping problem of the component
                                    menu: provided => ({ ...provided, zIndex: 9999 })
                                }}
                            />
                        </div>
                    </div>
                    {isLoadingDetailSpecialty ? (
                        <div className="generic-loading">
                            <div className="skeleton-card" />
                            <div className="skeleton-card" />
                            <div className="skeleton-card" />
                        </div>
                    ) : (
                        <>
                            {Array.isArray(arrDoctorsId) && arrDoctorsId.length > 0 ? (
                                arrDoctorsId.map((doctorId) => (
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
                                                <DoctorExtraInfo key={`extra-${doctorId}`} doctorId={doctorId} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="each-doctor-container" key="empty" />
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    detailSpecialty: state.admin.detailSpecialty,
    isLoadingDetailSpecialty: state.admin.isLoadingDetailSpecialty,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
});

const mapDispatchToProps = (dispatch) => ({
    fetchDetailSpecialtyById: (id, location) => dispatch(actions.getDetailsSpecialtyById(id, location)),
    getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()), // để lấy resProvince
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailSpecialty));
