import React, { Component } from 'react';
// eslint-disable-next-line
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { emitter } from '../../../utils/emitter';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
            listDoctors: [],
            detailDoctor: {},
            hasOldData: false,

            //Save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfo();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            });
        }
        if (prevProps.language !== this.props.language) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo;
            let dataDoctor = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let dataPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let { detailDoctor } = this.props;

            let selectedPrice = resPrice && resPrice.find(item => item.keyMap === detailDoctor?.DoctorInfoData?.priceId);
            let selectedPayment = resPayment && resPayment.find(item => item.keyMap === detailDoctor?.DoctorInfoData?.paymentId);
            let selectedProvince = resProvince && resProvince.find(item => item.keyMap === detailDoctor?.DoctorInfoData?.provinceId);

            console.log("Check allRequiredDoctorInfo", detailDoctor);


            this.setState({
                listDoctors: dataDoctor,
                listPrice: dataPrice,
                listPayment: dataPayment,
                listProvince: dataProvince,
                selectedPrice: selectedPrice ? {
                    label: this.props.language === LANGUAGES.VI ? selectedPrice.valueVi : selectedPrice.valueEn,
                    value: selectedPrice.keyMap
                } : '',
                selectedPayment: selectedPayment ? {
                    label: this.props.language === LANGUAGES.VI ? selectedPayment.valueVi : selectedPayment.valueEn,
                    value: selectedPayment.keyMap
                } : '',
                selectedProvince: selectedProvince ? {
                    label: this.props.language === LANGUAGES.VI ? selectedProvince.valueVi : selectedProvince.valueEn,
                    value: selectedProvince.keyMap
                } : '',
            });
        }
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            let { detailDoctor, allRequiredDoctorInfo, language } = this.props;

            if (detailDoctor) {
                let { resPrice, resPayment, resProvince } = allRequiredDoctorInfo;

                let selectedPrice = resPrice && resPrice.find(item => item.keyMap === detailDoctor?.DoctorInfoData?.priceId);
                let selectedPayment = resPayment && resPayment.find(item => item.keyMap === detailDoctor?.DoctorInfoData?.paymentId);
                let selectedProvince = resProvince && resProvince.find(item => item.keyMap === detailDoctor?.DoctorInfoData?.provinceId);

                this.setState({
                    contentMarkdown: detailDoctor?.markdownData?.contentMarkdown || '',
                    contentHTML: detailDoctor?.markdownData?.contentHTML || '',
                    description: detailDoctor?.markdownData?.description || '',
                    selectedPrice: selectedPrice ? {
                        label: language === LANGUAGES.VI ? selectedPrice.valueVi : selectedPrice.valueEn,
                        value: selectedPrice.keyMap
                    } : '',
                    selectedPayment: selectedPayment ? {
                        label: language === LANGUAGES.VI ? selectedPayment.valueVi : selectedPayment.valueEn,
                        value: selectedPayment.keyMap
                    } : '',
                    selectedProvince: selectedProvince ? {
                        label: language === LANGUAGES.VI ? selectedProvince.valueVi : selectedProvince.valueEn,
                        value: selectedProvince.keyMap
                    } : '',
                    nameClinic: detailDoctor?.DoctorInfoData?.nameClinic || '',
                    addressClinic: detailDoctor?.DoctorInfoData?.addressClinic || '',
                    note: detailDoctor?.DoctorInfoData?.note || '',
                    selectedDoctor: this.state.listDoctors.find(item => item.value === detailDoctor.id) || null,
                    detailDoctor: detailDoctor,
                    hasOldData: !!detailDoctor?.markdownData?.contentMarkdown
                });
            } else {
                this.setState({
                    contentMarkdown: '',
                    contentHTML: '',
                    description: '',
                    selectedPrice: '',
                    selectedPayment: '',
                    selectedProvince: '',
                    nameClinic: '',
                    addressClinic: '',
                    note: '',
                    selectedDoctor: null,
                    detailDoctor: {},
                    hasOldData: false
                });
            }
        }


        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })

        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = item.valueVi;
                    let labelEn = item.valueEn;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = item.valueVi;
                    let labelEn = item.valueEn;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
        }
        return result;
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        });
    }

    handleSaveContentMarkdown = () => {
        let { contentMarkdown, contentHTML, selectedDoctor, description, hasOldData, selectedPrice, selectedPayment, selectedProvince, nameClinic, addressClinic, note } = this.state;
        this.props.saveInfoDoctor({
            contentMarkdown: contentMarkdown,
            contentHTML: contentHTML,
            doctorId: selectedDoctor.value,
            description: description,
            actions: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            selectedPrice: selectedPrice.value,
            selectedPayment: selectedPayment.value,
            selectedProvince: selectedProvince.value,
            nameClinic: nameClinic,
            addressClinic: addressClinic,
            note: note,
        });
    }

    handleChangeSelected = (selectedOption, name) => {
        // console.log("Check selectedOption: ", selectedOption);
        // console.log("Check name: ", name);
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy
        });
        if (name.name === 'selectedDoctor')
            this.props.getDetailDoctor(selectedOption.value);
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        });
    }

    render() {
        let { listDoctors, selectedDoctor, description, hasOldData, listPrice, listPayment, listProvince, selectedPrice, selectedPayment, selectedProvince, nameClinic, addressClinic, note } = this.state;

        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChangeSelected}
                            options={listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                            name={'selectedDoctor'}
                        />
                    </div>
                    <div className="content-right form-group">
                        <label><FormattedMessage id="admin.manage-doctor.introduction" /></label>
                        <textarea
                            name="doctor-info"
                            rows={4}
                            value={description}
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="more-info-extra row">
                    <div className="col-4 form-group">
                        <label htmlFor=""><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={selectedPrice}
                            onChange={this.handleChangeSelected}
                            options={listPrice}
                            placeholder={'Chọn giá'}
                            name={'selectedPrice'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor=""><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={selectedPayment}
                            onChange={this.handleChangeSelected}
                            options={listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                            name={'selectedPayment'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor=""><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={selectedProvince}
                            onChange={this.handleChangeSelected}
                            options={listProvince}
                            placeholder={'Chọn tỉnh thành'}
                            name={'selectedProvince'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor=""><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={nameClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor=""><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={addressClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor=""><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={note}
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData ? "btn btn-warning" : "btn btn-primary"}
                    style={{ marginTop: '20px' }}>
                    {hasOldData ?
                        <span>
                            <FormattedMessage id="admin.manage-doctor.save" />
                        </span>
                        :
                        <span>
                            <FormattedMessage id="admin.manage-doctor.add" />
                        </span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        detailDoctor: state.admin.detailDoctor,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctorAction(data)),
        getDetailDoctor: (data) => dispatch(actions.getDetailDoctorAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
