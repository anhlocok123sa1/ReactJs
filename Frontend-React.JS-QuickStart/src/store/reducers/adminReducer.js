import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    isLoadingRole: false,
    roles: [],
    isLoadingPosition: false,
    positions: [],
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

        default:
            return state;
    }
};

export default adminReducer;
