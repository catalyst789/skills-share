import { 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT,
    LOAD_USER,
 } from '../ActionTypes';

 import axios from '../../Utility/AxiosConfig';

export const LoginUser = (authUser, history) => dispatch => {
     axios.post('/signin', authUser)
        .then( success => {
            history.push('/timeline')
            // console.log(success.data);
            return dispatch(LoginSuccess(success.data));
        })
        .catch( fail => {
            return dispatch(LoginFail(fail.response.data));
        });
};

export const EditUserDetails = (authUser) => dispatch => {
    axios.post('/editprofile', authUser)
       .then( success => {
           console.log(success.data);
           return dispatch(LoginSuccess(success.data));
       })
       .catch( fail => {
           return dispatch(LoginFail(fail.response.data));
       });
};

export const ForgotPasswordAction = (email, history) => dispatch => {
    axios.post('/forgotpassword', {email})
       .then( success => {
           history.push('/signin');
           console.log(success.data);
        //    return dispatch(LogOut());
       })
       .catch( fail => {
           console.log(fail.response.data);
           return dispatch(LoginFail(fail.response.data));
       });
};


export const DeleteAccountAction = (history) => dispatch => {
     axios.post('/deleteaccount')
        .then( success => {
            history.push('/');
            console.log(success.data);
            return dispatch(LogOut());
        })
        .catch( fail => {
            console.log(fail.response.data);
            return dispatch(LoginFail(fail.response.data));
        });
};

export const UploadImageAction = (updatedImage) => dispatch => {
    axios.post('/uploadprofilepic', updatedImage)
       .then( success => {
           console.log(success.data);
           return dispatch(LoginSuccess(success.data));
       })
       .catch( fail => {
           console.log(fail.response.data);
           return dispatch(LoginFail(fail.response.data));
       });
};

export const LoginSuccess = (auth) => dispatch => {
    return dispatch({
        type: LOGIN_SUCCESS,
        payload:auth
    });
};

export const LoadUser = (user) => ({
    type: LOAD_USER,
    payload:user
});

export const LoginFail = (errors) => ({
    type: LOGIN_FAIL,
    payload: errorResolve(errors)
});

export const LogOut = () => ({
    type: LOG_OUT,
});


const errorResolve = (errors) => {
    let errorsEntities;
    if(Array.isArray(errors)) errorsEntities = errors.reduce(
        (errors, error) => ({...errors, [error.param]:error }), {});
        else errorsEntities = errors;
    return errorsEntities;
}