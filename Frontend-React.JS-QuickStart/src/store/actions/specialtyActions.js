import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import {
  createNewSpecialtyServices,
  getAllSpecialtysServices,
  getDetailsSpecialtyByIdServices,
  deleteSpecialtyRedux,
  editSpecialtyRedux,
} from '../../services/userService';

// ============== CREATE NEW SPECIALTY ==============
export const createNewSpecialty = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.CREATE_NEW_SPECIALTY_START });
      const res = await createNewSpecialtyServices(data);
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
export const createNewSpecialtySuccess = (payload) => ({ type: actionTypes.CREATE_NEW_SPECIALTY_SUCCESS, payload });
export const createNewSpecialtyFailed = (payload) => ({ type: actionTypes.CREATE_NEW_SPECIALTY_FAILED, payload });

// ============== FETCH ALL SPECIALTY ==============
export const fetchAllSpecialty = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_SPECIALTY_START });
      const res = await getAllSpecialtysServices();
      if (res && res.errCode === 0) dispatch(fetchAllSpecialtySuccess(res.data));
      else dispatch(fetchAllSpecialtyFailed());
    } catch (e) {
      dispatch(fetchAllSpecialtyFailed());
      console.error('fetch all specialty error:', e);
    }
  };
};
export const fetchAllSpecialtySuccess = (data) => ({ type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS, data });
export const fetchAllSpecialtyFailed = () => ({ type: actionTypes.FETCH_ALL_SPECIALTY_FAILED });

// ============== GET DETAILS SPECIALTY BY ID ==============
export const getDetailsSpecialtyById = (id, location) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.GET_DETAILS_SPECIALTY_BY_ID_START, specialtyId: id, location });
      const res = await getDetailsSpecialtyByIdServices(id, location);
      if (res && res.errCode === 0) dispatch(getDetailsSpecialtyByIdSuccess(res.data, id, location));
      else dispatch(getDetailsSpecialtyByIdFailed());
    } catch (e) {
      dispatch(getDetailsSpecialtyByIdFailed());
      console.error('get details specialty by id error:', e);
    }
  };
};
export const getDetailsSpecialtyByIdSuccess = (data, id, location) => ({ type: actionTypes.GET_DETAILS_SPECIALTY_BY_ID_SUCCESS, data, specialtyId: id, location });
export const getDetailsSpecialtyByIdFailed = () => ({ type: actionTypes.GET_DETAILS_SPECIALTY_BY_ID_FAILED });

// ============== DELETE SPECIALTY REDUX ==============
export const deleteSpecialty = (specialtyId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.DELETE_SPECIALTY_REDUX_START });
      const res = await deleteSpecialtyRedux(specialtyId);
      if (res && res.errCode === 0) {
        dispatch(deleteSpecialtyReduxSuccess());
        dispatch(fetchAllSpecialty());
        toast.success('Delete specialty success!');
      } else {
        dispatch(deleteSpecialtyReduxFailed());
        toast.error(res?.errMessage || 'Delete specialty failed!');
      }
    } catch (e) {
      dispatch(deleteSpecialtyReduxFailed());
      console.error('delete specialty redux error:', e);
      toast.error('Server error');
    }
  };
};
export const deleteSpecialtyReduxSuccess = () => ({ type: actionTypes.DELETE_SPECIALTY_REDUX_SUCCESS });
export const deleteSpecialtyReduxFailed = () => ({ type: actionTypes.DELETE_SPECIALTY_REDUX_FAILED });

// ============== EDIT SPECIALTY REDUX ==============
export const editSpecialty = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.EDIT_SPECIALTY_REDUX_START });
      const res = await editSpecialtyRedux(data);
      if (res && res.errCode === 0) {
        dispatch(editSpecialtyReduxSuccess());
        dispatch(fetchAllSpecialty());
        toast.success('Edit specialty success!');
      } else {
        dispatch(editSpecialtyReduxFailed());
        toast.error(res?.errMessage || 'Edit specialty failed!');
      }
    } catch (e) {
      dispatch(editSpecialtyReduxFailed());
      console.error('edit specialty redux error:', e);
      toast.error('Server error');
    }
  };
};
export const editSpecialtyReduxSuccess = () => ({ type: actionTypes.EDIT_SPECIALTY_REDUX_SUCCESS });
export const editSpecialtyReduxFailed = () => ({ type: actionTypes.EDIT_SPECIALTY_REDUX_FAILED });