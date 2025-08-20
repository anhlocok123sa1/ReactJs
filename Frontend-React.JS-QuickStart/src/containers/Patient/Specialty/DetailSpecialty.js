import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './DetailSpecialty.scss';
import { LANGUAGES } from '../../../utils'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo'
import ProfileDoctor from '../Doctor/ProfileDoctor'
// import * as actions from '../../../store/actions';
// import { FormattedMessage } from 'react-intl';


class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorsId: [2, 3, 14],
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }


    render() {
        let { arrDoctorsId } = this.state;
        return (
            <div className='detail-specialty-container'>
                <HomeHeader isShowBanner={false} />
                <div className="description-specialty">
                    specialty
                </div>
                <div className="detail-specialty-body">
                    {arrDoctorsId && arrDoctorsId.length > 0 &&
                        arrDoctorsId.map((item) => {
                            return (
                                <div className="each-doctor-container"
                                    key={item}
                                >
                                    <div className="dt-content-left">
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescriptionDoctor={true}
                                        />
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="up">
                                            <DoctorSchedule
                                                doctorId={item}
                                            />
                                        </div>
                                        <div className="down">
                                            <DoctorExtraInfo
                                                doctorId={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailSpecialty));