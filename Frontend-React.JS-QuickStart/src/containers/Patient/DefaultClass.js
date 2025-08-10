import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './DefaultClass.scss';
import { LANGUAGES } from '../../../utils'
// import * as actions from '../../../store/actions';
// import { FormattedMessage } from 'react-intl';


class DefaultClass extends Component {
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
            <div className="">
                
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DefaultClass));