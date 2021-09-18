import React, {useState, useEffect} from 'react';
import CSSstyle from './Profile.module.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Typography, TextField, Button, Divider } from '@material-ui/core';
import EditProfileHeader from '../EditProfileHeader/EditProfileHeader';
import Post from '../Post/Post';

import { ProfileAction, MakeNewPost } from '../../Store/Actions';


function Profile(props) {
    // console.log(props.auth.user);

    const [posts, setposts] = useState(null);
    const [user, setuser] = useState(null);
    const initialError = { postText: '' };
    const [error, setError] = useState(initialError);
    const [makePost, setmakePost] = useState({
        postText: '',
        postReload:false
    });

    
  const checkForm = () => {
    if(!makePost.postText)
      setError(prevState => ({
          ...prevState,
          postText: 'Field Must Not Empty'
      }));
  };

    useEffect(() => {
        var callProfile = () => {
            props.FetchProfile();
            setuser(props.auth.user);
        };
        if(!props.posts.posts && !props.posts.error){
            callProfile();
        }
        if(props.posts.posts){
            setposts(props.posts.posts);
        }
        if(!displayPosts){
            callProfile();
        }
        if(makePost.postReload){
            callProfile();
          setmakePost(prevState => ({...prevState, postReload:false}));
        }
        return () => { }
    }, [props]);
    // console.log(posts, user);
    let displayPosts;
    if( posts && user ){
        displayPosts = posts.map((post) => <Post key={post._id} post={post} user={props.auth.user} />);    
    }
    const onChangeHandler = (event) =>{
        event.persist();
        setmakePost(prevState => ({...prevState, [event.target.name]: event.target.value}));
      }
    
      const onPostHandler = (event) =>{
        event.preventDefault();
        checkForm();
        if(makePost.postText){
          props.MakeNewPost(makePost);
          setmakePost(prevState => ({...prevState, postReload:true, postText: ''}));
        }
      }


    return (
        <Container>
            <EditProfileHeader user={props.auth.user} />
            <Typography className={CSSstyle.thin} variant="h6" >Change the world with your thoughts...</Typography>
            <form onSubmit={onPostHandler}>
                <TextField
                onChange={onChangeHandler}
                name="postText"
                type="text"
                placeholder="Your thoughts..."
                multiline
                fullWidth
                margin="normal"
                rows={3}
                variant="outlined" />
                {error.postText && !makePost.postText ? <Typography component="small" color="secondary" variant= "inherit">{error.postText}</Typography> : ''} <br />
                <Button type="submit" variant="contained" className={CSSstyle.bgcolor}> Show The World </Button>
            </form>
        <Divider style={{margin: '1em 0'}} />
        <Typography variant="h6" color="textSecondary" >Personal Timeline</Typography>
        {displayPosts ? displayPosts.reverse() : <Typography color="secondary">No Recent posts Yet, Kindly Create one to show Other People</Typography>}
        {props.auth.user.posts.length === 0 && !!displayPosts ? <Typography color="secondary">No Recent posts Yet, Kindly Create one to show Other People</Typography> : ''}
    
        </Container>
    )
}


Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    posts:PropTypes.object.isRequired,
    FetchProfile:PropTypes.func.isRequired
  }
  
  const mapStateToProps = state => ({
    auth:state.auth,
    posts:state.posts
  });
  
  const mapDispatchToProps = ({
      FetchProfile:ProfileAction,
      MakeNewPost:MakeNewPost
  });


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
