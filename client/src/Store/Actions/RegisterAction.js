import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
 } from '../ActionTypes';

 import axios from '../../Utility/AxiosConfig';

export const RegisterUser = (newUser) => dispatch => {
    // LoadingTrue();
     axios.post('/signup', newUser)
        .then( success => {
            return dispatch(SuccessRegister());
        })
        .catch( fail => {
            return dispatch(FailRegister(fail.response.data));
        });
};

export const SuccessRegister = () => ({
    type: REGISTER_SUCCESS,
});

export const FailRegister = (errors) => ({
    type: REGISTER_FAIL,
    payload: errorResolve(errors)
});



const errorResolve = (errors) => {
    let errorsEntities;
    if(Array.isArray(errors)) errorsEntities = errors.reduce(
        (errors, error) => ({...errors, [error.param]:error }), {});
        else errorsEntities = errors;
    return errorsEntities;
}