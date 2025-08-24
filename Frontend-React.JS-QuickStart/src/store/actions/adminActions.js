import actionTypes from './actionTypes';
import { getAllCodeServices, getAllSpecialtysServices, getAllClinicServices } from '../../services/userService';

// ============== GENDER ==============
export const fetchGenderStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      const res = await getAllCodeServices('GENDER');
      if (res && res.errCode === 0) dispatch(fetchGenderSuccess(res.data));
      else dispatch(fetchGenderFailed());
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.error('fetch gender start error:', e);
    }
  };
};
export const fetchGenderSuccess = (data) => ({ type: actionTypes.FETCH_GENDER_SUCCESS, data });
export const fetchGenderFailed = () => ({ type: actionTypes.FETCH_GENDER_FAILED });

// ============== ROLE ==============
export const fetchRoleStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });
      const res = await getAllCodeServices('ROLE');
      if (res && res.errCode === 0) dispatch(fetchRoleSuccess(res.data));
      else dispatch(fetchRoleFailed());
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.error('fetch role error:', e);
    }
  };
};
export const fetchRoleSuccess = (data) => ({ type: actionTypes.FETCH_ROLE_SUCCESS, data });
export const fetchRoleFailed = () => ({ type: actionTypes.FETCH_ROLE_FAILED });

// ============== POSITION ==============
export const fetchPositionStart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });
      const res = await getAllCodeServices('POSITION');
      if (res && res.errCode === 0) dispatch(fetchPositionSuccess(res.data));
      else dispatch(fetchPositionFailed());
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.error('fetch position error:', e);
    }
  };
};
export const fetchPositionSuccess = (data) => ({ type: actionTypes.FETCH_POSITION_SUCCESS, data });
export const fetchPositionFailed = () => ({ type: actionTypes.FETCH_POSITION_FAILED });

// ============== REQUIRED DOCTOR INFO ==============
export const getRequiredDoctorInfo = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START });
      const resPrice = await getAllCodeServices('PRICE');
      const resPayment = await getAllCodeServices('PAYMENT');
      const resProvince = await getAllCodeServices('PROVINCE');
      const resSpecialty = await getAllSpecialtysServices();
      const resClinic = await getAllClinicServices();

      if (
        resPrice?.errCode === 0 &&
        resPayment?.errCode === 0 &&
        resProvince?.errCode === 0 &&
        resSpecialty?.errCode === 0 &&
        resClinic?.errCode === 0
      ) {
        dispatch(
          getRequiredDoctorInfoSuccess({
            resPrice: resPrice.data,
            resPayment: resPayment.data,
            resProvince: resProvince.data,
            resSpecialty: resSpecialty.data,
            resClinic: resClinic.data,
          })
        );
      } else dispatch(getRequiredDoctorInfoFailed());
    } catch (e) {
      dispatch(getRequiredDoctorInfoFailed());
      console.error('get required doctor info error:', e);
    }
  };
};
export const getRequiredDoctorInfoSuccess = (data) => ({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS, data });
export const getRequiredDoctorInfoFailed = () => ({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED });
