import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import './UserRedux.scss'

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImgURL: '',
            isOpen: false
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
        this.props.getPositionStart();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gendersRedux !== this.props.gendersRedux) {
            this.setState({ genderArr: this.props.gendersRedux });
        }
        if (prevProps.rolesRedux !== this.props.rolesRedux) {
            this.setState({ roleArr: this.props.rolesRedux });
        }
        if (prevProps.positionsRedux !== this.props.positionsRedux) {
            this.setState({ positionArr: this.props.positionsRedux });
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0]
        if (file) {
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectURL
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    render() {
        const { genderArr, roleArr, positionArr } = this.state;
        const { language, isLoadingGender, isLoadingRole, isLoadingPosition } = this.props;

        // console.log('check state component: ', this.state);


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
                                <input className='form-control' type="email" name="email" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type="password" name="password" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type="text" name="firstName" />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type="text" name="lastName" />
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className='form-control' type="text" name="phoneNumber" />
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type="text" name="address" />
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                {isLoadingGender && <div>Loading genders...</div>}
                                <select className="form-select">
                                    {genderArr && genderArr.length > 0
                                        && genderArr.map((item, index) => (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                {isLoadingPosition && <div>Loading positions...</div>}
                                <select className="form-select">
                                    {positionArr.map((item, index) => (
                                        <option key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.role" /></label>
                                {isLoadingRole && <div>Loading roles...</div>}
                                <select className="form-select">
                                    {roleArr.map((item, index) => (
                                        <option key={index}>
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

                            <div className="col-12 mt-3">
                                <button className='btn btn-primary'>
                                    <FormattedMessage id="manage-user.save" />
                                </button>
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
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
