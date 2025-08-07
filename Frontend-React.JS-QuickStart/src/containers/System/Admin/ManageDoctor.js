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
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            });
        }
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            console.log('Check detailDoctor from props:', this.props.detailDoctor);

            let { detailDoctor } = this.props;
            if (detailDoctor && detailDoctor.markdownData && detailDoctor.markdownData.contentMarkdown) {
                this.setState({
                    contentMarkdown: detailDoctor.markdownData.contentMarkdown,
                    contentHTML: detailDoctor.markdownData.contentHTML,
                    description: detailDoctor.markdownData.description,
                    detailDoctor: detailDoctor,
                    hasOldData: true // We have old data to edit
                });
            } else {
                this.setState({
                    contentMarkdown: '',
                    contentHTML: '',
                    description: '',
                    detailDoctor: {},
                    hasOldData: false // No old data to edit
                });
            }
        }
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice)
            let dataSelectPayment = this.buildDataInputSelect(resPayment)
            let dataSelectProvince = this.buildDataInputSelect(resProvince)
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
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
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
        let { contentMarkdown, contentHTML, selectedDoctor, description, hasOldData } = this.state;
        this.props.saveInfoDoctor({
            contentMarkdown: contentMarkdown,
            contentHTML: contentHTML,
            doctorId: selectedDoctor.value,
            description: description,
            actions: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        });
    }

    handleChangeSelectedDoctor = (selectedDoctor) => {
        this.setState({ selectedDoctor });
        this.props.getDetailDoctor(selectedDoctor.value);
    }

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        });
        console.log('Description changed:', event.target.value);

    }

    render() {
        let { listDoctors, selectedDoctor, description, hasOldData, listPrice, listPayment, listProvince, selectedPrice, selectedPayment, selectedProvince } = this.state;

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
                            onChange={this.handleChangeSelectedDoctor}
                            options={listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="content-right form-group">
                        <label><FormattedMessage id="admin.manage-doctor.introduction" /></label>
                        <textarea
                            name="doctor-info"
                            rows={4}
                            value={description}
                            onChange={(event) => this.handleOnChangeDescription(event)}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="more-info-extra row">
                    <div className="col-4 form-group">
                        <label htmlFor="">Chọn giá</label>
                        <Select
                            value={selectedPrice}
                            onChange={this.handleSelectedPrice}
                            options={listPrice}
                            placeholder={'Chọn giá'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">Chọn phương thức thanh toán</label>
                        <Select
                            value={selectedPayment}
                            onChange={this.handleSelectedPayment}
                            options={listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">Chọn tỉnh thành</label>
                        <Select
                            value={selectedProvince}
                            onChange={this.handleSelectedProvince}
                            options={listProvince}
                            placeholder={'Chọn tỉnh thành'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">Tên phòng khám</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">Địa chỉ phòng khám</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label htmlFor="">Note</label>
                        <input type="text" className="form-control" />
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
