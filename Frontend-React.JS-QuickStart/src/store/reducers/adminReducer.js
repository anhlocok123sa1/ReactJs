import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    isLoadingRole: false,
    roles: [],
    isLoadingPosition: false,
    positions: [],
    isLoadingAllUsers: false,
    allUsers:[],
    isLoadingTopDoctors: false,
    topDoctors: [],
    isLoadingAllDoctors: false,
    allDoctors:[],
    
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // GENDER
        case actionTypes.FETCH_GENDER_START: {
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            // console.log('fetch gender start: ', action);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_GENDER_SUCCESS: {
            let copyState = { ...state };
            copyState.genders = action.data;
            copyState.isLoadingGender = false;
            // console.log('fetch gender success: ', copyState);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_GENDER_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingGender = false;
            copyState.genders = [];
            // console.log('fetch gender failed: ', copyState);
            return {
                ...copyState,
            };
        }

        // ROLE
        case actionTypes.FETCH_ROLE_START: {
            let copyState = { ...state };
            copyState.isLoadingRole = true;
            // console.log('fetch role start: ', action);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_ROLE_SUCCESS: {
            let copyState = { ...state };
            copyState.roles = action.data;
            copyState.isLoadingRole = false;
            // console.log('fetch role success: ', copyState);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_ROLE_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingRole = false;
            copyState.roles = [];
            // console.log('fetch role failed: ', copyState);
            return {
                ...copyState,
            };
        }

        // POSITION
        case actionTypes.FETCH_POSITION_START: {
            let copyState = { ...state };
            copyState.isLoadingPosition = true;
            // console.log('fetch position start: ', action);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_POSITION_SUCCESS: {
            let copyState = { ...state };
            copyState.positions = action.data;
            copyState.isLoadingPosition = false;
            // console.log('fetch position success: ', copyState);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_POSITION_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingPosition = false;
            copyState.positions = [];
            // console.log('fetch position failed: ', copyState);
            return {
                ...copyState,
            };
        }

        //ALL USERS
        case actionTypes.FETCH_ALL_USERS_START: {
            let copyState = { ...state };
            copyState.isLoadingAllUsers = true;
            // console.log('fetch all users start: ', action);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_ALL_USERS_SUCCESS: {
            let copyState = { ...state };
            copyState.allUsers = action.data;
            copyState.isLoadingAllUsers = false;
            // console.log('fetch all users success: ', copyState);
            return {
                ...copyState,
            };
        }

        case actionTypes.FETCH_ALL_USERS_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingAllUsers = false;
            copyState.allUsers = [];
            // console.log('fetch all users failed: ', copyState);
            return {
                ...copyState,
            };
        }
        
        //TOP DOCTOR
        case actionTypes.FETCH_TOP_DOCTOR_HOME_START: {
            let copyState = { ...state };
            copyState.isLoadingTopDoctors = true;
            // console.log('fetch top doctor start: ', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS: {
            let copyState = { ...state };
            copyState.topDoctors = action.data;
            copyState.isLoadingTopDoctors = false;
            // console.log('fetch top doctor success: ', copyState);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_TOP_DOCTOR_HOME_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingTopDoctors = false;
            copyState.topDoctors = [];
            // console.log('fetch top doctor failed: ', copyState);
            return {
                ...copyState,
            };
        }
        //ALL DOCTOR
        case actionTypes.FETCH_ALL_DOCTORS_START: {
            let copyState = { ...state };
            copyState.isLoadingAllDoctors = true;
            // console.log('fetch all doctor start: ', action);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS: {
            let copyState = { ...state };
            copyState.allDoctors = action.data;
            copyState.isLoadingAllDoctors = false;
            // console.log('fetch all doctor success: ', copyState);
            return {
                ...copyState,
            };
        }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED: {
            let copyState = { ...state };
            copyState.isLoadingAllDoctors = false;
            copyState.allDoctors = [];
            // console.log('fetch all doctor failed: ', copyState);
            return {
                ...copyState,
            };
        }

        default:
            return state;
    }
};

export default adminReducer;
