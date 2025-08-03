import actionTypes from './actionTypes';
import { getAllCodeServices, createNewUserServices, getAllUsers, deleteUserServices, editUserServices, getTopDoctorHomeServices, getAllDoctorsServices, saveInfoDoctorServices, getDetailsDoctorServices, bulkCreateScheduleServices, getDoctorScheduleServices } from '../../services/userService';
import { toast } from 'react-toastify';

// GENDER
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
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
            console.log('fetch gender start error: ', e);
        }
    };
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
});

// ROLE
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
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
            console.log('fetch role start error: ', e);
        }
    };
};

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
});

// POSITION
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
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
            console.log('fetch position start error: ', e);
        }
    };
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
});

//CREATE NEW USER
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserServices(data)
            // console.log('Check response create user redux image: ', res);

            if (res && res.errCode === 0) {
                dispatch(createUserSuccess());
                dispatch(fetchAllUsersStart());
                // toast.success("Create a new user success!")
            } else {
                toast.error("Create a new user error!")
                dispatch(createUserFailed());
            }
        } catch (e) {
            dispatch(createUserFailed());
            console.log('create user failed: ', e);
        }
    };
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})

//ALL USER
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
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
            console.log('fetch all User start error: ', e);
        }
    };
};

export const fetchAllUsersSuccess = (allUserData) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: allUserData
});

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
});

//DELETE USER
export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserServices(id)
            console.log('Check response delete user redux: ', res);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success("Delete user success!")
            } else {
                toast.error("Delete user failed!")
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log('delete user failed: ', e);
        }
    };
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

//EDIT USER
export const editUser = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserServices(id)
            console.log('Check response edit user redux: ', res);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success("Edit user success!")
            } else {
                toast.error("Edit user failed!")
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.log('edit user failed: ', e);
        }
    };
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})

//FETCH TOP DOCTOR HOME
export const fetchTopDoctorHome = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_HOME_START });
            let res = await getTopDoctorHomeServices(10);
            // console.log('Check response fetch top doctor home: ', res);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorHomeSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorHomeFailed());
            }
        } catch (e) {
            dispatch(fetchTopDoctorHomeFailed());
            console.log('fetch top doctor home error: ', e);
        }
    };
}

export const fetchTopDoctorHomeSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS,
    data: data
});

export const fetchTopDoctorHomeFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_HOME_FAILED
});

//FETCH ALL DOCTOR
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
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
            console.log('fetch all doctor error: ', e);
        }
    };
}
export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    data: data
});
export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
});

//SAVE INFO DOCTOR
export const saveInfoDoctorAction = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.SAVE_INFO_DOCTOR_START });
            let res = await saveInfoDoctorServices(data);
            if (res && res.errCode === 0) {
                dispatch(saveInfoDoctorSuccess());
                toast.success("Save info doctor success!");
            } else {
                console.log('error save info doctor', res);

                dispatch(saveInfoDoctorFailed());
                toast.error("Save info doctor failed!");
            }
        } catch (e) {
            dispatch(saveInfoDoctorFailed());
            console.log('save info doctor error: ', e);
        }
    };
}
export const saveInfoDoctorSuccess = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
});
export const saveInfoDoctorFailed = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
});

//GET DETAIL DOCTOR
export const getDetailDoctorAction = (inputId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DETAIL_DOCTOR_START });
            let res = await getDetailsDoctorServices(inputId);

            if (res && res.errCode === 0) {
                dispatch(getDetailDoctorSuccess(res.data));
            } else {
                dispatch(getDetailDoctorFailed());
            }
        } catch (e) {
            dispatch(getDetailDoctorFailed());
            console.log('get detail doctor error: ', e);
        }
    };
}

export const getDetailDoctorSuccess = (data) => ({
    type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
    data: data
});

export const getDetailDoctorFailed = () => ({
    type: actionTypes.GET_DETAIL_DOCTOR_FAILED
});

//GET ALL CODE SCHEDULE TIME
export const fetchAllCodeScheduleTime = () => {
    return async (dispatch, getState) => {
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
            console.log('fetch all code schedule time error: ', e);
        }
    };
}
export const fetchAllCodeScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS,
    data: data
});
export const fetchAllCodeScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED
});

//SAVE BULK SCHEDULE DOCTOR
export const saveBulkScheduleDoctor = (data) => {
    return async (dispatch, getState) => {
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
            return res.data;
        } catch (e) {
            dispatch(saveBulkScheduleDoctorFailed());
            console.log('save bulk schedule doctor error: ', e);
        }
    };
}
export const saveBulkScheduleDoctorSuccess = () => ({
    type: actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_SUCCESS,
});
export const saveBulkScheduleDoctorFailed = () => ({
    type: actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_FAILED,
});

//FETCH DOCTOR SCHEDULE
export const getDoctorSchedule = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_DOCTOR_SCHEDULE_START });
            let res = await getDoctorScheduleServices(data.doctorId, data.date);
            // console.log("Check response from action: ", res);
            if (res && res.errCode === 0) {
                dispatch(getDoctorScheduleSuccess(res));
                // toast.success("Save bulk schedule doctor success!");
            } else {
                dispatch(getDoctorScheduleFailed());
                // toast.error("Save bulk schedule doctor failed!");
            }
        } catch (e) {
            dispatch(getDoctorScheduleFailed());
            console.log('save bulk schedule doctor error: ', e);
        }
    };
}
export const getDoctorScheduleSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_SCHEDULE_SUCCESS,
    data: data
});
export const getDoctorScheduleFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_SCHEDULE_FAILED,
});