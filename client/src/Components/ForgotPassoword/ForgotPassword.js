import React, {useState} from 'react';
import CSSstyle from './ForgotPassword.module.css';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ForgotPasswordAction } from '../../Store/Actions'

function ForgotPassword(props) {

    const initialForm = {  email: '' };
    const initialError = { email: '' };
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState(initialError);


  const checkForm = () => {
    if(!form.email)
      setError(prevState => ({
          ...prevState,
          email: 'Email Field Must Not Empty'
      }));
  };

  const onChangeHandler = (event) =>{
    event.persist();
    setForm(prevState => ({...prevState, [event.target.name]: event.target.value}));
  }

  const PasswordRecoveryHandler = (event) =>{
    event.preventDefault();
    checkForm();
    if(form.email){
        props.ForgotPasswordAction(form.email, props.history);
        console.log(form);
    }
  }



    return (
        <Container style={{textAlign: 'center'}}>
        <Typography variant="h3">Password Recovery</Typography>
        <form onSubmit={PasswordRecoveryHandler}>
            <TextField
                onChange={onChangeHandler}
                className={CSSstyle.width}
                type='email'
                name="email"
                placeholder="registered email"
                margin="normal"
                variant="outlined"
        /> <br />
        {error.email && !form.email ? <Typography component="small" color="secondary" variant= "inherit">{error.email}</Typography> : ''}
            <br/>
            <Button type="submit" variant="contained" className={CSSstyle.bgcolor}> Are You Sure ? </Button>
        </form>
        </Container>
    )
}



ForgotPassword.propTypes = {
    auth: PropTypes.object,
  }
  
  const mapStateToProps = state => ({
    auth:state.auth
  });
  
  const mapDispatchToProps = ({
    ForgotPasswordAction:ForgotPasswordAction
  });


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
