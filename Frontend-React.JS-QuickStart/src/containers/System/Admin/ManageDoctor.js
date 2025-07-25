import React, { Component } from 'react';
// eslint-disable-next-line
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { emitter } from '../../../utils/emitter';
import { LANGUAGES } from '../../../utils';

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
        console.log('Check selected doctor', this.state);
        let { contentMarkdown, contentHTML, selectedDoctor, description } = this.state;
        this.props.saveInfoDoctor({
            contentMarkdown: contentMarkdown,
            contentHTML: contentHTML,
            doctorId: selectedDoctor.value,
            description: description,
            action: 'CREATE'
        });
    }

    handleChangeSelectedDoctor = (selectedDoctor) => {
        this.setState(
            { selectedDoctor }, 
            () => console.log('Selected doctor changed:', this.state.selectedDoctor)
        );
    }

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        });
        console.log('Description changed:', event.target.value);

    }

    render() {
        let { listDoctors, selectedDoctor, description } = this.state;
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
                        onChange={this.handleEditorChange} />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className="btn btn-primary save-content-doctor"
                >
                    Save
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctorAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
