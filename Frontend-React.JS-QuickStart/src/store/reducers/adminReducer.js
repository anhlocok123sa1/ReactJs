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
    doctorScheduleById: {},
    isLoadingAllRequiredDoctorInfo: false,
    allRequiredDoctorInfo: [],
    isLoadingExtraDoctorInfo: false,
    extraDoctorInfo: [],
    isLoadingPatientBookingAppointment: false,
    patientBookingAppointment: [],
    isLoadingPostVerifyBookAppointment: false,
    verifyBookAppointment: null,
    isCreatingSpecialty: false,
    createSpecialtyResult: null,
    isLoadingAllSpecialty: false,
    allSpecialty: [],
    detailDoctorById: {},
    extraDoctorInfoById: {},
    isLoadingDetailSpecialty: false,
    detailSpecialty: {},
    isCreatingClinic: false,
    createClinicResult: null,
    isLoadingAllClinic: false,
    allClinic: [],
    detailClinic: {},
    isLoadingDetailClinic: false,
    detailClinicById: {},
    isLoadingAllClinicRedux: false,
    allClinicRedux: [],
    isDeletingClinic: false,
    deleteClinicResult: null,
    isEditingClinic: false,
    editClinicResult: null,
    isDeletingSpecialty: false,
    deleteSpecialtyResult: null,
    isEditingSpecialty: false,
    editSpecialtyResult: null,
    isLoadingListPatientForDoctor: false,
    listPatientForDoctor: [],
    isSendingRemedy: false,
    resultRemedy: {}
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // GENDER
        case actionTypes.FETCH_GENDER_START:
            return { ...state, isLoadingGender: true };

        case actionTypes.FETCH_GENDER_SUCCESS:
            return { ...state, isLoadingGender: false, genders: action.data };

        case actionTypes.FETCH_GENDER_FAILED:
            return { ...state, isLoadingGender: false, genders: [] };

        // ROLE
        case actionTypes.FETCH_ROLE_START:
            return { ...state, isLoadingRole: true };

        case actionTypes.FETCH_ROLE_SUCCESS:
            return { ...state, isLoadingRole: false, roles: action.data };

        case actionTypes.FETCH_ROLE_FAILED:
            return { ...state, isLoadingRole: false, roles: [] };

        // POSITION
        case actionTypes.FETCH_POSITION_START:
            return { ...state, isLoadingPosition: true };

        case actionTypes.FETCH_POSITION_SUCCESS:
            return { ...state, isLoadingPosition: false, positions: action.data };

        case actionTypes.FETCH_POSITION_FAILED:
            return { ...state, isLoadingPosition: false, positions: [] };

        // ALL USERS
        case actionTypes.FETCH_ALL_USERS_START:
            return { ...state, isLoadingAllUsers: true };

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            return { ...state, isLoadingAllUsers: false, allUsers: action.data };

        case actionTypes.FETCH_ALL_USERS_FAILED:
            return { ...state, isLoadingAllUsers: false, allUsers: [] };

        // TOP DOCTORS
        case actionTypes.FETCH_TOP_DOCTOR_HOME_START:
            return { ...state, isLoadingTopDoctors: true };

        case actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS:
            return { ...state, isLoadingTopDoctors: false, topDoctors: action.data };

        case actionTypes.FETCH_TOP_DOCTOR_HOME_FAILED:
            return { ...state, isLoadingTopDoctors: false, topDoctors: [] };

        // ALL DOCTORS
        case actionTypes.FETCH_ALL_DOCTORS_START:
            return { ...state, isLoadingAllDoctors: true };

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            return { ...state, isLoadingAllDoctors: false, allDoctors: action.data };

        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            return { ...state, isLoadingAllDoctors: false, allDoctors: [] };

        // DETAIL DOCTOR
        case actionTypes.GET_DETAIL_DOCTOR_START:
            return { ...state, isLoadingDetailDoctor: true };

        case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
            return {
                ...state, isLoadingDetailDoctor: false, detailDoctor: action.data, detailDoctorById: {
                    ...state.detailDoctorById,
                    [action.doctorId]: action.data,
                },
            };

        case actionTypes.GET_DETAIL_DOCTOR_FAILED:
            return { ...state, isLoadingDetailDoctor: false, detailDoctor: {} };

        // ALL CODE SCHEDULE TIME
        case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_START:
            return { ...state, isLoadingAllCodeScheduleTime: true };

        case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS:
            return { ...state, isLoadingAllCodeScheduleTime: false, allCodeScheduleTime: action.data };

        case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED:
            return { ...state, isLoadingAllCodeScheduleTime: false, allCodeScheduleTime: [] };

        // BULK SCHEDULE DOCTOR
        case actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_START:
            return { ...state, isLoadingBulkScheduleDoctor: true };

        case actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_SUCCESS:
            return { ...state, isLoadingBulkScheduleDoctor: false, bulkScheduleDoctor: action.data };

        case actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_FAILED:
            return { ...state, isLoadingBulkScheduleDoctor: false, bulkScheduleDoctor: [] };

        // DOCTOR SCHEDULE
        case actionTypes.FETCH_DOCTOR_SCHEDULE_START:
            return { ...state, isLoadingDoctorSchedule: true };

        case actionTypes.FETCH_DOCTOR_SCHEDULE_SUCCESS:
            return {
                ...state, isLoadingDoctorSchedule: false, doctorSchedule: action.data, doctorScheduleById: {
                    ...state.doctorScheduleById,
                    [action.doctorId]: action.data,
                }
            };

        case actionTypes.FETCH_DOCTOR_SCHEDULE_FAILED:
            return { ...state, isLoadingDoctorSchedule: false, doctorSchedule: [] };

        // REQUIRED DOCTOR INFO
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START:
            return { ...state, isLoadingAllRequiredDoctorInfo: true };

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            return { ...state, isLoadingAllRequiredDoctorInfo: false, allRequiredDoctorInfo: action.data };

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            return { ...state, isLoadingAllRequiredDoctorInfo: false, allRequiredDoctorInfo: [] };

        // EXTRA DOCTOR INFO
        case actionTypes.FETCH_EXTRA_DOCTOR_INFO_START:
            return { ...state, isLoadingExtraDoctorInfo: true };

        case actionTypes.FETCH_EXTRA_DOCTOR_INFO_SUCCESS:
            return {
                ...state, isLoadingExtraDoctorInfo: false, extraDoctorInfo: action.data, extraDoctorInfoById: {
                    ...state.extraDoctorInfoById,
                    [action.doctorId]: action.data,
                },
            };

        case actionTypes.FETCH_EXTRA_DOCTOR_INFO_FAILED:
            return { ...state, isLoadingExtraDoctorInfo: false, extraDoctorInfo: [] };

        // PATIENT BOOKING
        case actionTypes.SAVE_PATIENT_BOOKING_APPOINTMENT_START:
            return { ...state, isLoadingPatientBookingAppointment: true };

        case actionTypes.SAVE_PATIENT_BOOKING_APPOINTMENT_SUCCESS:
            return { ...state, isLoadingPatientBookingAppointment: false, patientBookingAppointment: action.data };

        case actionTypes.SAVE_PATIENT_BOOKING_APPOINTMENT_FAILED:
            return { ...state, isLoadingPatientBookingAppointment: false, patientBookingAppointment: [] };

        // VERIFY BOOKING
        case actionTypes.POST_VERIFY_BOOK_APPOINTMENT_START:
            return { ...state, isLoadingPostVerifyBookAppointment: true, verifyBookAppointment: null };

        case actionTypes.POST_VERIFY_BOOK_APPOINTMENT_SUCCESS:
            return { ...state, isLoadingPostVerifyBookAppointment: false, verifyBookAppointment: action.payload };

        case actionTypes.POST_VERIFY_BOOK_APPOINTMENT_FAILED:
            return {
                ...state,
                isLoadingPostVerifyBookAppointment: false,
                verifyBookAppointment: action.payload || { errCode: -1, errMessage: 'Error from server' }
            };

        // CREATE SPECIALTY
        case actionTypes.CREATE_NEW_SPECIALTY_START:
            return { ...state, isCreatingSpecialty: true, createSpecialtyResult: null };

        case actionTypes.CREATE_NEW_SPECIALTY_SUCCESS:
            return { ...state, isCreatingSpecialty: false, createSpecialtyResult: action.data };

        case actionTypes.CREATE_NEW_SPECIALTY_FAILED:
            return {
                ...state,
                isCreatingSpecialty: false,
                createSpecialtyResult: action.data || { errCode: -1, errMessage: 'Error' }
            };
        // FETCH ALL SPECIALTY
        case actionTypes.FETCH_ALL_SPECIALTY_START:
            return { ...state, isLoadingAllSpecialty: true, allSpecialty: [] };
        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            return { ...state, isLoadingAllSpecialty: false, allSpecialty: action.data };
        case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
            return { ...state, isLoadingAllSpecialty: false, allSpecialty: [] };
        // GET DETAILS SPECIALTY BY ID
        case actionTypes.GET_DETAILS_SPECIALTY_BY_ID_START:
            return { ...state, isLoadingDetailSpecialty: true, detailSpecialty: {} };
        case actionTypes.GET_DETAILS_SPECIALTY_BY_ID_SUCCESS:
            return {
                ...state,
                isLoadingDetailSpecialty: false,
                detailSpecialty: action.data,
            };
        case actionTypes.GET_DETAILS_SPECIALTY_BY_ID_FAILED:
            return { ...state, isLoadingDetailSpecialty: false, detailSpecialty: {} };
        // CREATE CLINIC
        case actionTypes.CREATE_NEW_CLINIC_START:
            return { ...state, isCreatingClinic: true, createClinicResult: null };
        case actionTypes.CREATE_NEW_CLINIC_SUCCESS:
            return { ...state, isCreatingClinic: false, createClinicResult: action.data };
        case actionTypes.CREATE_NEW_CLINIC_FAILED:
            return {
                ...state,
                isCreatingClinic: false,
                createClinicResult: action.data || { errCode: -1, errMessage: 'Error' }
            };
        // FETCH ALL CLINIC
        case actionTypes.FETCH_ALL_CLINIC_START:
            return { ...state, isLoadingAllClinic: true, allClinic: [] };
        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            return { ...state, isLoadingAllClinic: false, allClinic: action.data };
        case actionTypes.FETCH_ALL_CLINIC_FAILED:
            return { ...state, isLoadingAllClinic: false, allClinic: [] };
        // GET DETAILS CLINIC BY ID
        case actionTypes.GET_DETAILS_CLINIC_BY_ID_START:
            return { ...state, isLoadingDetailClinic: true, detailClinic: {} };
        case actionTypes.GET_DETAILS_CLINIC_BY_ID_SUCCESS:
            return {
                ...state,
                isLoadingDetailClinic: false,
                detailClinic: action.data,
                detailClinicById: {
                    ...state.detailClinicById,
                    [action.clinicId]: action.data,
                },
            };
        case actionTypes.GET_DETAILS_CLINIC_BY_ID_FAILED:
            return { ...state, isLoadingDetailClinic: false, detailClinic: {} };
        // FETCH ALL CLINIC REDUX
        case actionTypes.FETCH_ALL_CLINIC_REDUX_START:
            return { ...state, isLoadingAllClinicRedux: true, allClinicRedux: [] };
        case actionTypes.FETCH_ALL_CLINIC_REDUX_SUCCESS:
            return { ...state, isLoadingAllClinicRedux: false, allClinicRedux: action.data };
        case actionTypes.FETCH_ALL_CLINIC_REDUX_FAILED:
            return { ...state, isLoadingAllClinicRedux: false, allClinicRedux: [] };
        // DELETE CLINIC REDUX
        case actionTypes.DELETE_CLINIC_REDUX_START:
            return { ...state, isDeletingClinic: true, deleteClinicResult: null };
        case actionTypes.DELETE_CLINIC_REDUX_SUCCESS:
            return { ...state, isDeletingClinic: false, deleteClinicResult: action.data };
        case actionTypes.DELETE_CLINIC_REDUX_FAILED:
            return {
                ...state,
                isDeletingClinic: false,
                deleteClinicResult: action.data || { errCode: -1, errMessage: 'Error' }
            };
        // EDIT CLINIC REDUX
        case actionTypes.EDIT_CLINIC_REDUX_START:
            return { ...state, isEditingClinic: true, editClinicResult: null };
        case actionTypes.EDIT_CLINIC_REDUX_SUCCESS:
            return { ...state, isEditingClinic: false, editClinicResult: action.data };
        case actionTypes.EDIT_CLINIC_REDUX_FAILED:
            return {
                ...state,
                isEditingClinic: false,
                editClinicResult: action.data || { errCode: -1, errMessage: 'Error' }
            };
        // DELETE SPECIALTY REDUX
        case actionTypes.DELETE_SPECIALTY_REDUX_START:
            return { ...state, isDeletingSpecialty: true, deleteSpecialtyResult: null };
        case actionTypes.DELETE_SPECIALTY_REDUX_SUCCESS:
            return { ...state, isDeletingSpecialty: false, deleteSpecialtyResult: action.data };
        case actionTypes.DELETE_SPECIALTY_REDUX_FAILED:
            return {
                ...state,
                isDeletingSpecialty: false,
                deleteSpecialtyResult: action.data || { errCode: -1, errMessage: 'Error' }
            };
        // EDIT SPECIALTY REDUX
        case actionTypes.EDIT_SPECIALTY_REDUX_START:
            return { ...state, isEditingSpecialty: true, editSpecialtyResult: null };
        case actionTypes.EDIT_SPECIALTY_REDUX_SUCCESS:
            return { ...state, isEditingSpecialty: false, editSpecialtyResult: action.data };
        case actionTypes.EDIT_SPECIALTY_REDUX_FAILED:
            return {
                ...state,
                isEditingSpecialty: false,
                editSpecialtyResult: action.data || { errCode: -1, errMessage: 'Error' }
            };
        //LIST PATIENT FOR DOCTOR
        case actionTypes.GET_LIST_PATIENT_FOR_DOCTOR_START:
            return { ...state, isLoadingListPatientForDoctor: true, listPatientForDoctor: [] };
        case actionTypes.GET_LIST_PATIENT_FOR_DOCTOR_SUCCESS:
            return { ...state, isLoadingListPatientForDoctor: false, listPatientForDoctor: action.data };
        case actionTypes.GET_LIST_PATIENT_FOR_DOCTOR_FAILED:
            return {
                ...state,
                isLoadingListPatientForDoctor: false,
                listPatientForDoctor: action.data || { errCode: -1, errMessage: 'Error' }
            };
        //SEND REMEDY
        case actionTypes.SEND_REMEDY_START:
            return { ...state, isSendingRemedy: true };
        case actionTypes.SEND_REMEDY_SUCCESS:

            return { ...state, isSendingRemedy: false, resultRemedy: action.data };
        case actionTypes.SEND_REMEDY_FAILED:
            return {
                ...state,
                isSendingRemedy: false,
                resultRemedy: action.data || { errCode: -1, errMessage: 'Error' }
            };

        default:
            return state;
    }
};

export default adminReducer;
