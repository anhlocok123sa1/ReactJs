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
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
            listDoctors: [],
            detailDoctor: {},
            hasOldData: false, // To check if we have old data to edit
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
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
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
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
        let { listDoctors, selectedDoctor, description, hasOldData } = this.state;

        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    Tạo thêm thông tin doctors
                </div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChangeSelectedDoctor}
                            options={listDoctors}
                        />
                    </div>
                    <div className="content-right form-group">
                        <label>Thông tin giới thiệu</label>
                        <textarea
                            name="doctor-info"
                            rows={4}
                            value={description}
                            onChange={(event) => this.handleOnChangeDescription(event)}
                        >
                            Giới thiệu bác sĩ tại đây
                        </textarea>
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
                    {hasOldData ? <span>Cập nhật thông tin</span> : <span>Tạo thông tin</span>}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctorAction(data)),
        getDetailDoctor: (data) => dispatch(actions.getDetailDoctorAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
