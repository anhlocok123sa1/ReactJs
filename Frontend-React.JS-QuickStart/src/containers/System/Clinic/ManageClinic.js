// src/containers/System/Specialty/ManageClinic.jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './ManageClinic.scss';
import { CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import * as actions from '../../../store/actions';

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '', // địa chỉ phòng khám
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
      previewImageUrl: '',
      errors: {},
    };
    // Dùng ref để reset input file sau khi lưu
    this.fileInputRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    // Reset form khi lưu thành công
    if (prevProps.createClinicResult !== this.props.createClinicResult) {
      const res = this.props.createClinicResult;
      if (res && res.errCode === 0) {
        this.resetForm();
      }
    }
  }

  componentWillUnmount() {
    // Giải phóng URL xem trước khi unmount
    if (this.state.previewImageUrl) {
      URL.revokeObjectURL(this.state.previewImageUrl);
    }
  }

  resetForm = () => {
    // Giải phóng URL xem trước cũ (nếu có)
    if (this.state.previewImageUrl) {
      URL.revokeObjectURL(this.state.previewImageUrl);
    }

    // Xoá giá trị input file để có thể chọn lại cùng 1 file
    if (this.fileInputRef.current) {
      this.fileInputRef.current.value = '';
    }

    this.setState({
      name: '',
      address: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
      previewImageUrl: '',
      errors: {},
    });
  };

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

    // Giải phóng URL cũ để tránh leak
    if (this.state.previewImageUrl) {
      URL.revokeObjectURL(this.state.previewImageUrl);
    }

    const base64 = await CommonUtils.getBase64(file);
    const previewUrl = URL.createObjectURL(file);

    this.setState({
      imageBase64: base64,
      previewImageUrl: previewUrl,
      errors: { ...this.state.errors, imageBase64: undefined },
    });
  };

  validate = () => {
    const { name, address, imageBase64, descriptionMarkdown } = this.state;
    const errors = {};
    if (!name?.trim()) errors.name = 'Vui lòng nhập tên phòng khám';
    if (!address?.trim()) errors.address = 'Vui lòng nhập địa chỉ phòng khám';
    if (!imageBase64) errors.imageBase64 = 'Vui lòng chọn ảnh phòng khám';
    if (!descriptionMarkdown?.trim()) errors.descriptionMarkdown = 'Vui lòng nhập mô tả phòng khám';
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSaveNewClinic = () => {
    if (!this.validate()) return;
    const { name, address, imageBase64, descriptionHTML, descriptionMarkdown } = this.state;

    this.props.createNewClinic({
      name,
      address,
      imageBase64, // backend nhận field này
      descriptionHTML,
      descriptionMarkdown,
    });
    this.resetForm();
  };

  render() {
    const { name, address, descriptionMarkdown, previewImageUrl, errors } = this.state;
    const { isCreatingClinic } = this.props;

    return (
      <div className="manage-clinic-container">
        <div className="manage-clinic-title">Quản lý phòng khám</div>

        <div className="add-new-clinic row">
          {/* Tên phòng khám */}
          <div className="col-6 form-group">
            <label>Tên phòng khám</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={name}
              onChange={(e) => this.handleOnchangeInput(e, 'name')}
              placeholder="Nhập tên phòng khám..."
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Ảnh phòng khám */}
          <div className="col-6 form-group">
            <label>Ảnh phòng khám</label>
            <input
              ref={this.fileInputRef}
              type="file"
              accept="image/*"
              className={`form-control ${errors.imageBase64 ? 'is-invalid' : ''}`}
              onChange={this.handleOnChangeImage}
            />
            {errors.imageBase64 && (
              <div className="invalid-feedback d-block">{errors.imageBase64}</div>
            )}

            {previewImageUrl ? (
              <div className="preview-wrapper mt-2">
                <img src={previewImageUrl} alt="preview" className="preview-image" />
              </div>
            ) : null}
          </div>

          {/* Địa chỉ phòng khám */}
          <div className="col-6 form-group">
            <label>Địa chỉ phòng khám</label>
            <input
              type="text"
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              value={address}
              onChange={(e) => this.handleOnchangeInput(e, 'address')}
              placeholder="Ví dụ: 123 Lý Thường Kiệt, Q.10, TP.HCM"
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          {/* Mô tả phòng khám */}
          <div className="col-12 mt-3">
            <label>Mô tả phòng khám</label>
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
              className="btn btn-primary btn-save-clinic"
              onClick={this.handleSaveNewClinic}
              disabled={isCreatingClinic}
            >
              {isCreatingClinic ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isCreatingClinic: state.admin.isCreatingClinic,
  createClinicResult: state.admin.createClinicResult,
});

const mapDispatchToProps = (dispatch) => ({
  createNewClinic: (data) => dispatch(actions.createNewClinic(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManageClinic));