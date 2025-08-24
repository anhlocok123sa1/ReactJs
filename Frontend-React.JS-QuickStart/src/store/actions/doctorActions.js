import actionTypes from './actionTypes';
import {
    getTopDoctorHomeServices,
    getAllDoctorsServices,
    saveInfoDoctorServices,
    getDetailsDoctorServices,
    bulkCreateScheduleServices,
    getDoctorScheduleServices,
    getExtraInfoDoctorById,
    getAllCodeServices,
} from '../../services/userService';

// ============== TOP DOCTOR HOME ==============
export const fetchTopDoctorHome = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_HOME_START });
            const res = await getTopDoctorHomeServices(10);
            if (res && res.errCode === 0) dispatch(fetchTopDoctorHomeSuccess(res.data));
            else dispatch(fetchTopDoctorHomeFailed());
        } catch (e) {
            dispatch(fetchTopDoctorHomeFailed());
            console.error('fetch top doctor home error:', e);
        }
    };
};
export const fetchTopDoctorHomeSuccess = (data) => ({ type: actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS, data });
export const fetchTopDoctorHomeFailed = () => ({ type: actionTypes.FETCH_TOP_DOCTOR_HOME_FAILED });

// ============== ALL DOCTORS ==============
export const fetchAllDoctors = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_START });
            const res = await getAllDoctorsServices();
            if (res && res.errCode === 0) dispatch(fetchAllDoctorsSuccess(res.data));
            else dispatch(fetchAllDoctorsFailed());
        } catch (e) {
            dispatch(fetchAllDoctorsFailed());
            console.error('fetch all doctors error:', e);
        }
    };
};
export const fetchAllDoctorsSuccess = (data) => ({ type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS, data });
export const fetchAllDoctorsFailed = () => ({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });

// ============== SAVE INFO DOCTOR ==============
export const saveInfoDoctorAction = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.SAVE_INFO_DOCTOR_START });
            const res = await saveInfoDoctorServices(data);
            if (res && res.errCode === 0) dispatch(saveInfoDoctorSuccess());
            else dispatch(saveInfoDoctorFailed());
        } catch (e) {
            dispatch(saveInfoDoctorFailed());
            console.error('save info doctor error:', e);
        }
    };
};
export const saveInfoDoctorSuccess = () => ({ type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS });
export const saveInfoDoctorFailed = () => ({ type: actionTypes.SAVE_INFO_DOCTOR_FAILED });

// ============== GET DETAIL DOCTOR ==============
export const getDetailDoctorAction = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.GET_DETAIL_DOCTOR_START, doctorId: id });
            const res = await getDetailsDoctorServices(id);
            if (res && res.errCode === 0) dispatch(getDetailDoctorSuccess(res.data, id));
            else dispatch(getDetailDoctorFailed());
        } catch (e) {
            dispatch(getDetailDoctorFailed());
            console.error('get detail doctor error:', e);
        }
    };
};
export const getDetailDoctorSuccess = (data, id) => ({ type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS, data, doctorId: id });
export const getDetailDoctorFailed = () => ({ type: actionTypes.GET_DETAIL_DOCTOR_FAILED });

// ============== SCHEDULE TIME (all code) ==============
export const fetchAllCodeScheduleTime = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_START });
            const res = await getAllCodeServices('TIME');
            if (res && res.errCode === 0) dispatch(fetchAllCodeScheduleTimeSuccess(res.data));
            else dispatch(fetchAllCodeScheduleTimeFailed());
        } catch (e) {
            dispatch(fetchAllCodeScheduleTimeFailed());
            console.error('fetch schedule time error:', e);
        }
    };
};
export const fetchAllCodeScheduleTimeSuccess = (data) => ({ type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS, data });
export const fetchAllCodeScheduleTimeFailed = () => ({ type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED });

// ============== BULK SCHEDULE ==============
export const saveBulkScheduleDoctor = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_START });
            const res = await bulkCreateScheduleServices(data);
            if (res && res.errCode === 0) dispatch(saveBulkScheduleDoctorSuccess());
            else dispatch(saveBulkScheduleDoctorFailed());
        } catch (e) {
            dispatch(saveBulkScheduleDoctorFailed());
            console.error('save bulk schedule doctor error:', e);
        }
    };
};
export const saveBulkScheduleDoctorSuccess = () => ({ type: actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_SUCCESS });
export const saveBulkScheduleDoctorFailed = () => ({ type: actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_FAILED });

// ============== FETCH DOCTOR SCHEDULE ==============
export const getDoctorSchedule = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_DOCTOR_SCHEDULE_START, doctorId: data.doctorId });
            const res = await getDoctorScheduleServices(data.doctorId, data.date);
            if (res && res.errCode === 0) dispatch(getDoctorScheduleSuccess(res.data, data.doctorId));
            else dispatch(getDoctorScheduleFailed());
        } catch (e) {
            dispatch(getDoctorScheduleFailed());
            console.error('get doctor schedule error:', e);
        }
    };
};
export const getDoctorScheduleSuccess = (data, doctorId) => ({ type: actionTypes.FETCH_DOCTOR_SCHEDULE_SUCCESS, data, doctorId });
export const getDoctorScheduleFailed = () => ({ type: actionTypes.FETCH_DOCTOR_SCHEDULE_FAILED });

// ============== EXTRA DOCTOR INFO ==============
export const getExtraDoctorInfo = (doctorId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_EXTRA_DOCTOR_INFO_START, doctorId });
            const res = await getExtraInfoDoctorById(doctorId);
            if (res && res.errCode === 0) dispatch(getExtraDoctorInfoSuccess(res.data, doctorId));
            else dispatch(getExtraDoctorInfoFailed());
        } catch (e) {
            dispatch(getExtraDoctorInfoFailed());
            console.error('get extra doctor info error:', e);
        }
    };
};
export const getExtraDoctorInfoSuccess = (data, doctorId) => ({ type: actionTypes.FETCH_EXTRA_DOCTOR_INFO_SUCCESS, data, doctorId });
export const getExtraDoctorInfoFailed = () => ({ type: actionTypes.FETCH_EXTRA_DOCTOR_INFO_FAILED });
