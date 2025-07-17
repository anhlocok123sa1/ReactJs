import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import './UserRedux.scss'
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            arrCheck: { email: 'Email', password: 'Mật khẩu', firstName: 'Tên', lastName: 'Họ', phoneNumber: 'Số điện thoại', address: 'Địa chỉ' },
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
        this.props.getPositionStart();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gendersRedux !== this.props.gendersRedux) {
            let arrGenders = this.props.gendersRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            });
        }
        if (prevProps.rolesRedux !== this.props.rolesRedux) {
            let arrRoles = this.props.rolesRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            });
        }
        if (prevProps.positionsRedux !== this.props.positionsRedux) {
            let arrPositions = this.props.positionsRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            });
        }
        if (prevProps.allUsers !== this.props.allUsers) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0]
        if (file) {
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectURL,
                avatar: file
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (!isValid) return;
        console.log('Check submit test: ', this.state);

        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            position: this.state.position,
            image: this.state.avatar
        })
    }

    onChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        if (this.props.language === 'en') {
            this.setState({
                arrCheck: { email: 'Email', password: 'Password', firstName: 'First name', lastName: 'Last name', phoneNumber: 'Phone number', address: 'Address' }
            })
        } else {
            this.setState({
                arrCheck: { email: 'Email', password: 'Mật khẩu', firstName: 'Tên', lastName: 'Họ', phoneNumber: 'Số điện thoại', address: 'Địa chỉ' }
            })
        }
        for (let i = 0; i < Object.keys(this.state.arrCheck).length; i++) {
            let key = Object.keys(this.state.arrCheck)[i];
            // console.log('key: ', key);
            if (!this.state[key]) {
                isValid = false;
                if (this.props.language === 'en') {
                    alert('This input is required: ' + this.state.arrCheck[key]);
                } else {
                    alert('Ô dữ liệu cần phải nhập vào: ' + this.state.arrCheck[key]);
                }
                break;
            }
        }
        return isValid;
    }

    render() {
        const { genderArr, roleArr, positionArr } = this.state;
        const { language, isLoadingGender, isLoadingRole, isLoadingPosition } = this.props;

        // console.log('check state component: ', this.state);

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;

        return (
            <div className='user-redux-container'>
                <div className="title">User Redux Hỏi dân IT</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3">
                                <FormattedMessage id="manage-user.add" />
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input
                                    className='form-control'
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input
                                    className='form-control'
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input
                                    className='form-control'
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input
                                    className='form-control'
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                />
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input
                                    className='form-control'
                                    type="text"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input
                                    className='form-control'
                                    type="text"
                                    name="address"
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                />
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                {isLoadingGender && <div>Loading genders...</div>}
                                <select className="form-select"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                >
                                    {genderArr && genderArr.length > 0
                                        && genderArr.map((item, index) => (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                {isLoadingPosition && <div>Loading positions...</div>}
                                <select className="form-select"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                >
                                    {positionArr.map((item, index) => (
                                        <option key={index} value={item.key}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                {isLoadingRole && <div>Loading roles...</div>}
                                <select className="form-select"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                >
                                    {roleArr.map((item, index) => (
                                        <option key={index} value={item.key}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type="file" hidden
                                        onChange={(event => this.handleOnChangeImage(event))}
                                    />
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    ></div>
                                    <label htmlFor="previewImg" className='label-upload mt-2'>Tải ảnh <i className="fas fa-upload"></i></label>
                                </div>
                            </div>

                            <div className="col-12 my-3">
                                <button className='btn btn-primary'
                                    onClick={() => this.handleSaveUser()}
                                >
                                    <FormattedMessage id="manage-user.save" />
                                </button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        gendersRedux: state.admin.genders,
        rolesRedux: state.admin.roles,
        positionsRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        isLoadingRole: state.admin.isLoadingRole,
        isLoadingPosition: state.admin.isLoadingPosition,
        allUsers: state.admin.allUsers,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
