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
import BookingModal from './Modal/BookingModal';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            selectedDay: null,
            allAvalableTime: [],
            isOpenModal: false,
            selectedSchedule: null,
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
        // Đổi ngôn ngữ -> chỉ cập nhật label, giữ nguyên value đã chọn
        if (prevProps.language !== this.props.language) {
            // const allDays = this.getAllDays(this.props.language);
            // this.setState({
            //     allDays: allDays,
            //     selectedDay: allDays[0]
            // });
            let newAllDays = this.getAllDays(this.props.language);
            let { selectedDay } = this.state;

            let nextSelected =
                selectedDay
                    ? (newAllDays.find(d => d.value === selectedDay.value) || newAllDays[0])
                    : newAllDays[0];

            // chỉ setState khi thực sự khác để tránh render thừa
            let needUpdate =
                !this.state.allDays.length ||
                this.state.allDays[0].label !== newAllDays[0].label ||
                (this.state.selectedDay && this.state.selectedDay.value !== nextSelected.value);

            if (needUpdate) {
                this.setState({
                    allDays: newAllDays,
                    selectedDay: nextSelected
                });
            }
        }
        // Khi lịch từ redux đổi -> cập nhật vào state hiển thị
        if (prevProps.doctorSchedule !== this.props.doctorSchedule) {
            this.setState({
                allAvalableTime: this.props.doctorSchedule
            });
        }

        // Khi đổi bác sĩ -> lấy lịch theo NGÀY ĐANG CHỌN (không default về hôm nay)
        if (prevProps.doctorId !== this.props.doctorId) {
            const { selectedDay } = this.state;
            const safeDays = this.state.allDays.length ? this.state.allDays : this.getAllDays(this.props.language);
            const dateVal = selectedDay?.value ?? safeDays[0].value;

            this.props.getDoctorSchedule({
                doctorId: this.props.doctorId,
                date: dateVal
            });
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
        this.props.getDoctorSchedule({
            doctorId,
            date: selectedDay.value
        })
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            selectedSchedule: {
                ...time,
                // nếu cần thêm ngày đang chọn để gửi xuống modal
                date: this.state.selectedDay?.value
            },
            isOpenModal: true
        });
    };

    toggleBookingModal = () => {
        this.setState(prev => ({ isOpenModal: !prev.isOpenModal }));
    };


    render() {
        let { allDays, selectedDay, allAvalableTime } = this.state;
        let { language } = this.props
        let customStyles = {
            control: (provided, state) => (
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
            <>
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

                                            return (
                                                <button
                                                    className={language === LANGUAGES.VI ? 'btn btn-schedule vi' : 'btn btn-schedule en'}
                                                    key={index}
                                                    onClick={() => this.handleClickScheduleTime(item)}
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
                <BookingModal
                    isOpen={this.state.isOpenModal}
                    closeBookingModal={this.toggleBookingModal}
                    dataTime={this.state.selectedSchedule}
                />
            </>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        language: state.app.language,
        doctorSchedule: state.admin.doctorScheduleById?.[ownProps.doctorId],
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorSchedule: (data) => dispatch(actions.getDoctorSchedule(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DoctorSchedule));