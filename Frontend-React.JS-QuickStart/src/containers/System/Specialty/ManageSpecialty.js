import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './ManageSpecialty.scss';
import { CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import * as actions from '../../../store/actions';

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
      previewImageUrl: '',
      errors: {},
    };
  }

  componentDidUpdate(prevProps) {
    // Khi tạo chuyên khoa xong (errCode === 0) thì reset form
    if (prevProps.createSpecialtyResult !== this.props.createSpecialtyResult) {
      const res = this.props.createSpecialtyResult;
      if (res && res.errCode === 0) {
        this.setState({
          name: '',
          imageBase64: '',
          descriptionHTML: '',
          descriptionMarkdown: '',
          previewImageUrl: '',
          errors: {},
        });
      }
    }
  }

  handleOnchangeInput = (event, id) => {
    this.setState({ [id]: event.target.value });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    const base64 = await CommonUtils.getBase64(file);
    const previewUrl = URL.createObjectURL(file);
    this.setState({
      imageBase64: base64,
      previewImageUrl: previewUrl,
    });
  };

  validate = () => {
    const { name, imageBase64, descriptionMarkdown } = this.state;
    const errors = {};
    if (!name?.trim()) errors.name = 'Vui lòng nhập tên chuyên khoa';
    if (!imageBase64) errors.imageBase64 = 'Vui lòng chọn ảnh';
    if (!descriptionMarkdown?.trim()) errors.descriptionMarkdown = 'Vui lòng nhập mô tả';
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSaveNewSpecialty = () => {
    if (!this.validate()) return;
    const { name, imageBase64, descriptionHTML, descriptionMarkdown } = this.state;

    this.props.createNewSpecialty({
      name,
      imageBase64,            // backend của bạn đang nhận field này
      descriptionHTML,
      descriptionMarkdown,
    });
  };

  render() {
    const {
      name,
      descriptionMarkdown,
      previewImageUrl,
      errors,
    } = this.state;
    const { isCreatingSpecialty } = this.props;

    return (
      <div className="manage-specialty-container">
        <div className="manage-specialty-title">Quản lý chuyên khoa</div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên chuyên khoa</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={name}
              onChange={(e) => this.handleOnchangeInput(e, 'name')}
              placeholder="Nhập tên chuyên khoa..."
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="col-6 form-group">
            <label>Ảnh chuyên khoa</label>
            <input
              type="file"
              accept="image/*"
              className={`form-control ${errors.imageBase64 ? 'is-invalid' : ''}`}
              onChange={this.handleOnChangeImage}
            />
            {errors.imageBase64 && <div className="invalid-feedback d-block">{errors.imageBase64}</div>}

            {previewImageUrl ? (
              <div className="preview-wrapper mt-2">
                <img src={previewImageUrl} alt="preview" className="preview-image" />
              </div>
            ) : null}
          </div>

          <div className="col-12 mt-3">
            <label>Mô tả</label>
            <MdEditor
              style={{ height: '500px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={descriptionMarkdown}
            />
            {errors.descriptionMarkdown && (
              <div className="text-danger mt-1">{errors.descriptionMarkdown}</div>
            )}
          </div>

          <div className="col-12">
            <button
              className="btn btn-primary btn-save-specialty"
              onClick={this.handleSaveNewSpecialty}
              disabled={isCreatingSpecialty}
            >
              {isCreatingSpecialty ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isCreatingSpecialty: state.admin.isCreatingSpecialty,
  createSpecialtyResult: state.admin.createSpecialtyResult,
});

const mapDispatchToProps = (dispatch) => ({
  createNewSpecialty: (data) => dispatch(actions.createNewSpecialty(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageSpecialty));
