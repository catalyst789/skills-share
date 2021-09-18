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

 import axios from '../../Utility/AxiosConfig';

export const TimelineAction = () => dispatch => {
    // LoadingTrue();
     axios.get('/posts/timeline/')
        .then( success => {
            return dispatch(PostSuccess(success.data));
        })
        .catch( fail => {
            console.log(fail.response.data);
            return dispatch(PostSuccess(fail.response.data));
        });
};

export const ProfileAction = () => dispatch => {
    // LoadingTrue();
     axios.get('/posts/profile')
        .then( success => {
            // console.log(success)
            return dispatch(PostSuccess(success.data));
        })
        .catch( fail => {
            // console.log(fail.response.data);
            return dispatch(PostSuccess(fail.response.data));
        });
};

export const ChangePassword = (password, history) => dispatch => {
    // LoadingTrue();
     axios.post('/changepassword', password)
        .then( success => {
            history.push('/signin');
            console.log(success.data)
            return dispatch(LogOut());
        })
        .catch( fail => {
            console.log(fail.response.data);
            return dispatch(PostSuccess(fail.response.data));
        });
};
 

export const LikePostAction = (postid) => dispatch => {
     axios.post('/posts/like/' + postid)
        .then( success => {
            console.log(success.data);
            return dispatch(LikePostSuccess(success.data));
        })
        .catch( fail => {
            console.log(fail.response.data);
            return dispatch(PostSuccess(fail.response.data));
        });
};

export const LikePostSuccess = (data) => ({
    type: LIKE_POST,
    payload:data
});


export const DislikePostAction = (postid) => dispatch => {
    axios.post('/posts/dislike/' + postid)
       .then( success => {
           console.log(success.data);
           return dispatch(DislikePostSuccess(success.data));
       })
       .catch( fail => {
           console.log(fail.response.data);
           return dispatch(PostSuccess(fail.response.data));
       });
};

export const DislikePostSuccess = (data) => ({
   type: DISLIKE_POST,
   payload:data
});



export const DeletePostAction = (postid) => dispatch => {
    axios.post('/posts/deletePost/' + postid)
       .then( success => {
           console.log(success.data);
           return dispatch(DeletePostSuccess(success.data));
       })
       .catch( fail => {
           console.log(fail.response.data);
           return dispatch(PostSuccess(fail.response.data));
       });
};

export const DeletePostSuccess = (data) => ({
   type: DELETE_POST,
   payload:data
});


export const PostSuccess = (posts) => ({
    type: POST_SUCCESS,
    payload:posts
});

export const PostFailure = (errors) => ({
    type: POST_FAILURE,
    payload: errorResolve(errors)
});

export const LogOut = () => ({
    type: LOG_OUT,
});

export const MakeNewPost = (newPost) => dispatch => {
     axios.post('/posts/createpost', newPost)
        .then( success => {
            return dispatch(SuccessMakeNewPost());
        })
        .catch( fail => {
            return dispatch(FailMakeNewPost(fail.response.data));
        });
};

export const SuccessMakeNewPost = () => ({
    type: MAKE_NEW_POST_SUCCESS,
});

export const FailMakeNewPost = (errors) => ({
    type: MAKE_NEW_POST_FAILURE,
    payload: errorResolve(errors)
});


const errorResolve = (errors) => {
    let errorsEntities;
    if(Array.isArray(errors)) errorsEntities = errors.reduce(
        (errors, error) => ({...errors, [error.param]:error }), {});
        else errorsEntities = errors;
    return errorsEntities;
};


