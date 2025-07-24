import React, { Component } from 'react';
// eslint-disable-next-line
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { emitter } from '../../../utils/emitter';

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
            listDoctors: [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
            ],
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        });
    }

    handleSaveContentMarkdown = () => {
        console.log('Check selected doctor', this.state);
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
                            value={this.state.description}
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
        allUsers: state.admin.allUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
