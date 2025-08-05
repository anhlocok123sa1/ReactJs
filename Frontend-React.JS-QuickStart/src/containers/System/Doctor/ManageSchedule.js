import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';
import FormattedDate from '../../../components/Formating/FormattedDate';
import moment from 'moment';
import { toast } from 'react-toastify';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null,
            listDoctors: [],
            selectedDate: new Date().getTime(),
            rangeTime: [],
            selectedTime: []
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllCodeScheduleTime();
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
        if (prevProps.allCodeScheduleTime !== this.props.allCodeScheduleTime) {
            let data = this.props.allCodeScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }));
            }
            this.setState({
                rangeTime: data
            });
        }
        if (prevProps.doctorSchedule !== this.props.doctorSchedule) {
            let { rangeTime, selectedTime } = this.state;
            if (this.props.doctorSchedule && this.props.doctorSchedule && rangeTime && rangeTime.length > 0) {
                let updatedRangeTime = rangeTime.map(time => {
                    let scheduleItem = this.props.doctorSchedule.find(item => item.timeType === time.keyMap);

                    return {
                        ...time,
                        isDisabled: scheduleItem ? scheduleItem.currentNumber >= scheduleItem.maxNumber : false,
                        isSelected: scheduleItem ? true : false
                    };
                });

                let newSelectedTime = updatedRangeTime.filter(time => time.isSelected);

                this.setState({
                    rangeTime: updatedRangeTime,
                    selectedTime: newSelectedTime
                });
            }
        }
    }
    handleChangeSelectedDoctor = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () => {
            let { selectedDate } = this.state;
            if (selectedDoctor && selectedDate) {
                this.props.getDoctorSchedule({
                    doctorId: selectedDoctor.value,
                    date: new Date(selectedDate).getTime()
                });
            }
        });
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

    handleChangeDate = (date) => {
        this.setState({
            selectedDate: date[0],
            selectedTime: [],
        }, () => {
            const { selectedDoctor, selectedDate } = this.state;
            if (selectedDoctor && selectedDate) {
                this.props.getDoctorSchedule({
                    doctorId: selectedDoctor.value,
                    date: new Date(selectedDate).getTime()
                });
            }
        });
    };
    handleClickBtnTime = (item) => {
        let { rangeTime, selectedTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            let newRangeTime = rangeTime.map(time => {

                if (time.id === item.id) {
                    // Kiểm tra xem time này có tồn tại trong DB không
                    const existsInDB = this.props.doctorSchedule?.data?.some(
                        schedule => schedule.timeType === time.keyMap
                    );

                    // Nếu tồn tại trong DB thì không cho bỏ chọn
                    if (existsInDB) {
                        toast.warning("Không thể bỏ chọn khung giờ đã được đặt trong hệ thống");
                        return time;
                    }

                    time.isSelected = !time.isSelected;
                    selectedTime = time.isSelected
                        ? [...selectedTime, time]
                        : selectedTime.filter(t => t.id !== time.id);
                }
                return time;
            });
            this.setState({
                rangeTime: newRangeTime,
                selectedTime: selectedTime
            });
        }
    };

    handleSaveSchedule = () => {
        const { selectedDoctor, selectedDate, selectedTime } = this.state;
        const { doctorSchedule } = this.props;

        // Validate
        if (!selectedDoctor) {
            toast.warning("Vui lòng chọn bác sĩ");
            return;
        }
        if (!selectedDate) {
            toast.warning("Vui lòng chọn ngày");
            return;
        }
        if (selectedTime.length === 0) {
            toast.warning("Vui lòng chọn ít nhất một khung giờ");
            return;
        }

        // Lọc ra chỉ những time chưa tồn tại trong DB
        const newTimes = selectedTime.filter(time =>
            !doctorSchedule?.data?.some(schedule => schedule.timeType === time.keyMap)
        );

        if (newTimes.length === 0) {
            toast.warning("Tất cả các khung giờ đã được lưu trước đó");
            return;
        }

        // Prepare data chỉ với các time mới
        const scheduleData = {
            doctorId: selectedDoctor.value,
            date: new Date(selectedDate).getTime(),
            time: newTimes.map(item => ({
                timeType: item.keyMap,
                maxNumber: item.maxNumber || 10
            }))
        };

        // Dispatch action
        this.props.saveBulkScheduleDoctor(scheduleData)
    };
    render() {
        let { listDoctors, selectedDoctor, selectedDate, rangeTime } = this.state;
        let { language } = this.props;



        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="manage-schedule.select-doctor" />
                            </label>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChangeSelectedDoctor}
                                options={listDoctors}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">
                                <FormattedMessage id="manage-schedule.select-date" />
                            </label>
                            <DatePicker
                                onChange={this.handleChangeDate}
                                className="form-control"
                                value={selectedDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                return (
                                    <button
                                        key={index}
                                        className={`${language === LANGUAGES.VI ? 'btn btn-schedule vi' : 'btn btn-schedule en'} 
        ${item.isSelected ? 'active' : ''}
        ${item.isDisabled && !item.isSelected ? 'disabled' : ''}`}
                                        onClick={() => this.handleClickBtnTime(item)}
                                        disabled={item.isDisabled && !item.isSelected} // Chỉ disable nếu full và chưa được chọn
                                    >
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                );
                            }
                            )}
                        </div>
                        <div className="col-12">
                            <button
                                className='btn btn-primary'
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save-schedule" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allCodeScheduleTime: state.admin.allCodeScheduleTime,
        bulkScheduleDoctor: state.admin.bulkScheduleDoctor,
        doctorSchedule: state.admin.doctorSchedule
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllCodeScheduleTime: () => dispatch(actions.fetchAllCodeScheduleTime()),
        saveBulkScheduleDoctor: (data) => dispatch(actions.saveBulkScheduleDoctor(data)),
        getDoctorSchedule: (data) => dispatch(actions.getDoctorSchedule(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
