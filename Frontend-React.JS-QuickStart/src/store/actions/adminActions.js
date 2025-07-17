import actionTypes from './actionTypes';
import { getAllCodeServices, createNewUserServices, getAllUsers, deleteUserServices } from '../../services/userService';
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
            console.log('Check response create user redux: ', res);

            if (res && res.errCode === 0) {
                dispatch(createUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success("Create a new user success!")
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