import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { RegisterUser, RegisterLoadingTrue } from '../../Store/Actions'

import CSSstyle from './Signup.module.css';
import {Avatar, Button, CssBaseline, TextField, Grid, Typography, Container  } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import Alert from '../Alert/Alert';
import SuccessMessage from '../SucessAlert/SuccessAlert';
import Loading from '../Loading/Loading';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#ffb01f',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Signup(props) {
  // console.log(props);
  const classes = useStyles();

  const initialForm = { username: '', email: '', password: '' };
  const initialError = { username: '', email: '', password: '' };
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(initialError);


  const checkForm = () => {
    if(!form.username)
      setError(prevState => ({
          ...prevState,
          username: 'Username Field Must Not Empty'
      }));
    if(!form.username)
      setError(prevState => ({
          ...prevState,
          email: 'Email Field Must Not Empty'
    }));
    if(!form.password)
      setError(prevState => ({
          ...prevState,
          password: 'Password Field Must Not Empty'
    }));
  };

  const onChangeHandler = (event) =>{
    event.persist();
    setForm(prevState => ({...prevState, [event.target.name]: event.target.value}));
  }

  const UserRegisterationHandler = (event) =>{
    event.preventDefault();
    checkForm();
    if(form.username && form.email && form.password){
      props.LoadingTrue();
      props.registerUser(form);
    }
  }

  return (
    <Container component="main" style={{marginBottom: '5em'}} maxWidth="xs">
    { props.register.loading ? <Loading /> : '' }
      <Alert errors={props.register} />
      <SuccessMessage />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={UserRegisterationHandler} className={classes.form}>
          <TextField
            onChange={onChangeHandler}
            text="email"
            type="text"
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            label="example@john.com"
            autoFocus
          />
          {error.email && !form.email ? <Typography component="small" color="secondary" variant= "inherit">{error.email}</Typography> : ''}
          <TextField
            onChange={onChangeHandler}
            name="username"
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
          />
          {error.username && !form.username ? <Typography component="small" color="secondary" variant= "inherit">{error.username}</Typography> : ''}
          <TextField
            onChange={onChangeHandler}
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
          />
          {error.password && !form.password ? <Typography component="small" color="secondary" variant= "inherit">{error.password}</Typography> : ''}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={`${classes.submit} ${CSSstyle.bgcolor}`}
          > Sign Up </Button>
          <Grid container>
            <Grid item xs>
              
            </Grid>
            <Grid item>
            <Link style={{textDecoration:'none'}} to="/signin">Already have an account ? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

Signup.propTypes = {
  register: PropTypes.object,
  registerUser: PropTypes.func.isRequired,
  LoadingTrue: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  register: state.register
});

const mapDispatchToProps = ({
  registerUser:RegisterUser,
  LoadingTrue:RegisterLoadingTrue
});




export default connect(mapStateToProps, mapDispatchToProps)(Signup);