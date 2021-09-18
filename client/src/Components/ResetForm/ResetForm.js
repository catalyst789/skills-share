import React, {useState} from 'react';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import CSSstyle from './ResetForm.module.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ChangePassword } from '../../Store/Actions'

function ResetForm(props) {


    const initialPassword = { oldPassword: '', newPassword: '' };
    const initialError = { oldPassword: '', newPassword: '' };
    const [password, setpassword] = useState(initialPassword);
    const [error, setError] = useState(initialError);


  const checkForm = () => {
    if(!password.oldPassword)
      setError(prevState => ({
          ...prevState,
          oldPassword: 'Old Password Field Must Not Empty'
      }));
    if(!password.newPassword)
      setError(prevState => ({
          ...prevState,
          newPassword: 'New Password Field Must Not Empty'
    }));
  };

  const onChangeHandler = (event) =>{
    event.persist();
    setpassword(prevState => ({...prevState, [event.target.name]: event.target.value}));
  }

  const PasswordChangeHanlder = (event) =>{
    event.preventDefault();
    checkForm();
    if(password.oldPassword && password.newPassword){
        props.ChangePassword(password, props.history);
    }
  }



    return (
        <Container style={{textAlign: 'center'}}>
        <Typography variant="h3">Reset Password</Typography>
        <TextField
                onChange={onChangeHandler}
                className={CSSstyle.width}
                name="oldPassword"
                type='password'
                placeholder="Old Password"
                margin="normal"
                variant="outlined"
            />
            <br />
            {error.oldPassword && !password.oldPassword ? <Typography component="small" color="secondary" variant= "inherit">{error.oldPassword}</Typography> : ''}
            <br/>
            <TextField
                onChange={onChangeHandler}
                name="newPassword"
                className={CSSstyle.width}
                type="password"
                placeholder="New Password"
                margin="normal"
                variant="outlined"
            />
            <br/>
            {error.newPassword && !password.newPassword ? <Typography component="small" color="secondary" variant= "inherit">{error.newPassword}</Typography> : ''}
            <br />
        <Button onClick={PasswordChangeHanlder} variant="contained" className={CSSstyle.bgcolor}> I'm Ready </Button>
        </Container>
    )
};


ResetForm.propTypes = {
    ChangePassword: PropTypes.func.isRequired,
    }
    
    const mapDispatchToProps = ({
        ChangePassword:ChangePassword
    });


export default connect(null, mapDispatchToProps)(ResetForm);
