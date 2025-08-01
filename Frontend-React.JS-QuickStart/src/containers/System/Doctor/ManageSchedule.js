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
            console.log("data", data);


            this.setState({
                rangeTime: this.props.allCodeScheduleTime
            });
        }
    }
    handleChangeSelectedDoctor = (selectedDoctor) => {
        this.setState({ selectedDoctor });
        // this.props.getDetailDoctor(selectedDoctor.value);

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
            selectedDate: date[0]
        });
    }
    handleClickBtnTime = (item) => {
        let { rangeTime, selectedTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            let newRangeTime = rangeTime.map(time => {
                if (time.id === item.id) {
                    time.isSelected = !time.isSelected;
                    selectedTime = time.isSelected ? [...selectedTime, time] : selectedTime.filter(t => t.id !== time.id);
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
        let { selectedDoctor, selectedDate, selectedTime } = this.state;
        if (!selectedDoctor) {
            toast.warning("Please select a doctor");
            return;
        }
        if (!selectedDate) {
            toast.warning("Please select a date");
            return;
        }
        if (selectedTime.length === 0) {
            toast.warning("Please select a time");
            return;
        }

        let formattedDate = new Date(selectedDate).getTime();
        let scheduleData = {};

        // if (selectedTime && selectedTime.length > 0) {
        //     scheduleData = selectedTime.map(item => {
        //         return {
        //             doctorId: selectedDoctor.value,
        //             date: formattedDate,
        //             time: item.keyMap
        //         };
        //     });
        // }
        if (selectedTime && selectedTime.length > 0) {
            scheduleData = {
                doctorId: selectedDoctor.value,
                date: formattedDate,
                time: selectedTime.map(item => ({
                    timeType: item.keyMap,
                    maxNumber: item.maxNumber || 10 // nếu bạn có trường này trong item
                }))
            }
        }
        this.props.saveBulkScheduleDoctor(scheduleData);

        console.log("Schedule Data: ", scheduleData);


    }
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
                                        className={`${language === LANGUAGES.VI ? 'btn btn-schedule vi' : 'btn btn-schedule en'} ${item.isSelected ? 'active' : ''}`}
                                        onClick={() => this.handleClickBtnTime(item)}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllCodeScheduleTime: () => dispatch(actions.fetchAllCodeScheduleTime()),
        saveBulkScheduleDoctor: (data) => dispatch(actions.saveBulkScheduleDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
