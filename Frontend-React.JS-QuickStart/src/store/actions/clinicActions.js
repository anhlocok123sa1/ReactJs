import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import {
  createNewClinicServices,
  getAllClinicServices,
  getDetailsClinicByIdServices,
  getAllClinicRedux,
  deleteClinicRedux,
  editClinicRedux,
} from '../../services/userService';

// ============== CREATE NEW CLINIC ==============
export const createNewClinic = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.CREATE_NEW_CLINIC_START });
      const res = await createNewClinicServices(data);
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
};
export const createNewClinicSuccess = (payload) => ({ type: actionTypes.CREATE_NEW_CLINIC_SUCCESS, payload });
export const createNewClinicFailed = (payload) => ({ type: actionTypes.CREATE_NEW_CLINIC_FAILED, payload });

// ============== FETCH ALL CLINIC ==============
export const fetchAllClinics = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_CLINIC_START });
      const res = await getAllClinicServices();
      if (res && res.errCode === 0) dispatch(fetchAllClinicsSuccess(res.data));
      else dispatch(fetchAllClinicsFailed());
    } catch (e) {
      dispatch(fetchAllClinicsFailed());
      console.error('fetch all clinic error:', e);
    }
  };
};
export const fetchAllClinicsSuccess = (data) => ({ type: actionTypes.FETCH_ALL_CLINIC_SUCCESS, data });
export const fetchAllClinicsFailed = () => ({ type: actionTypes.FETCH_ALL_CLINIC_FAILED });

// ============== GET DETAILS CLINIC BY ID ==============
export const getDetailsClinicById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.GET_DETAILS_CLINIC_BY_ID_START, clinicId: id });
      const res = await getDetailsClinicByIdServices(id);
      if (res && res.errCode === 0) dispatch(getDetailsClinicByIdSuccess(res.data, id));
      else dispatch(getDetailsClinicByIdFailed());
    } catch (e) {
      dispatch(getDetailsClinicByIdFailed());
      console.error('get details clinic by id error:', e);
    }
  };
};
export const getDetailsClinicByIdSuccess = (data, id) => ({ type: actionTypes.GET_DETAILS_CLINIC_BY_ID_SUCCESS, data, clinicId: id });
export const getDetailsClinicByIdFailed = () => ({ type: actionTypes.GET_DETAILS_CLINIC_BY_ID_FAILED });

// ============== FETCH ALL CLINIC (Redux usage) ==============
export const fetchAllClinicRedux = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_CLINIC_REDUX_START });
      const res = await getAllClinicRedux();
      if (res && res.errCode === 0) dispatch(fetchAllClinicReduxSuccess(res.data));
      else dispatch(fetchAllClinicReduxFailed());
    } catch (e) {
      dispatch(fetchAllClinicReduxFailed());
      console.error('fetch all clinic redux error:', e);
    }
  };
};
export const fetchAllClinicReduxSuccess = (data) => ({ type: actionTypes.FETCH_ALL_CLINIC_REDUX_SUCCESS, data });
export const fetchAllClinicReduxFailed = () => ({ type: actionTypes.FETCH_ALL_CLINIC_REDUX_FAILED });

// ============== DELETE CLINIC (Redux usage) ==============
export const deleteClinic = (clinicId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.DELETE_CLINIC_REDUX_START });
      const res = await deleteClinicRedux(clinicId);
      if (res && res.errCode === 0) {
        dispatch(deleteClinicReduxSuccess());
        dispatch(fetchAllClinicRedux());
        toast.success('Delete clinic success!');
      } else {
        dispatch(deleteClinicReduxFailed());
        toast.error(res?.errMessage || 'Delete clinic failed!');
      }
    } catch (e) {
      dispatch(deleteClinicReduxFailed());
      console.error('delete clinic redux error:', e);
      toast.error('Server error');
    }
  };
};
export const deleteClinicReduxSuccess = () => ({ type: actionTypes.DELETE_CLINIC_REDUX_SUCCESS });
export const deleteClinicReduxFailed = () => ({ type: actionTypes.DELETE_CLINIC_REDUX_FAILED });

// ============== EDIT CLINIC (Redux usage) ==============
export const editClinic = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.EDIT_CLINIC_REDUX_START });
      const res = await editClinicRedux(data);
      if (res && res.errCode === 0) {
        dispatch(editClinicReduxSuccess());
        dispatch(fetchAllClinicRedux());
        toast.success('Edit clinic success!');
      } else {
        dispatch(editClinicReduxFailed());
        toast.error(res?.errMessage || 'Edit clinic failed!');
      }
    } catch (e) {
      dispatch(editClinicReduxFailed());
      console.error('edit clinic redux error:', e);
      toast.error('Server error');
    }
  };
}
export const editClinicReduxSuccess = () => ({ type: actionTypes.EDIT_CLINIC_REDUX_SUCCESS });
export const editClinicReduxFailed = () => ({ type: actionTypes.EDIT_CLINIC_REDUX_FAILED });