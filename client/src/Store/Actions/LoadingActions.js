import { 
    REGISTER_LOADING_TRUE,
    LOGIN_LOADING_TRUE
 } from '../ActionTypes';

export const RegisterLoadingTrue = () => ({
    type: REGISTER_LOADING_TRUE,
    payload: true
});

export const LoginLoadingTrue = () => ({
    type: LOGIN_LOADING_TRUE,
    payload: true
});

