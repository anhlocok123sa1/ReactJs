import React, { Component } from 'react';
// eslint-disable-next-line
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeServices } from '../../../services/userService'
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions'

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    state = {

    }

    async componentDidMount() {
        this.props.getGenderStart();
        // try {
        //     let res = await getAllCodeServices('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     console.log('Check res gender: ', res);

        // } catch (e) {
        //     console.log(e);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.gendersRedux !== this.props.gendersRedux) {
            this.setState({
                genderArr: this.props.gendersRedux
            })
        }
    }

    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;

        return (
            <div className='user-redux-container'>
                <div className="title">User Redux Hỏi dân IT</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3"><FormattedMessage id="manage-user.add" /></div>
                            <div className="col-3">
                                <label htmlFor="email"><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type="email" name="email" />
                            </div>
                            <div className="col-3">
                                <label htmlFor="password"><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type="password" name="password" />
                            </div>
                            <div className="col-3">
                                <label htmlFor="firstName"><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type="text" name="text" />
                            </div>
                            <div className="col-3">
                                <label htmlFor="lastName"><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type="text" name="text" />
                            </div>
                            <div className="col-3">
                                <label htmlFor="phoneNumber"><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className='form-control' type="text" name="text" />
                            </div>
                            <div className="col-9">
                                <label htmlFor="Address"><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type="text" name="text" />
                            </div>
                            <div className="col-3">
                                <label htmlFor="gender"><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-select">
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        console.log(item, index);

                                        return (
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>

                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="position"><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-select">
                                    <option selected>Open this select menu</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="roleId"><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-select">
                                    <option selected>Open this select menu</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="lastName"><FormattedMessage id="manage-user.image" /></label>
                                <input className='form-control' type="text" name="image" />
                            </div>
                            <div className="col-12 mt-3">
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        gendersRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
