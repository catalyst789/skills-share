import { combineReducers } from 'redux';
import { RegisterReducer } from './RegisterReducer';
import { LoginReducer } from './LoginReducer';
import { AuthReducers } from './AuthReducers';

export default combineReducers({
    register: RegisterReducer,
    auth: LoginReducer,
    posts: AuthReducers
});