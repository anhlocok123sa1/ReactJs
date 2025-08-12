import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './ProfileDoctor.scss';
import { LANGUAGES } from '../../../utils'
// import * as actions from '../../../store/actions';
// import { FormattedMessage } from 'react-intl';


class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }


    render() {
        let { detailDoctor, language } = this.props;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        return (
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
        );
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailDoctor: state.admin.detailDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileDoctor));