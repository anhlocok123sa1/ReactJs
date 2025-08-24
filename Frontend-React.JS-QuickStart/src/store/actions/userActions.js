import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import {
    createNewUserServices,
    getAllUsers,
    deleteUserServices,
    editUserServices,
    postPatientBookingAppointment,
    postVerifyBookingAppointmentServices,
} from '../../services/userService';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

// ============== CREATE NEW USER ==============
export const createNewUser = (data) => {
    return async (dispatch) => {
        try {
            const res = await createNewUserServices(data);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Create a new user error!');
                dispatch(createUserFailed());
            }
        } catch (e) {
            dispatch(createUserFailed());
            console.error('create user failed:', e);
        }
    };
};
export const createUserSuccess = () => ({ type: actionTypes.CREATE_USER_SUCCESS });
export const createUserFailed = () => ({ type: actionTypes.CREATE_USER_FAILED });

// ============== ALL USERS ==============
export const fetchAllUsersStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_USERS_START });
            const res = await getAllUsers('ALL');
            if (res && res.errCode === 0) dispatch(fetchAllUsersSuccess(res.users));
            else dispatch(fetchAllUsersFailed());
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.error('fetch all users error:', e);
        }
    };
};
export const fetchAllUsersSuccess = (data) => ({ type: actionTypes.FETCH_ALL_USERS_SUCCESS, data });
export const fetchAllUsersFailed = () => ({ type: actionTypes.FETCH_ALL_USERS_FAILED });

// ============== DELETE USER ==============
export const deleteUser = (id) => {
    return async (dispatch) => {
        try {
            const res = await deleteUserServices(id);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success('Delete user success!');
            } else {
                toast.error('Delete user failed!');
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.error('delete user failed:', e);
        }
    };
};
export const deleteUserSuccess = () => ({ type: actionTypes.DELETE_USER_SUCCESS });
export const deleteUserFailed = () => ({ type: actionTypes.DELETE_USER_FAILED });

// ============== EDIT USER ==============
export const editUser = (id) => {
    return async (dispatch) => {
        try {
            const res = await editUserServices(id);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success('Edit user success!');
            } else {
                toast.error('Edit user failed!');
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.error('edit user failed:', e);
        }
    };
};
export const editUserSuccess = () => ({ type: actionTypes.EDIT_USER_SUCCESS });
export const editUserFailed = () => ({ type: actionTypes.EDIT_USER_FAILED });

// ============== BOOKING (Patient) ==============
export const savePatientBookingAppointment = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.SAVE_PATIENT_BOOKING_APPOINTMENT_START });
            const res = await postPatientBookingAppointment(data);
            if (res && res.errCode === 0) {
                dispatch(savePatientBookingAppointmentSuccess(res.data));
                toast.success('Booking a new appointment success!');
            } else {
                dispatch(savePatientBookingAppointmentFailed());
                toast.error('Booking a new appointment failed!');
            }
        } catch (e) {
            dispatch(savePatientBookingAppointmentFailed());
            console.error('save patient booking appointment error:', e);
        }
    };
};
export const savePatientBookingAppointmentSuccess = (data) => ({ type: actionTypes.SAVE_PATIENT_BOOKING_APPOINTMENT_SUCCESS, data });
export const savePatientBookingAppointmentFailed = () => ({ type: actionTypes.SAVE_PATIENT_BOOKING_APPOINTMENT_FAILED });

export const postVerifyBookAppointment = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.POST_VERIFY_BOOK_APPOINTMENT_START });
            const res = await postVerifyBookingAppointmentServices(data);
            if (res?.errCode === 0) {
                toast.success(res.errMessage || 'Verify booking success!');
            } else if (res?.errCode === 2) {
                toast.warn(res.errMessage || 'Appointment not found or token invalid');
            } else if (res?.errCode === 3) {
                toast.info(res.errMessage || 'Appointment not pending verification');
            } else {
                toast.error(res?.errMessage || 'Verification failed');
            }
            dispatch({ type: actionTypes.POST_VERIFY_BOOK_APPOINTMENT_SUCCESS, payload: res });
        } catch (e) {
            console.error('postVerifyBookAppointment error:', e);
            toast.error('Server error');
            dispatch({ type: actionTypes.POST_VERIFY_BOOK_APPOINTMENT_FAILED, payload: { errCode: -1, errMessage: 'Error from server' } });
        }
    };
};
