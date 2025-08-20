import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './DetailSpecialty.scss';
import { LANGUAGES } from '../../../utils'
import HomeHeader from '../../HomePage/HomeHeader';
// import * as actions from '../../../store/actions';
// import { FormattedMessage } from 'react-intl';


class DetailSpecialty extends Component {
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
        
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="">
                    Specialty
                </div>
            </>
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