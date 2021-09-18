import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT,
    LOAD_USER,
    LOGIN_LOADING_TRUE
} from '../ActionTypes';

import jwt_decode from 'jwt-decode';
import axios from '../../Utility/AxiosConfig';

const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    errors: null,
    loading: false,
};

export const LoginReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        case LOGIN_LOADING_TRUE:
            return {
                ...state,
                loading:true,
        };
        case LOAD_USER:
        return {
                ...state,
                token: payload.token,
                loading:false,
                isAuthenticated:true,
                errors:null,
               ...jwt_decode(payload)
            };
        case LOGIN_SUCCESS:
            localStorage.removeItem('token');
            localStorage.setItem('token', payload.token);
            axios.defaults.headers.common['auth-token'] = localStorage.getItem('token');
        return {
                ...state,
                ...payload,
                loading:false,
                isAuthenticated:true,
                errors:null,
               ...jwt_decode(payload.token)
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loading:false,
                isAuthenticated:false,
                errors:payload,
                token:null,
                user:null
            };
        case LOG_OUT:
            localStorage.removeItem('token');
            return {
                loading:false,
                isAuthenticated:false,
                errors:payload,
                token:null,
                user:null
            }
        default:
            return state;
    }
}

