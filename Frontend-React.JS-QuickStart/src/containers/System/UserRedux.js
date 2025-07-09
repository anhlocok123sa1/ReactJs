import React, { Component } from 'react';
// eslint-disable-next-line
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    state = {

    }

    componentDidMount() {
    }


    render() {
        return (
            <div className='user-redux-container'>
                <div className="title">User Redux</div>
                <div className="user-redux-body">
                    <div className="">Thêm mới người dùng</div>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
