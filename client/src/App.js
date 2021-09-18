import React, { Component, Fragment } from 'react';
import CSSstyle from './App.module.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from './Components/Navigation/Navigation';
import Footer from './Components/Footer/Footer';
import LandingPage from './Components/LandingPage/LandingPage';
import SignUp from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';
import ResetForm from './Components/ResetForm/ResetForm';
import ForgotPasswordPage from './Components/ForgotPassoword/ForgotPassword';
import Timeline from './Components/Timeline/Timeline';
import Profile from './Components/Profile/Profile';
import EditProfileForm from './Components/EditProfileForm/EditProfileForm';
import axios from '../src/Utility/AxiosConfig';

import { LoadUser } from '../src/Store/Actions';

class App extends Component {

  sessionLogin(){
    if(localStorage.token){
      axios.defaults.headers.common['auth-token'] = localStorage.token;
      this.props.LoadUser(localStorage.token);
    } else {
      delete axios.defaults.headers.common['auth-token'];
    }
  }
  
  componentDidMount(){
    this.sessionLogin();
  }
  
  render() {
    // console.log(this.props);
    const { isAuthenticated } = this.props.auth;
    return (
      <BrowserRouter>
        <div className={CSSstyle.widthHeight}>
          <Navigation />
            <Switch>
            {isAuthenticated ? 
              <Fragment>
              <Route path="/" exact component={Timeline} />
              <Route path="/signup" component={Timeline} />
              <Route path="/signin" component={Timeline} />
              <Route path="/timeline" component={Timeline} />
              <Route path="/profile" component={Profile} />
              <Route path="/editProfile" component={EditProfileForm} />
              <Route path="/resetPassword" component={ResetForm} />
              <Route path="/forgotpassword" component={ForgotPasswordPage} />
              
              
              </Fragment> :
            <Fragment>
              <Route path="/" exact component={LandingPage} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={Signin} />
              <Route path="/timeline" component={Signin} />
              <Route path="/profile" component={Signin} />
              <Route path="/editProfile" component={Signin} />
              <Route path="/resetPassword" component={Signin} />
              <Route path="/forgotpassword" component={ForgotPasswordPage} />

              </Fragment>}
              
              </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = ({
  LoadUser: LoadUser
});



export default connect(mapStateToProps, mapDispatchToProps)(App);

