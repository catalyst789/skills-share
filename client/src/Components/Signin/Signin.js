import React, {useState} from 'react';
import CSSstyle from './Signin.module.css';
import {Avatar, Button, CssBaseline, TextField, Grid, Typography, Container  } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';


import { LoginUser, LoginLoadingTrue } from '../../Store/Actions'

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

function Signin(props) {
  const classes = useStyles();

  
  const initialForm = { username: '', password: '' };
  const initialError = { username: '', password: '' };
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(initialError);


  const checkForm = () => {
    if(!form.username)
      setError(prevState => ({
          ...prevState,
          username: 'Username Field Must Not Empty'
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

  const UserLoginHandler = (event) =>{
    event.preventDefault();
    checkForm();
    if(form.username && form.password){
      props.LoadingTrue();
      props.LoginUser(form, props.history);
    }
  }

  return (
    <Container component="main" style={{marginBottom: '5em'}} maxWidth="xs">
    { props.auth.loading ? <Loading /> : '' }
    <Alert errors={props.auth}  />

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={UserLoginHandler} className={classes.form}>
          <TextField
            onChange={onChangeHandler}
            type="text"
            name="username"
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            autoFocus
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
          > Sign In </Button>
          <Grid container>
            <Grid item xs>
                <Link style={{textDecoration:'none'}} to="/forgotpassword">Forgot password ?</Link>
            </Grid>
            <Grid item>
              <Link style={{textDecoration:'none'}} to="/signup">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}



Signin.propTypes = {
  auth: PropTypes.object,
  LoginUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth:state.auth
});

const mapDispatchToProps = ({
  LoginUser:LoginUser,
  LoadingTrue:LoginLoadingTrue
});



export default connect(mapStateToProps, mapDispatchToProps)(Signin);