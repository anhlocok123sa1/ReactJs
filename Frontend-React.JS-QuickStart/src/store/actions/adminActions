import actionTypes from './actionTypes';
import {
    getAllCodeServices,
    createNewUserServices,
    getAllUsers,
    deleteUserServices,
    editUserServices,
    getTopDoctorHomeServices,
    getAllDoctorsServices,
    saveInfoDoctorServices,
    getDetailsDoctorServices,
    bulkCreateScheduleServices,
    getDoctorScheduleServices,
    getExtraInfoDoctorById,
    postPatientBookingAppointment,
    postVerifyBookingAppointmentServices,
    createNewSpecialtyServices,
    getAllSpecialtysServices,
    getDetailsSpecialtyByIdServices,
    createNewClinicServices,
    getAllClinicServices,
    getDetailsClinicByIdServices,
    getAllClinicRedux
} from '../../services/userService';
import { toast } from 'react-toastify';

// ================== GENDER ==================
export const fetchGenderStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeServices("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.error('fetch gender start error:', e);
        }
    };
};
export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
});

// ================== ROLE ==================
export const fetchRoleStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START });
            let res = await getAllCodeServices("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.error('fetch role error:', e);
        }
    };
};
export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
});

// ================== POSITION ==================
export const fetchPositionStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START });
            let res = await getAllCodeServices("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.error('fetch position error:', e);
        }
    };
};
export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
});

// ================== CREATE NEW USER ==================
export const createNewUser = (data) => {
    return async (dispatch) => {
        try {
            let res = await createNewUserServices(data);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Create a new user error!");
                dispatch(createUserFailed());
            }
        } catch (e) {
            dispatch(createUserFailed());
            console.error('create user failed:', e);
        }
    };
};
export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});
export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

// ================== ALL USERS ==================
export const fetchAllUsersStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_USERS_START });
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users));
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.error('fetch all users error:', e);
        }
    };
};
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data
});
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
});

// ================== DELETE USER ==================
export const deleteUser = (id) => {
    return async (dispatch) => {
        try {
            let res = await deleteUserServices(id);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success("Delete user success!");
            } else {
                toast.error("Delete user failed!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.error('delete user failed:', e);
        }
    };
};
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

// ================== EDIT USER ==================
export const editUser = (id) => {
    return async (dispatch) => {
        try {
            let res = await editUserServices(id);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success("Edit user success!");
            } else {
                toast.error("Edit user failed!");
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.error('edit user failed:', e);
        }
    };
};
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

// ================== FETCH TOP DOCTOR HOME ==================
export const fetchTopDoctorHome = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_HOME_START });
            let res = await getTopDoctorHomeServices(10);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorHomeSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorHomeFailed());
            }
        } catch (e) {
            dispatch(fetchTopDoctorHomeFailed());
            console.error('fetch top doctor home error:', e);
        }
    };
};
export const fetchTopDoctorHomeSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS,
    data
});
export const fetchTopDoctorHomeFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_HOME_FAILED
});

// ================== FETCH ALL DOCTORS ==================
export const fetchAllDoctors = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_START });
            let res = await getAllDoctorsServices();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data));
            } else {
                dispatch(fetchAllDoctorsFailed());
            }
        } catch (e) {
            dispatch(fetchAllDoctorsFailed());
            console.error('fetch all doctors error:', e);
        }
    };
};
export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    data
});
export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
});

// ================== SAVE INFO DOCTOR ==================
export const saveInfoDoctorAction = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.SAVE_INFO_DOCTOR_START });
            let res = await saveInfoDoctorServices(data);
            if (res && res.errCode === 0) {
                dispatch(saveInfoDoctorSuccess());
                toast.success("Save info doctor success!");
            } else {
                dispatch(saveInfoDoctorFailed());
                toast.error("Save info doctor failed!");
            }
        } catch (e) {
            dispatch(saveInfoDoctorFailed());
            console.error('save info doctor error:', e);
        }
    };
};
export const saveInfoDoctorSuccess = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
});
export const saveInfoDoctorFailed = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
});

// ================== GET DETAIL DOCTOR ==================
export const getDetailDoctorAction = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.GET_DETAIL_DOCTOR_START ,  doctorId: id });
            let res = await getDetailsDoctorServices(id);

            if (res && res.errCode === 0) {
                dispatch(getDetailDoctorSuccess(res.data, id));
            } else {
                dispatch(getDetailDoctorFailed());
            }
        } catch (e) {
            dispatch(getDetailDoctorFailed());
            console.error('get detail doctor error:', e);
        }
    };
};
export const getDetailDoctorSuccess = (data, id) => ({
    type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
    data,
    doctorId: id
});
export const getDetailDoctorFailed = () => ({
    type: actionTypes.GET_DETAIL_DOCTOR_FAILED
});

// ================== FETCH ALL CODE SCHEDULE TIME ==================
export const fetchAllCodeScheduleTime = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_START });
            let res = await getAllCodeServices("TIME");
            if (res && res.errCode === 0) {
                dispatch(fetchAllCodeScheduleTimeSuccess(res.data));
            } else {
                dispatch(fetchAllCodeScheduleTimeFailed());
            }
        } catch (e) {
            dispatch(fetchAllCodeScheduleTimeFailed());
            console.error('fetch schedule time error:', e);
        }
    };
};
export const fetchAllCodeScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS,
    data
});
export const fetchAllCodeScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED
});

// ================== SAVE BULK SCHEDULE DOCTOR ==================
export const saveBulkScheduleDoctor = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_START });
            let res = await bulkCreateScheduleServices(data);
            if (res && res.errCode === 0) {
                dispatch(saveBulkScheduleDoctorSuccess());
                toast.success("Save bulk schedule doctor success!");
            } else {
                dispatch(saveBulkScheduleDoctorFailed());
                toast.error("Save bulk schedule doctor failed!");
            }
        } catch (e) {
            dispatch(saveBulkScheduleDoctorFailed());
            console.error('save bulk schedule doctor error:', e);
        }
    };
};
export const saveBulkScheduleDoctorSuccess = () => ({
    type: actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_SUCCESS,
});
export const saveBulkScheduleDoctorFailed = () => ({
    type: actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_FAILED,
});

// ================== FETCH DOCTOR SCHEDULE ==================
export const getDoctorSchedule = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_DOCTOR_SCHEDULE_START, doctorId: data.doctorId });
            let res = await getDoctorScheduleServices(data.doctorId, data.date);
            if (res && res.errCode === 0) {
                dispatch(getDoctorScheduleSuccess(res.data , data.doctorId));
            } else {
                dispatch(getDoctorScheduleFailed());
            }
        } catch (e) {
            dispatch(getDoctorScheduleFailed());
            console.error('get doctor schedule error:', e);
        }
    };
};
export const getDoctorScheduleSuccess = (data, doctorId) => ({
    type: actionTypes.FETCH_DOCTOR_SCHEDULE_SUCCESS,
    data,
    doctorId
});
export const getDoctorScheduleFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_SCHEDULE_FAILED,
});

// ================== REQUIRED DOCTOR INFO ==================
export const getRequiredDoctorInfo = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START });
            let resPrice = await getAllCodeServices("PRICE");
            let resPayment = await getAllCodeServices("PAYMENT");
            let resProvince = await getAllCodeServices("PROVINCE");
            let resSpecialty = await getAllSpecialtysServices();
            let resClinic = await getAllClinicServices();
            if (resPrice?.errCode === 0
                && resPayment?.errCode === 0
                && resProvince?.errCode === 0
                && resSpecialty?.errCode === 0
                && resClinic?.errCode === 0
            ) {
                dispatch(getRequiredDoctorInfoSuccess({
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }));
            } else {
                dispatch(getRequiredDoctorInfoFailed());
            }
        } catch (e) {
            dispatch(getRequiredDoctorInfoFailed());
            console.error('get required doctor info error:', e);
        }
    };
};
export const getRequiredDoctorInfoSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data
});
export const getRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
});

// ================== GET EXTRA DOCTOR INFO ==================
export const getExtraDoctorInfo = (doctorId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_EXTRA_DOCTOR_INFO_START, doctorId });
            let res = await getExtraInfoDoctorById(doctorId);
            if (res && res.errCode === 0) {
                dispatch(getExtraDoctorInfoSuccess(res.data, doctorId));
            } else {
                dispatch(getExtraDoctorInfoFailed());
            }
        } catch (e) {
            dispatch(getExtraDoctorInfoFailed());
            console.error('get extra doctor info error:', e);
        }
    };
};
export const getExtraDoctorInfoSuccess = (data, doctorId) => ({
    type: actionTypes.FETCH_EXTRA_DOCTOR_INFO_SUCCESS,
    data,
    doctorId
});
export const getExtraDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_EXTRA_DOCTOR_INFO_FAILED
});

// ================== SAVE PATIENT BOOKING APPOINTMENT ==================
export const savePatientBookingAppointment = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.SAVE_PATIENT_BOOKING_APPOINTMENT_START });
            let res = await postPatientBookingAppointment(data);
            if (res && res.errCode === 0) {
                dispatch(savePatientBookingAppointmentSuccess(res.data));
                toast.success("Booking a new appointment success!");
            } else {
                dispatch(savePatientBookingAppointmentFailed());
                toast.error("Booking a new appointment failed!");
            }
        } catch (e) {
            dispatch(savePatientBookingAppointmentFailed());
            console.error('save patient booking appointment error:', e);
        }
    };
};
export const savePatientBookingAppointmentSuccess = (data) => ({
    type: actionTypes.SAVE_PATIENT_BOOKING_APPOINTMENT_SUCCESS,
    data
});
export const savePatientBookingAppointmentFailed = () => ({
    type: actionTypes.SAVE_PATIENT_BOOKING_APPOINTMENT_FAILED
});

// ================== POST VERIFY BOOK APPOINTMENT ==================
export const postVerifyBookAppointment = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.POST_VERIFY_BOOK_APPOINTMENT_START });
            let res = await postVerifyBookingAppointmentServices(data);
            if (res?.errCode === 0) {
                toast.success(res.errMessage || 'Verify booking success!');
            } else if (res?.errCode === 2) {
                toast.warn(res.errMessage || 'Appointment not found or token invalid');
            } else if (res?.errCode === 3) {
                toast.info(res.errMessage || 'Appointment not pending verification');
            } else {
                toast.error(res?.errMessage || 'Verification failed');
            }
            dispatch({
                type: actionTypes.POST_VERIFY_BOOK_APPOINTMENT_SUCCESS,
                payload: res
            });
        } catch (e) {
            console.error('postVerifyBookAppointment error:', e);
            toast.error('Server error');
            dispatch({
                type: actionTypes.POST_VERIFY_BOOK_APPOINTMENT_FAILED,
                payload: { errCode: -1, errMessage: 'Error from server' }
            });
        }
    };
};
export const postVerifyBookAppointmentSuccess = (payload) => ({
    type: actionTypes.POST_VERIFY_BOOK_APPOINTMENT_SUCCESS,
    payload
});
export const postVerifyBookAppointmentFailed = (payload) => ({
    type: actionTypes.POST_VERIFY_BOOK_APPOINTMENT_FAILED,
    payload
});

// ================== CREATE NEW SPECIALTY ==================
export const createNewSpecialty = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.CREATE_NEW_SPECIALTY_START });
            let res = await createNewSpecialtyServices(data);
            if (res && res.errCode === 0) {
                dispatch(createNewSpecialtySuccess(res));
                toast.success('Create new specialty success!');
            } else {
                dispatch(createNewSpecialtyFailed(res));
                toast.error(res?.errMessage || 'Create new specialty failed!');
            }
        } catch (e) {
            console.error('createNewSpecialty error:', e);
            dispatch(createNewSpecialtyFailed({ errCode: -1, errMessage: 'Error from server' }));
            toast.error('Server error');
        }
    };
};
export const createNewSpecialtySuccess = (payload) => ({
    type: actionTypes.CREATE_NEW_SPECIALTY_SUCCESS,
    payload
});
export const createNewSpecialtyFailed = (payload) => ({
    type: actionTypes.CREATE_NEW_SPECIALTY_FAILED,
    payload
});

// ================== FETCH ALL SPECIALTY ==================
export const fetchAllSpecialty = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_SPECIALTY_START });
            let res = await getAllSpecialtysServices();
            if (res && res.errCode === 0) {
                dispatch(fetchAllSpecialtySuccess(res.data));
            } else {
                dispatch(fetchAllSpecialtyFailed());
            }
        } catch (e) {
            dispatch(fetchAllSpecialtyFailed());
            console.error('fetch all specialty error:', e);
        }
    };
}
export const fetchAllSpecialtySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
    data
});
export const fetchAllSpecialtyFailed = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_FAILED
});

// ================== GET DETAILS SPECIALTY BY ID ==================
export const getDetailsSpecialtyById = (id, location) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.GET_DETAILS_SPECIALTY_BY_ID_START, specialtyId: id, location });
            let res = await getDetailsSpecialtyByIdServices(id, location);
            if (res && res.errCode === 0) {
                dispatch(getDetailsSpecialtyByIdSuccess(res.data, id, location));
            } else {
                dispatch(getDetailsSpecialtyByIdFailed());
            }
        } catch (e) {
            dispatch(getDetailsSpecialtyByIdFailed());
            console.error('get details specialty by id error:', e);
        }
    };
}
export const getDetailsSpecialtyByIdSuccess = (data, id, location) => ({
    type: actionTypes.GET_DETAILS_SPECIALTY_BY_ID_SUCCESS,
    data,
    specialtyId: id,
    location
});
export const getDetailsSpecialtyByIdFailed = () => ({
    type: actionTypes.GET_DETAILS_SPECIALTY_BY_ID_FAILED
});

// ================== CREATE NEW CLINIC ==================
export const createNewClinic = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.CREATE_NEW_CLINIC_START });
            let res = await createNewClinicServices(data);
            if (res && res.errCode === 0) {
                dispatch(createNewClinicSuccess(res));
                toast.success('Create new clinic success!');
            } else {
                dispatch(createNewClinicFailed(res));
                toast.error(res?.errMessage || 'Create new clinic failed!');
            }
        } catch (e) {
            console.error('createNewClinic error:', e);
            dispatch(createNewClinicFailed({ errCode: -1, errMessage: 'Error from server' }));
            toast.error('Server error');
        }
    };
}
export const createNewClinicSuccess = (payload) => ({
    type: actionTypes.CREATE_NEW_CLINIC_SUCCESS,
    payload
});
export const createNewClinicFailed = (payload) => ({
    type: actionTypes.CREATE_NEW_CLINIC_FAILED,
    payload
});

// ================== FETCH ALL CLINIC ==================
export const fetchAllClinics = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_CLINIC_START });
            let res = await getAllClinicServices();
            if (res && res.errCode === 0) {
                dispatch(fetchAllClinicsSuccess(res.data));
            } else {
                dispatch(fetchAllClinicsFailed());
            }
        } catch (e) {
            dispatch(fetchAllClinicsFailed());
            console.error('fetch all clinic error:', e);
        }
    };
}
export const fetchAllClinicsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    data
});
export const fetchAllClinicsFailed = () => ({
    type: actionTypes.FETCH_ALL_CLINIC_FAILED
});

// ================== GET DETAILS CLINIC BY ID ==================
export const getDetailsClinicById = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.GET_DETAILS_CLINIC_BY_ID_START, clinicId: id });
            let res = await getDetailsClinicByIdServices(id);
            if (res && res.errCode === 0) {
                dispatch(getDetailsClinicByIdSuccess(res.data, id));
            } else {
                dispatch(getDetailsClinicByIdFailed());
            }
        } catch (e) {
            dispatch(getDetailsClinicByIdFailed());
            console.error('get details clinic by id error:', e);
        }
    };
}
export const getDetailsClinicByIdSuccess = (data, id) => ({
    type: actionTypes.GET_DETAILS_CLINIC_BY_ID_SUCCESS,
    data,
    clinicId: id
});
export const getDetailsClinicByIdFailed = () => ({
    type: actionTypes.GET_DETAILS_CLINIC_BY_ID_FAILED
});

// ================== FETCH ALL CLINIC REDUX ==================
export const fetchAllClinicRedux = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_CLINIC_REDUX_START });
            let res = await getAllClinicRedux();
            if (res && res.errCode === 0) {
                dispatch(fetchAllClinicReduxSuccess(res.data));
            } else {
                dispatch(fetchAllClinicReduxFailed());
            }
        } catch (e) {
            dispatch(fetchAllClinicReduxFailed());
            console.error('fetch all clinic redux error:', e);
        }
    };
}
export const fetchAllClinicReduxSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CLINIC_REDUX_SUCCESS,
    data
});
export const fetchAllClinicReduxFailed = () => ({
    type: actionTypes.FETCH_ALL_CLINIC_REDUX_FAILED
});