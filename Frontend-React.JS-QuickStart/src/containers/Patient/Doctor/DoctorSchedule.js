import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './DoctorSchedule.scss';
import Select from 'react-select'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            selectedDay: null,
            allAvalableTime: [],
        };
    }

    componentDidMount() {
        let allDays = this.getAllDays(this.props.language);
        let { doctorId } = this.props
        this.setState({
            allDays: allDays,
            selectedDay: allDays[0]
        });
        this.props.getDoctorSchedule({
            doctorId: doctorId,
            date: allDays[0].value
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {
            const allDays = this.getAllDays(this.props.language);
            this.setState({
                allDays: allDays,
                selectedDay: allDays[0]
            });
        }
        if (prevProps.doctorSchedule !== this.props.doctorSchedule) {
            this.setState({
                allAvalableTime: this.props.doctorSchedule
            })
        }
    }

    capitalizeFirstLetter = (val) => {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    getAllDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            let date = moment(new Date()).add(i, 'days');
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let labelVi2 = date.format('DD/MM');
                    let today = `Hôm nay - ${labelVi2}`;
                    object.label = today
                } else {
                    let labelVi = date.format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let labelEn2 = date.format('DD/MM');
                    let today = `Today - ${labelEn2}`;
                    object.label = today
                } else {
                    let labelEn = date.locale('en').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelEn);
                }
            }
            object.value = date.startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }

    handleChangeDate = (selectedDay) => {
        this.setState({ selectedDay });
        let { doctorId } = this.props
        // TODO: Gọi API lấy lịch khám của bác sĩ ở đây nếu cần
        this.props.getDoctorSchedule({
            doctorId: doctorId,
            date: selectedDay.value
        })
    }

    render() {
        let { allDays, selectedDay, allAvalableTime } = this.state;
        let { language } = this.props
        let customStyles = {
            control: (provided, state) => (
                console.log("Check state select: ", provided),

                {
                    ...provided,
                    width: 200,
                    borderBottom: '1px solid #2684FF',
                    '&:hover': {
                        borderBottom: '1px solid #2684FF'
                    },
                    borderTop: "none",
                    borderLeft: 'none',
                    borderRight: 'none',
                    cursor: 'pointer',
                    color: '#2684FF',
                    fontWeight: '600',
                    fontColor: '#2684FF',
                    boxShadow: 'none',
                    borderRadius: 'none',
                }),
            menu: (provided) => ({
                ...provided,
                width: 200,
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                zIndex: 5,
            }),
            menuList: (provided) => ({
                ...provided,
                maxHeight: 200,
                padding: 0,
                overflowY: 'auto',
            }),
            option: (provided, state) => ({
                ...provided,
                padding: 10,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                backgroundColor: state.isSelected
                    ? '#2684FF'
                    : state.isFocused
                        ? '#E3F2FD'
                        : 'white',
                color: state.isSelected ? 'white' : 'black',
                cursor: 'pointer',
            }),
            singleValue: (provided) => ({
                ...provided,
                color: '#333',
            }),
        };

        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    {allDays.length > 0 &&
                        <Select
                            styles={customStyles}
                            options={allDays}
                            value={selectedDay}
                            onChange={this.handleChangeDate}
                        />
                    }
                </div>
                <div className="all-available-time">
                    <div className="text-calendar">
                        <span><i className="fas fa-calendar-alt"></i>
                            <FormattedMessage id="patient.detail-doctor.schedule" />
                        </span>
                    </div>
                    <div className="time-content">
                        {allAvalableTime && allAvalableTime.length > 0 ?
                            <>
                                <div className="time-content-btns">
                                    {allAvalableTime.map((item, index) => {
                                        console.log("check item", item);

                                        return (
                                            <button
                                                className={language === LANGUAGES.VI ? 'btn btn-schedule vi' : 'btn btn-schedule en'}
                                                key={index}
                                            >
                                                {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                            </button>
                                        )
                                    })}
                                </div>

                                <div className="book-free">
                                    <FormattedMessage id="patient.detail-doctor.select" />
                                    <i className="far fa-hand-point-up"></i>
                                    <FormattedMessage id="patient.detail-doctor.book-free" />
                                </div>
                            </>
                            :
                            <div className="no-schedule">
                                <FormattedMessage id="patient.detail-doctor.no-schedule" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorSchedule: state.admin.doctorSchedule
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorSchedule: (data) => dispatch(actions.getDoctorSchedule(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DoctorSchedule));