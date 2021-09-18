import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CSSstyle from './Timeline.module.css';
import { Container, Typography, Button, Divider, Box } from '@material-ui/core';
import Post from '../Post/Post';

import { TimelineAction, LoadUser } from '../../Store/Actions';
import axios from '../../Utility/AxiosConfig';

function Timeline(props) {


    const [posts, setposts] = useState(null);
    const [user, setuser] = useState(null);



    useEffect(() => {
        // const sessionLogin =()=>{
        //     if(localStorage.token){
        //         axios.defaults.headers.common['auth-token'] = localStorage.token;
        //         props.LoadUser(localStorage.token);
        //     } else {
        //       delete axios.defaults.headers.common['auth-token'];
        //     }
        //   }
        const callTimeline = () => {
            // sessionLogin();
            props.FetchTimeline();
            setuser(props.auth.user);
        };
        if(!props.posts.posts && !props.posts.errors){
            callTimeline();
        }
        if(props.posts.posts){
        const mappedPosts = props.posts.posts.filter((post) => post.postedBy !== null)
            setposts(mappedPosts);
        }
        if(!displayPosts){
            callTimeline();
        }
        return () => { }
    }, [props]);
    // console.log(posts, user);
    let displayPosts;
    if( posts && user ){
        displayPosts = posts.map(post => <Post key={post._id} post={post} />)
    }

    // props.FetchTimeline();

    return (
        <Container>
            <Typography variant="h4">
            Hey, { user && !user.name ? user.username : '' } { user && user.name ? user.name : '' }
            <span role="img" aria-label="hi" aria-labelledby="hi">👋</span>
            </Typography>
            <Button
            type="submit"
            variant="contained"
            className={CSSstyle.bgcolor}
          > <Link style={{textDecoration:'none', color:'white'}} to="/profile">What Is In Your Mind</Link> </Button>
          <Divider style={{margin: '1em 0'}} />
            <Typography variant="h5">Trending Posts</Typography>
            <Box className={CSSstyle.posts}>
               {displayPosts ? displayPosts.reverse() : <Typography color="secondary">No Recent posts Yet, Kindly Create one to show Other People</Typography>}
            </Box>  
        </Container>
    )
}

Timeline.propTypes = {
    auth: PropTypes.object.isRequired,
    posts:PropTypes.object.isRequired,
    FetchTimeline:PropTypes.func.isRequired,
    LoadUser:PropTypes.func.isRequired
  }
  
  const mapStateToProps = state => ({
    auth:state.auth,
    posts:state.posts
  });
  
  const mapDispatchToProps = ({
      FetchTimeline:TimelineAction,
      LoadUser: LoadUser
  });



export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
