import React, {useState, useEffect} from 'react';
import CSSstyle from './EditProfileForm.module.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography, TextField, Container,Divider, RadioGroup, Radio, FormControlLabel, Button } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import RestoreTwoTone from '@material-ui/icons/RestoreTwoTone';
import EditProfileHeader from '../EditProfileHeader/EditProfileHeader';

import { EditUserDetails, DeleteAccountAction } from '../../Store/Actions'


function EditProfileForm(props) {

  // console.log(props);

    const initialError = { username: '', name: '', email: '', address: '', contact: '', about: '', gender: '' };
    const [user, setuser] = useState(null);
    const [error, setError] = useState(initialError);
  
  
    useEffect(() => {
        let initialState = {name: '', email: '', username: '', address: '', contact: '', about: '', gender: ''};
        setuser({...initialState, ...props.auth.user})
        return () => { }
    }, [props.auth.user]);

    let displayHeader;
    if(user) displayHeader = <EditProfileHeader user={user} />

    const checkForm = () => {
      if(!user.username)
        setError(prevState => ({
            ...prevState,
            username: 'Username Field Must Not Empty'
        }));
      if(!user.name)
        setError(prevState => ({
            ...prevState,
            name: 'Name Field Must Not Empty'
      }));
      if(!user.email)
        setError(prevState => ({
            ...prevState,
            email: 'Email Field Must Not Empty'
      }));
      if(!user.contact)
        setError(prevState => ({
            ...prevState,
            contact: 'Contact Field Must Not Empty'
      }));
      if(!user.address)
        setError(prevState => ({
            ...prevState,
            address: 'Address Field Must Not Empty'
      }));
      if(!user.about)
        setError(prevState => ({
            ...prevState,
            about: 'About Field Must Not Empty'
      }));
      if(!user.gender)
        setError(prevState => ({
            ...prevState,
            gender: 'Gender Must be Selected'
      }));
    };
  
    const onChangeHandler = (event) =>{
      event.persist();
      setuser(prevState => ({...prevState, [event.target.name]: event.target.value}));
    }
  
    const UserUpdationHandler = (event) =>{
      event.preventDefault();
      checkForm();
      if(user.username && user.email && user.name && user.address && user.contact && user.about && user.gender){
        props.EditUserDetails(user);
      }
    }

    const onDeleteUserHandler = (event) =>{
      event.preventDefault();
      if(window.confirm('Do you want to Delete your Account Permanentrly Action can not be reversed..!')){
        props.DeleteAccountAction(props.history);
      }
    }


    return (
        <Container className={CSSstyle.center}>
            <Typography variant="h4">Edit Profie Details...</Typography>
             {displayHeader}
            <div style={{textAlign: 'center'}}>
            
            <Button 
                style={{margin: '0 1em 1em 0 '}}
                variant="contained" 
                startIcon={<RestoreTwoTone />} 
                className={CSSstyle.bgcolor}> 
                  <Link style={{textDecoration: 'none', color:'#ffff'}} to="/resetPassword">Reset Password</Link>
                </Button>
            
            <Button 
                style={{marginBottom: '1em'}}
                variant="contained" 
                startIcon={<Delete />} 
                className={CSSstyle.bgcolor}
                onClick={onDeleteUserHandler}
                >Delete Profile</Button>

            </div>
            

            <Divider style={{marginBottom: "1em"}}  />
            <Typography variant="h5">Profie Details...</Typography>

            <form onSubmit={UserUpdationHandler}> 

            <TextField
                name="username"
                onChange={onChangeHandler}
                value={user ? user.username : ''}
                type='text'
                placeholder="Username"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            {error.username && !user.username ? <Typography component="small" color="secondary" variant= "inherit">{error.username}</Typography> : ''}
            <TextField
                name="name"
                onChange={onChangeHandler}
                value={user ? user.name : ''}
                type="text"
                placeholder="Full Name"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            {error.name && !user.name ? <Typography component="small" color="secondary" variant= "inherit">{error.name}</Typography> : ''}
            <TextField
                name="email"
                onChange={onChangeHandler}
                value={user ? user.email : ''}
                type="email"
                placeholder="example@email.com"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            {error.email && !user.email ? <Typography component="small" color="secondary" variant= "inherit">{error.email}</Typography> : ''}
            <TextField
                name="address"
                onChange={onChangeHandler}
                value={user ? user.address : ''}
                type="text"
                placeholder="Address"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            {error.address && !user.address ? <Typography component="small" color="secondary" variant= "inherit">{error.address}</Typography> : ''}
            <TextField
                name="contact"
                onChange={onChangeHandler}
                value={user ? user.contact : ''}
                type="text"
                placeholder="+(con) tact no"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            {error.contact && !user.contact ? <Typography component="small" color="secondary" variant= "inherit">{error.contact}</Typography> : ''}
            <TextField
                name="about"
                onChange={onChangeHandler}
                value={user ? user.about : ''}
                type="text"
                placeholder="tell us about you..."
                multiline
                fullWidth
                margin="normal"
                rows={3}
                variant="outlined"
            />
            {error.about && !user.about ? <Typography component="small" color="secondary" variant= "inherit">{error.about}</Typography> : ''}

            <RadioGroup defaultChecked={user ? user.gender : ''} row aria-label="gender" name="customized-radios">
            <FormControlLabel
                onChange={onChangeHandler}
                checked={user && user.gender === 'male'  ? true : false}
                name="gender"
                value="male" 
                control={<Radio />} label="Male" />
            <FormControlLabel 
                onChange={onChangeHandler}
                checked={user && user.gender === 'female'  ? true : false}
                name="gender" 
                value="female"
                control={<Radio />} label="Female" />
                </RadioGroup>
                {error.gender && !user.gender ? <Typography component="small" color="secondary" variant= "inherit">{error.gender}</Typography> : ''}
            <br />
            <Button type="submit" variant="contained" className={CSSstyle.bgcolor}> Submit Details </Button>

            <Button type="reset" variant="contained" style={{margin: '1em 1em'}} color="default">Reset</Button>


            </form>
        </Container>
    )
};


EditProfileForm.propTypes = {
  auth: PropTypes.object.isRequired,
  EditUserDetails: PropTypes.func.isRequired,
  DeleteAccountAction:PropTypes.func.isRequired
  }
  
  const mapStateToProps = state => ({
    auth:state.auth,
  });
  
  const mapDispatchToProps = ({
    EditUserDetails:EditUserDetails,
    DeleteAccountAction:DeleteAccountAction
  });


export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm)
