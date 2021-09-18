import {
    POST_SUCCESS,
    POST_FAILURE,
    MAKE_NEW_POST_SUCCESS,
    MAKE_NEW_POST_FAILURE,
    LOG_OUT,
    LIKE_POST,
    DISLIKE_POST,
    DELETE_POST
} from '../ActionTypes';

const initialState = {
    errors:null,
    loading:false,
    posts:null
};

export const AuthReducers = (state=initialState, {type, payload}) => {
    switch (type) {
        // case LOADING_TRUE:
        //     return {
        //         ...state,
        //         loading:true,
        //     };
        case POST_SUCCESS:
            return {
                ...state,
                loading:false,
                errors:null,
                ...payload
            };
        case POST_FAILURE:
            return {
                ...state,
                loading:false,
                errors:payload,
                posts:null
            };
        case MAKE_NEW_POST_SUCCESS:
        case LIKE_POST:
        case DISLIKE_POST:
        case DELETE_POST:
            return {
                ...state,
                loading:false,
                errors:null,
                ...payload
            };
        case MAKE_NEW_POST_FAILURE:
            return {
                ...state,
                loading:false,
                errors:payload,
            };
        case LOG_OUT:
            localStorage.removeItem('token');
            return {
                loading:false,
                errors:null,
                posts:null,
            }
    
        default:
            return state;
    }
}


