import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './DoctorSchedule.scss';
import Select from 'react-select'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils'
import * as actions from '../../../store/actions';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            selectedDay: null,
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
    }

    getAllDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            let date = moment(new Date()).add(i, 'days');
            if (language === LANGUAGES.VI) {
                object.label = date.format('dddd - DD/MM');
            } else {
                object.label = date.locale('en').format('dddd - DD/MM');
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
        const { allDays, selectedDay } = this.state;

        const customStyles = {
            control: (provided, state) => ({
                ...provided,
                width: 200,
                minHeight: 40,
                borderRadius: 8,
                borderColor: state.isFocused ? '#2684FF' : '#ccc',
                boxShadow: state.isFocused ? '0 0 0 1px #2684FF' : 'none',
                '&:hover': {
                    borderColor: '#2684FF'
                },
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
                <div className="all-available-time"></div>
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