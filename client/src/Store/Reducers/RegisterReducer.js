import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_LOADING_TRUE
} from '../ActionTypes';

const initialState = {
    errors:null,
    loading:false,
    successMessage:null
};

export const RegisterReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        case REGISTER_LOADING_TRUE:
            return {
                ...state,
                loading:true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading:false,
                successMessage: 'SuccessFully Registered with Skills.share'
            };
        case REGISTER_FAIL:
            return {
                ...state,
                loading:false,
                errors:payload,
                successMessage:null
            }
    
        default:
            return state;
    }
}

