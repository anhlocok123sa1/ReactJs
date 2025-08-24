// src/containers/System/Specialty/ManageClinic.jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './ManageClinic.scss';
import { CommonUtils, CRUD_ACTIONS } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import * as actions from '../../../store/actions';
import { emitter } from '../../../utils/emitter';
import TableManageClinic from './TableManageClinic';

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      imageBase64: '',
      backgroundBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
      previewImageUrl: '',
      previewBackgroundUrl: '',
      errors: {},
      action: CRUD_ACTIONS.CREATE,
      clinicEditId: '',
    };
    this.fileInputRef = React.createRef();
    this.backgroundFileInputRef = React.createRef();

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on('EVENT_FILL_EDIT_CLINIC', (clinic) => {
      // image/background are already data URLs like: "data:image/png;base64,...."
      const imgSrc = clinic?.previewImg || clinic?.image || clinic?.imageBase64 || '';
      const bgSrc = clinic?.previewBg || clinic?.background || clinic?.backgroundBase64 || '';

      this.setState({
        name: clinic?.name || '',
        address: clinic?.address || '',
        imageBase64: imgSrc,                  // send back to BE
        backgroundBase64: bgSrc,              // send back to BE
        descriptionHTML: clinic?.descriptionHTML || '',
        descriptionMarkdown: clinic?.descriptionMarkdown || '',
        previewImageUrl: imgSrc,              // show preview
        previewBackgroundUrl: bgSrc,          // show preview
        action: CRUD_ACTIONS.EDIT,
        clinicEditId: clinic?.id ?? null,
      });

      if (this.fileInputRef.current) this.fileInputRef.current.value = '';
      if (this.backgroundFileInputRef.current) this.backgroundFileInputRef.current.value = '';
    });
  }

  componentDidMount() {
    // keep table fresh (like fetchUserRedux)
    if (this.props.fetchClinicsRedux) this.props.fetchClinicsRedux();
  }

  componentDidUpdate(prevProps) {
    // reset on create success (optional safeguard)
    if (prevProps.createClinicResult !== this.props.createClinicResult) {
      this.resetForm();
      if (this.props.fetchClinicsRedux) this.props.fetchClinicsRedux();
    }
  }

  componentWillUnmount() {
    if (this.state.previewImageUrl && this.state.previewImageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.state.previewImageUrl);
    }
    if (this.state.previewBackgroundUrl && this.state.previewBackgroundUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.state.previewBackgroundUrl);
    }
  }

  resetForm = () => {
    if (this.state.previewImageUrl && this.state.previewImageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.state.previewImageUrl);
    }
    if (this.state.previewBackgroundUrl && this.state.previewBackgroundUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.state.previewBackgroundUrl);
    }
    if (this.fileInputRef.current) this.fileInputRef.current.value = '';
    if (this.backgroundFileInputRef.current) this.backgroundFileInputRef.current.value = '';

    this.setState({
      name: '',
      address: '',
      imageBase64: '',
      backgroundBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
      previewImageUrl: '',
      previewBackgroundUrl: '',
      errors: {},
      action: CRUD_ACTIONS.CREATE,
      clinicEditId: ''
    });
  };

  handleOnchangeInput = (event, id) => {
    this.setState({ [id]: event.target.value });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({ descriptionHTML: html, descriptionMarkdown: text });
  };

  handleOnChangeImage = async (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    if (this.state.previewImageUrl && this.state.previewImageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.state.previewImageUrl);
    }
    const base64 = await CommonUtils.getBase64(file);
    const previewUrl = URL.createObjectURL(file);
    this.setState((prev) => ({ imageBase64: base64, previewImageUrl: previewUrl, errors: { ...prev.errors, imageBase64: undefined } }));
  };

  handleOnChangeBackground = async (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    if (this.state.previewBackgroundUrl && this.state.previewBackgroundUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.state.previewBackgroundUrl);
    }
    const base64 = await CommonUtils.getBase64(file);
    const previewUrl = URL.createObjectURL(file);
    this.setState((prev) => ({ backgroundBase64: base64, previewBackgroundUrl: previewUrl, errors: { ...prev.errors, backgroundBase64: undefined } }));
  };

  validate = () => {
    const {
      name,
      address,
      imageBase64,
      backgroundBase64,
      descriptionMarkdown,
      action,
    } = this.state;

    const errors = {};

    if (!name?.trim()) errors.name = 'Vui lòng nhập tên phòng khám';
    if (!address?.trim()) errors.address = 'Vui lòng nhập địa chỉ phòng khám';

    // Chỉ bắt buộc ảnh khi tạo mới
    if (action !== CRUD_ACTIONS.EDIT) {
      if (!imageBase64) errors.imageBase64 = 'Vui lòng chọn ảnh phòng khám';
      if (!backgroundBase64) errors.backgroundBase64 = 'Vui lòng chọn ảnh background phòng khám';
    }

    if (!descriptionMarkdown?.trim())
      errors.descriptionMarkdown = 'Vui lòng nhập mô tả phòng khám';

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };


  handleSaveClinic = () => {
    if (!this.validate()) return;
    const { name, address, imageBase64, backgroundBase64, descriptionHTML, descriptionMarkdown, action, clinicEditId } = this.state;

    if (action === CRUD_ACTIONS.EDIT && clinicEditId) {
      this.props.editClinicRedux({
        id: clinicEditId,
        name,
        address,
        imageBase64,
        backgroundBase64,
        descriptionHTML,
        descriptionMarkdown,
      });
    } else {
      this.props.createNewClinic({
        name,
        address,
        imageBase64,
        backgroundBase64,
        descriptionHTML,
        descriptionMarkdown,
      });
    }

    // reset form after save
    this.resetForm();
  };

  handleCancelEdit = () => {
    this.resetForm();
  };

  render() {
    const { name, address, descriptionMarkdown, previewImageUrl, previewBackgroundUrl, errors, action } = this.state;
    const { isCreatingClinic } = this.props;

    return (
      <div className="manage-clinic-container">
        <div className="manage-clinic-title">Quản lý phòng khám</div>

        <div className="add-new-clinic row">
          <div className="col-6 form-group">
            <label>Tên phòng khám</label>
            <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={name} onChange={(e) => this.handleOnchangeInput(e, 'name')} placeholder="Nhập tên phòng khám..." />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="col-6 form-group">
            <label>Ảnh phòng khám</label>
            <input ref={this.fileInputRef} type="file" accept="image/*" className={`form-control ${errors.imageBase64 ? 'is-invalid' : ''}`} onChange={this.handleOnChangeImage} />
            {errors.imageBase64 && <div className="invalid-feedback d-block">{errors.imageBase64}</div>}
            {previewImageUrl ? (
              <div className="preview-wrapper mt-2">
                <img src={previewImageUrl} alt="preview" className="preview-image" />
              </div>
            ) : null}
          </div>

          <div className="col-6 form-group">
            <label>Địa chỉ phòng khám</label>
            <input type="text" className={`form-control ${errors.address ? 'is-invalid' : ''}`} value={address} onChange={(e) => this.handleOnchangeInput(e, 'address')} placeholder="Ví dụ: 123 Lý Thường Kiệt, Q.10, TP.HCM" />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          <div className="col-6 form-group">
            <label>Background phòng khám</label>
            <input ref={this.backgroundFileInputRef} type="file" accept="image/*" className={`form-control ${errors.backgroundBase64 ? 'is-invalid' : ''}`} onChange={this.handleOnChangeBackground} />
            {errors.backgroundBase64 && <div className="invalid-feedback d-block">{errors.backgroundBase64}</div>}
            {previewBackgroundUrl ? (
              <div className="preview-wrapper mt-2">
                <img src={previewBackgroundUrl} alt="preview-background" className="preview-image" />
              </div>
            ) : null}
          </div>

          <div className="col-12 mt-3">
            <label>Mô tả phòng khám</label>
            <MdEditor style={{ height: '500px' }} renderHTML={(text) => mdParser.render(text)} onChange={this.handleEditorChange} value={descriptionMarkdown} />
            {errors.descriptionMarkdown && <div className="text-danger mt-1">{errors.descriptionMarkdown}</div>}
          </div>

          <div className="col-6">
            <button className={`btn ${action === CRUD_ACTIONS.EDIT ? 'btn-warning' : 'btn-primary'} btn-save-clinic`} onClick={this.handleSaveClinic} disabled={isCreatingClinic}>
              {isCreatingClinic ? 'Đang lưu...' : action === CRUD_ACTIONS.EDIT ? 'Cập nhật' : 'Lưu'}
            </button>
            {action === CRUD_ACTIONS.EDIT && (
              <button
                type="button"
                className="btn btn-outline-secondary btn-cancel-edit ml-2"
                onClick={this.handleCancelEdit}
              >
                Hủy
              </button>
            )}
          </div>
        </div>

        <TableManageClinic action={action} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isCreatingClinic: state.admin.isCreatingClinic,
  createClinicResult: state.admin.createClinicResult,
  allClinicRedux: state.admin.allClinicRedux,
});

const mapDispatchToProps = (dispatch) => ({
  createNewClinic: (data) => dispatch(actions.createNewClinic(data)),
  fetchClinicsRedux: () => dispatch(actions.fetchAllClinicRedux()),
  editClinicRedux: (data) => dispatch(actions.editClinic(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageClinic));
