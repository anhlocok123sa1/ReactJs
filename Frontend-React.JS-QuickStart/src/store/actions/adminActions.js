import actionTypes from './actionTypes';
import { getAllCodeServices } from '../../services/userService';

export const fetchGenderStart = () => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch, getState) => {
        try {
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
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
