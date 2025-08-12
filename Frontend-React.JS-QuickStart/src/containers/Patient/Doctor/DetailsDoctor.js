import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailsDoctor.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';

class DetailsDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}

        };
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            // You can fetch doctor details here using the doctorId from props
            let doctorId = this.props.match.params.id;
            this.props.getDetailDoctor(doctorId);
        }
    }


    componentDidUpdate(prevProps) {
        // You can handle updates if the doctorId changes   
        const prevDoctorId = prevProps.match.params.id;
        const currentDoctorId = this.props.match.params.id;
        if (prevDoctorId !== currentDoctorId) {
            // console.log('Doctor ID changed:', currentDoctorId);
            // Fetch new doctor details logic can be added here
            this.props.getDetailDoctor(currentDoctorId);
        }
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            this.setState({
                detailDoctor: this.props.detailDoctor
            });
        }
    }


    render() {
        // You can access the doctor details from props or state
        let { detailDoctor } = this.state;
        let { language } = this.props;
        // console.log('Detail Doctor from props:', detailDoctor);
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        // console.log("check state details doctor: ",this.state);
        

        let doctorId = this.props.match.params.id;

        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="doctoc-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left" style={detailDoctor && detailDoctor.image ? { backgroundImage: `url(${detailDoctor.image})` } : {}}>

                        </div>
                        <div className="content-right">
                            <div className="up">
                                <h3>{detailDoctor && detailDoctor.name ? detailDoctor.name : ''}</h3>
                                <p>
                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                </p>
                            </div>
                            <div className="down">
                                {detailDoctor && detailDoctor.markdownData && detailDoctor.markdownData.description &&
                                    <span>{detailDoctor.markdownData.description}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule
                                doctorId={doctorId}
                            />
                        </div>
                        <div className="content-right">
                            <DoctorExtraInfo
                                doctorId={doctorId}
                            />
                        </div>
                    </div>
                    <div className="detail-doctor">
                        {detailDoctor && detailDoctor.markdownData && detailDoctor.markdownData.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.markdownData.contentHTML }}></div>
                        }
                    </div>
                    <div className="comment-doctor"></div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        detailDoctor: state.admin.detailDoctor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctor: (data) => dispatch(actions.getDetailDoctorAction(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailsDoctor));