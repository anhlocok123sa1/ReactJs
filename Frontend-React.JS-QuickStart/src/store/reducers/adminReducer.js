import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    isLoadingRole: false,
    roles: [],
    isLoadingPosition: false,
    positions: [],
    isLoadingAllUsers: false,
    allUsers: [],
    isLoadingTopDoctors: false,
    topDoctors: [],
    isLoadingAllDoctors: false,
    allDoctors: [],
    isLoadingDetailDoctor: false,
    detailDoctor: {},
    isLoadingAllCodeScheduleTime: false,
    allCodeScheduleTime: [],
    isLoadingBulkScheduleDoctor: false,
    bulkScheduleDoctor: [],
    isLoadingDoctorSchedule: false,
    doctorSchedule: [],
    isLoadingAllRequiredDoctorInfo: false,
    allRequiredDoctorInfo: [],
    isLoadingExtraDoctorInfo: false,
    extraDoctorInfo: []
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // GENDER
        case actionTypes.FETCH_GENDER_START: {
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            // console.log('fetch gender start: ', action);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_GENDER_SUCCESS: {
            let copyState = { ...state };
            copyState.genders = action.data;
            copyState.isLoadingGender = false;
            // console.log('fetch gender success: ', copyState);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_GENDER_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingGender = false;
            copyState.genders = [];
            // console.log('fetch gender failed: ', copyState);
            return {
                ...copyState,
            };
        }

        // ROLE
        case actionTypes.FETCH_ROLE_START: {
            let copyState = { ...state };
            copyState.isLoadingRole = true;
            // console.log('fetch role start: ', action);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_ROLE_SUCCESS: {
            let copyState = { ...state };
            copyState.roles = action.data;
            copyState.isLoadingRole = false;
            // console.log('fetch role success: ', copyState);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_ROLE_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingRole = false;
            copyState.roles = [];
            // console.log('fetch role failed: ', copyState);
            return {
                ...copyState,
            };
        }

        // POSITION
        case actionTypes.FETCH_POSITION_START: {
            let copyState = { ...state };
            copyState.isLoadingPosition = true;
            // console.log('fetch position start: ', action);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_POSITION_SUCCESS: {
            let copyState = { ...state };
            copyState.positions = action.data;
            copyState.isLoadingPosition = false;
            // console.log('fetch position success: ', copyState);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_POSITION_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingPosition = false;
            copyState.positions = [];
            // console.log('fetch position failed: ', copyState);
            return {
                ...copyState,
            };
        }

        //ALL USERS
        case actionTypes.FETCH_ALL_USERS_START: {
            let copyState = { ...state };
            copyState.isLoadingAllUsers = true;
            // console.log('fetch all users start: ', action);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_ALL_USERS_SUCCESS: {
            let copyState = { ...state };
            copyState.allUsers = action.data;
            copyState.isLoadingAllUsers = false;
            // console.log('fetch all users success: ', copyState);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_ALL_USERS_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingAllUsers = false;
            copyState.allUsers = [];
            // console.log('fetch all users failed: ', copyState);
            return {
                ...copyState,
            };
        }

        //TOP DOCTOR
        case actionTypes.FETCH_TOP_DOCTOR_HOME_START: {
            let copyState = { ...state };
            copyState.isLoadingTopDoctors = true;
            // console.log('fetch top doctor start: ', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS: {
            let copyState = { ...state };
            copyState.topDoctors = action.data;
            copyState.isLoadingTopDoctors = false;
            // console.log('fetch top doctor success: ', copyState);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_TOP_DOCTOR_HOME_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingTopDoctors = false;
            copyState.topDoctors = [];
            // console.log('fetch top doctor failed: ', copyState);
            return {
                ...copyState,
            };
        }
        //ALL DOCTOR
        case actionTypes.FETCH_ALL_DOCTORS_START: {
            let copyState = { ...state };
            copyState.isLoadingAllDoctors = true;
            // console.log('fetch all doctor start: ', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS: {
            let copyState = { ...state };
            copyState.allDoctors = action.data;
            copyState.isLoadingAllDoctors = false;
            // console.log('fetch all doctor success: ', copyState);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingAllDoctors = false;
            copyState.allDoctors = [];
            // console.log('fetch all doctor failed: ', copyState);
            return {
                ...copyState,
            };
        }
        //GET DETAIL DOCTOR
        case actionTypes.GET_DETAIL_DOCTOR_START: {
            let copyState = { ...state };
            copyState.isLoadingDetailDoctor = true;
            // console.log('fetch detail doctor start: ', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.GET_DETAIL_DOCTOR_SUCCESS: {
            let copyState = { ...state };
            copyState.detailDoctor = action.data;
            copyState.isLoadingDetailDoctor = false;
            return {
                ...copyState,
            };
        }
        case actionTypes.GET_DETAIL_DOCTOR_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingDetailDoctor = false;
            copyState.detailDoctor = {};
            // console.log('fetch detail doctor failed: ', copyState);
            return {
                ...copyState,
            };
        }
        //GET ALL CODE SCHEDULE TIME
        case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_START: {
            let copyState = { ...state };
            copyState.isLoadingAllCodeScheduleTime = true;
            // console.log('fetch all code schedule time start: ', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS: {
            let copyState = { ...state };
            copyState.allCodeScheduleTime = action.data;
            copyState.isLoadingAllCodeScheduleTime = false;
            // console.log('fetch all code schedule time success: ', copyState);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingAllCodeScheduleTime = false;
            copyState.allCodeScheduleTime = [];
            // console.log('fetch all code schedule time failed: ', copyState);
            return {
                ...copyState,
            };
        }

        //SAVE BULK SCHEDULE DOCTOR
        case actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_START: {
            let copyState = { ...state };
            copyState.isLoadingBulkScheduleDoctor = true;
            // console.log('save bulk schedule doctor start: ', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_SUCCESS: {
            let copyState = { ...state };
            copyState.isLoadingBulkScheduleDoctor = false;
            copyState.bulkScheduleDoctor = action.data;
            // console.log('save bulk schedule doctor success: ', copyState);
            return {
                ...copyState,
            };
        }
        case actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingBulkScheduleDoctor = false;
            copyState.bulkScheduleDoctor = [];
            // console.log('save bulk schedule doctor failed: ', copyState);
            return {
                ...copyState,
            };
        }

        //FETCH DOCTOR SCHEDULE
        case actionTypes.FETCH_DOCTOR_SCHEDULE_START: {
            let copyState = { ...state };
            copyState.isLoadingDoctorSchedule = true;
            // console.log('save bulk schedule doctor start: ', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_DOCTOR_SCHEDULE_SUCCESS: {
            let copyState = { ...state };
            copyState.isLoadingDoctorSchedule = false;
            copyState.doctorSchedule = action.data;
            // console.log('save bulk schedule doctor success: ', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_DOCTOR_SCHEDULE_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingDoctorSchedule = false;
            copyState.doctorSchedule = [];
            // console.log('save bulk schedule doctor failed: ', copyState);
            return {
                ...copyState,
            };
        }
        //FETCH REQUIRED DOCTOR INFO
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START: {
            let copyState = { ...state };
            copyState.isLoadingAllRequiredDoctorInfo = true;
            // console.log('save required doctor info start: ', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS: {
            let copyState = { ...state };
            copyState.isLoadingAllRequiredDoctorInfo = false;
            copyState.allRequiredDoctorInfo = action.data;
            // console.log('save required doctor info success: ', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingAllRequiredDoctorInfo = false;
            copyState.allRequiredDoctorInfo = [];
            // console.log('save required doctor info failed: ', copyState);
            return {
                ...copyState,
            };
        }
        //FETCH EXTRA DOCTOR INFO
        case actionTypes.FETCH_EXTRA_DOCTOR_INFO_START: {
            let copyState = { ...state };
            copyState.isLoadingExtraDoctorInfo = true;
            // console.log('save required doctor info start: ', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_EXTRA_DOCTOR_INFO_SUCCESS: {
            let copyState = { ...state };
            copyState.isLoadingExtraDoctorInfo = false;
            copyState.extraDoctorInfo = action.data;
            // console.log('save required doctor info success: ', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_EXTRA_DOCTOR_INFO_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingExtraDoctorInfo = false;
            copyState.extraDoctorInfo = [];
            // console.log('save required doctor info failed: ', copyState);
            return {
                ...copyState,
            };
        }

        default:
            return state;
    }
};

export default adminReducer;
