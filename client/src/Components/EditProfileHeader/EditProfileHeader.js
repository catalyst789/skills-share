import React, {useState, useEffect} from 'react';
import CSSstyle from './EditProfileHeader.module.css';
import {Grid, Paper, Avatar, Button, Typography} from '@material-ui/core';
import Camera from '@material-ui/icons/Camera';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { UploadImageAction } from '../../Store/Actions/'

function EditProfileHeader(props) {
  const { user } = props;

  const [profilepic, setprofilepic] = useState({
    oldavatar: user.avatar, avatar : ''
  })

  const onUploadImageHandler = () => {
    document.querySelector("#fileClick").addEventListener('click', function(){
      document.querySelector('input[type="file"]').click();
    });

    document.querySelector('input[type="file"]').onchange = function(e){
      setprofilepic(prevState => ({...prevState, [e.target.name]: e.target.value}));
      document.querySelector('input[type="submit"]').click();
    }
  }

  const OnImageChangeHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    formData.append('oldavatar', profilepic.avatar);
    for (const pair of formData.entries()) {
      console.log( pair[0], pair[1]);
    }

    props.UploadImageAction(formData);

  }

  useEffect(() => {
    setprofilepic(prevState => ({...prevState, oldavatar: props.user.avatar}));
    return () => { }
  }, [props.user.avatar])

  const prodImgPath = process.env.REACT_APP_BASE_URL || 'http://localhost:3080';

  return (
    <Grid className={CSSstyle.center} >
    <Paper className={CSSstyle.spacing} elevation={3}> 
    <main className={CSSstyle.details}>
    <Grid className={CSSstyle.mediaContainer}>
      <Avatar variant="rounded" className={CSSstyle.avatar} src={`${process.env.REACT_APP_BASE_URL}/images/uploads/${user.avatar}`} />

    <form style={{display:'none'}} id="imageUploadForm" onSubmit={OnImageChangeHandler}  encType="multipart/form-data" >
      <input type="file" name="avatar" />
      <input type="submit" />
    </form>

      <Grid>
        <Typography variant="h4">{user.name ? user.name : user.username}</Typography>
        <Typography className={CSSstyle.downSpace} variant="subtitle1" color="textSecondary">@{user.username}</Typography>
        <Button
          id="fileClick"
          onClick={onUploadImageHandler}
          variant="contained" 
          startIcon={<Camera />} 
          className={CSSstyle.bgcolor}> Change Photo</Button>
      </Grid>

    </Grid>
    <div style={{marginBottom: '1em'}}>
      <Typography className={CSSstyle.bgcolor}  style={{padding: '.2em', borderRadius: '.3em'}} variant="body2" component="span">
      Posts: {user.posts.length}
      </Typography> 
      <Typography variant="body2" component="span" style={{margin:'0 .5em'}}>|</Typography>
      <Typography variant="body2" component="span" color="textSecondary">
      Joined {(new Date(user.createdAt)).toDateString()}
      </Typography>
    </div>
    </main>
    </Paper>
    </Grid>
  )
}

EditProfileHeader.propTypes = {
  UploadImageAction: PropTypes.func.isRequired
}

const mapDispatchToProps = ({
  UploadImageAction:UploadImageAction
});


export default connect(null, mapDispatchToProps)(EditProfileHeader)
