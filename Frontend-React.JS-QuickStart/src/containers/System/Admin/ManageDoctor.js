// src/containers/System/Admin/ManageDoctor.jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';

import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { emitter } from '../../../utils/emitter';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // markdown table
      contentMarkdown: '',
      contentHTML: '',
      description: '',
      selectedDoctor: null,
      listDoctors: [],
      detailDoctor: {},
      hasOldData: false,

      // doctor_info table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: '',
      selectedPayment: '',
      selectedProvince: '',
      nameClinic: '',
      addressClinic: '',
      note: '',

      // NEW: specialty & clinic
      listSpecialty: [],
      listClinic: [],
      selectedSpecialty: '',
      selectedClinic: '',
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getRequiredDoctorInfo();
    // NEW: fetch specialty & clinic
    if (this.props.fetchAllSpecialty) this.props.fetchAllSpecialty();
    if (this.props.fetchAllClinic) this.props.fetchAllClinic();
  }

  componentDidUpdate(prevProps) {
    const { allDoctors, language, allRequiredDoctorInfo, detailDoctor } = this.props;

    // 1) doctors list
    if (prevProps.allDoctors !== allDoctors) {
      const dataSelect = this.buildDataInputSelect(allDoctors, 'USERS');
      this.setState({ listDoctors: dataSelect });
    }

    // 2) required doctor info (price/payment/province) -> when payload changes
    if (prevProps.allRequiredDoctorInfo !== allRequiredDoctorInfo) {
      const { resPayment, resPrice, resProvince, resSpecialty } = allRequiredDoctorInfo || {};
      this.setState({
        listPrice: this.buildDataInputSelect(resPrice, 'PRICE'),
        listPayment: this.buildDataInputSelect(resPayment, 'PAYMENT'),
        listProvince: this.buildDataInputSelect(resProvince, 'PROVINCE'),
        listSpecialty: this.buildDataInputSelect(resSpecialty, 'SPECIALTY'),
      });
    }

    // 3) specialty & clinic lists (from Redux)
    if (
      prevProps.allSpecialty !== this.props.allSpecialty ||
      prevProps.allClinics !== this.props.allClinics ||
      prevProps.allClinic !== this.props.allClinic
    ) {
      const clinicsRaw = this.props.allClinics || this.props.allClinic || [];
      this.setState({
        listSpecialty: this.buildDataInputSelect(this.props.allSpecialty, 'SPECIALTY'),
        listClinic: this.buildDataInputSelect(clinicsRaw, 'CLINIC'),
      });
    }

    // 4) language changed -> rebuild all select options (labels)
    if (prevProps.language !== language) {
      const { resPayment, resPrice, resProvince } = allRequiredDoctorInfo || {};
      const clinicsRaw = this.props.allClinics || this.props.allClinic || [];
      this.setState({
        listDoctors: this.buildDataInputSelect(allDoctors, 'USERS'),
        listPayment: this.buildDataInputSelect(resPayment, 'PAYMENT'),
        listPrice: this.buildDataInputSelect(resPrice, 'PRICE'),
        listProvince: this.buildDataInputSelect(resProvince, 'PROVINCE'),
        listSpecialty: this.buildDataInputSelect(this.props.allSpecialty, 'SPECIALTY'),
        listClinic: this.buildDataInputSelect(clinicsRaw, 'CLINIC'),
      });

      // Also rebuild selected composite values for price/payment/province
      if (detailDoctor) {
        const selectedPrice = (resPrice || []).find((i) => i.keyMap === detailDoctor?.DoctorInfoData?.priceId);
        const selectedPayment = (resPayment || []).find((i) => i.keyMap === detailDoctor?.DoctorInfoData?.paymentId);
        const selectedProvince = (resProvince || []).find((i) => i.keyMap === detailDoctor?.DoctorInfoData?.provinceId);
        this.setState({
          selectedPrice: selectedPrice
            ? { label: language === LANGUAGES.VI ? selectedPrice.valueVi : selectedPrice.valueEn, value: selectedPrice.keyMap }
            : '',
          selectedPayment: selectedPayment
            ? { label: language === LANGUAGES.VI ? selectedPayment.valueVi : selectedPayment.valueEn, value: selectedPayment.keyMap }
            : '',
          selectedProvince: selectedProvince
            ? { label: language === LANGUAGES.VI ? selectedProvince.valueVi : selectedProvince.valueEn, value: selectedProvince.keyMap }
            : '',
        });
      }
    }

    // 5) detail doctor loaded -> hydrate form
    if (prevProps.detailDoctor !== detailDoctor) {
      if (detailDoctor) {
        const { resPayment, resPrice, resProvince } = allRequiredDoctorInfo || {};
        const selectedPrice = (resPrice || []).find((i) => i.keyMap === detailDoctor?.DoctorInfoData?.priceId);
        const selectedPayment = (resPayment || []).find((i) => i.keyMap === detailDoctor?.DoctorInfoData?.paymentId);
        const selectedProvince = (resProvince || []).find((i) => i.keyMap === detailDoctor?.DoctorInfoData?.provinceId);

        // NEW: specialty & clinic selected
        const selectedSpecialtyOpt = (this.state.listSpecialty || []).find(
          (opt) => opt.value === detailDoctor?.DoctorInfoData?.specialtyId
        );
        const selectedClinicOpt = (this.state.listClinic || []).find(
          (opt) => opt.value === detailDoctor?.DoctorInfoData?.clinicId
        );

        this.setState({
          contentMarkdown: detailDoctor?.markdownData?.contentMarkdown || '',
          contentHTML: detailDoctor?.markdownData?.contentHTML || '',
          description: detailDoctor?.markdownData?.description || '',
          selectedPrice: selectedPrice
            ? { label: this.labelByLang(selectedPrice), value: selectedPrice.keyMap }
            : '',
          selectedPayment: selectedPayment
            ? { label: this.labelByLang(selectedPayment), value: selectedPayment.keyMap }
            : '',
          selectedProvince: selectedProvince
            ? { label: this.labelByLang(selectedProvince), value: selectedProvince.keyMap }
            : '',
          nameClinic: detailDoctor?.DoctorInfoData?.nameClinic || '',
          addressClinic: detailDoctor?.DoctorInfoData?.addressClinic || '',
          note: detailDoctor?.DoctorInfoData?.note || '',
          selectedDoctor: (this.state.listDoctors || []).find((i) => i.value === detailDoctor.id) || null,
          detailDoctor: detailDoctor,
          hasOldData: !!detailDoctor?.markdownData?.contentMarkdown,
          selectedSpecialty: selectedSpecialtyOpt || '',
        //   selectedClinic: selectedClinicOpt || '',
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
          hasOldData: false,
          selectedSpecialty: '',
          selectedClinic: '',
        });
      }
    }
  }

  // Helpers
  labelByLang = (item) => (this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn);

  buildDataInputSelect = (inputData, type) => {
    const result = [];
    const language = this.props.language;
    const arr = Array.isArray(inputData) ? inputData : [];

    if (type === 'USERS') {
      arr.forEach((item) => {
        const labelVi = `${item.lastName} ${item.firstName}`;
        const labelEn = `${item.firstName} ${item.lastName}`;
        result.push({ label: language === LANGUAGES.VI ? labelVi : labelEn, value: item.id });
      });
      return result;
    }

    if (type === 'PRICE') {
      arr.forEach((item) => {
        result.push({ label: language === LANGUAGES.VI ? item.valueVi : item.valueEn, value: item.keyMap });
      });
      return result;
    }

    if (type === 'PAYMENT' || type === 'PROVINCE') {
      arr.forEach((item) => {
        result.push({ label: language === LANGUAGES.VI ? item.valueVi : item.valueEn, value: item.keyMap });
      });
      return result;
    }

    // NEW: specialty, clinic assume have `name`
    if (type === 'SPECIALTY' || type === 'CLINIC') {
      arr.forEach((item) => {
        result.push({ label: item.name, value: item.id });
      });
      return result;
    }

    return result;
  };

  // Editors & inputs
  handleEditorChange = ({ html, text }) => {
    this.setState({ contentMarkdown: text, contentHTML: html });
  };

  handleChangeSelected = (selectedOption, name) => {
    const stateName = name.name;
    this.setState({ [stateName]: selectedOption });
    if (stateName === 'selectedDoctor' && selectedOption?.value) {
      this.props.getDetailDoctor(selectedOption.value);
    }
  };

  handleOnChangeText = (event, id) => {
    this.setState({ [id]: event.target.value });
  };

  handleSaveContentMarkdown = () => {
    const {
      contentMarkdown,
      contentHTML,
      selectedDoctor,
      description,
      hasOldData,
      selectedPrice,
      selectedPayment,
      selectedProvince,
      nameClinic,
      addressClinic,
      note,
      selectedSpecialty,
    //   selectedClinic,
    } = this.state;

    if (!selectedDoctor) return; // vì sao: tránh gửi thiếu doctorId

    this.props.saveInfoDoctor({
      contentMarkdown,
      contentHTML,
      doctorId: selectedDoctor.value,
      description,
      actions: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      selectedPrice: selectedPrice?.value,
      selectedPayment: selectedPayment?.value,
      selectedProvince: selectedProvince?.value,
      nameClinic,
      addressClinic,
      note,
      specialtyId: selectedSpecialty?.value,
    //   clinicId: selectedClinic?.value,
    });
  };

  render() {
    const {
      listDoctors,
      selectedDoctor,
      description,
      hasOldData,
      listPrice,
      listPayment,
      listProvince,
      selectedPrice,
      selectedPayment,
      selectedProvince,
      nameClinic,
      addressClinic,
      note,
      // NEW
      listSpecialty,
      listClinic,
      selectedSpecialty,
      selectedClinic,
      contentMarkdown,
    } = this.state;

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>

        <div className="more-info">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={selectedDoctor}
              onChange={this.handleChangeSelected}
              options={listDoctors}
              placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
              name={'selectedDoctor'}
            />
          </div>

          <div className="content-right form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.introduction" />
            </label>
            <textarea
              name="doctor-info"
              rows={4}
              value={description}
              onChange={(e) => this.handleOnChangeText(e, 'description')}
            />
          </div>
        </div>

        <div className="more-info-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              value={selectedPrice}
              onChange={this.handleChangeSelected}
              options={listPrice}
              placeholder={'Chọn giá'}
              name={'selectedPrice'}
            />
          </div>

          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              value={selectedPayment}
              onChange={this.handleChangeSelected}
              options={listPayment}
              placeholder={'Chọn phương thức thanh toán'}
              name={'selectedPayment'}
            />
          </div>

          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              value={selectedProvince}
              onChange={this.handleChangeSelected}
              options={listProvince}
              placeholder={'Chọn tỉnh thành'}
              name={'selectedProvince'}
            />
          </div>

          {/* NEW row: Specialty & Clinic */}
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.specialty" />
            </label>
            <Select
              value={selectedSpecialty}
              onChange={this.handleChangeSelected}
              options={listSpecialty}
              placeholder={'Chọn chuyên khoa'}
              name={'selectedSpecialty'}
            />
          </div>

          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.clinic" />
            </label>
            <Select
              value={selectedClinic}
              onChange={this.handleChangeSelected}
              options={listClinic}
              placeholder={'Chọn phòng khám'}
              name={'selectedClinic'}
            />
          </div>
        </div>

        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: '300px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={contentMarkdown}
          />
        </div>

        <button
          onClick={this.handleSaveContentMarkdown}
          className={hasOldData ? 'btn btn-warning' : 'btn btn-primary'}
          style={{ marginTop: '20px' }}
        >
          {hasOldData ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.add" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allDoctors: state.admin.allDoctors,
  isLoggedIn: state.user.isLoggedIn,
  language: state.app.language,
  detailDoctor: state.admin.detailDoctor,
  allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  allSpecialty: state.admin.allSpecialty,
//   allClinics: state.admin.allClinics,
//   allClinic: state.admin.allClinic,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
  getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
  saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctorAction(data)),
  getDetailDoctor: (id) => dispatch(actions.getDetailDoctorAction(id)),
  fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
//   fetchAllClinic: () => dispatch(actions.fetchAllClinic && actions.fetchAllClinic()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
