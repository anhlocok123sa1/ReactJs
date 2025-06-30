import React, { Component } from 'react';
// eslint-disable-next-line
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class RegisterPackageGroupOrAcc extends Component {
// eslint-disable-next-line
    constructor(props) {
        super(props);

    }



    render() {
        return (
            <div className="text-center">
                register package group or account
            </div>)
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPackageGroupOrAcc);
