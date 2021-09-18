import React from 'react';
import CSSstyle from './Post.module.css';
import {Paper, Avatar, Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails, IconButton} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ProfileAction, TimelineAction, LikePostAction, DislikePostAction, DeletePostAction } from '../../Store/Actions/'


function Post(props) {
    // console.log(props);
    const { post, user } = props;


    const onPostReactionsHandler = (event) => {
        if(event.target.classList.contains('fa-thumbs-up')){
            console.log('liked', post._id);
            props.LikePostAction(post._id);
        }
        if(event.target.classList.contains('fa-thumbs-down')){
            console.log('disliked', post._id);
            props.DislikePostAction(post._id);
        }
        if(event.target.classList.contains('fa-trash')){
            console.log('deleted', post._id);
            props.DeletePostAction(post._id);
        }

        setTimeout(() => {
            if(user) props.FetchProfile();
            else props.FetchTimeline();
        }, 500);
    }

  const prodImgPath = process.env.REACT_APP_BASE_URL || 'http://localhost:3080';
    
    return (
        <Paper className={CSSstyle.paper} elevation={3}>
        <Container style={{display: 'flex'}}>
        <Avatar variant="rounded" className={CSSstyle.avatar} src={`${process.env.REACT_APP_BASE_URL}/images/uploads/${post && !user ? post.postedBy.avatar : user.avatar }`} />
        <Box>
            <Box className={CSSstyle.social}>
                <Typography variant="inherit" component="h6">{post ? (new Date(post.createdAt)).toLocaleString() : ''}</Typography>

                {user ? <Accordion className={CSSstyle.accordian}>
                <AccordionSummary
                expandIcon={<IconButton><ExpandMoreIcon /></IconButton>}
                aria-controls="panel1a-content"
                id="panel1a-header"></AccordionSummary>
                <AccordionDetails onClick={onPostReactionsHandler} className={CSSstyle.socialContent}>
                
                {user ? <i className={`fas fa-pencil-alt ${CSSstyle.like} `}></i>: ''}
                {user ? <i className={`fa fa-trash ${CSSstyle.dislike} `}></i>: ''}
                </AccordionDetails>
            </Accordion> : ''}
            </Box>
            <Typography variant="body1" component="h6">{post.postedBy && !user ? post.postedBy.name : ''} {user ? user.name : ''}</Typography>
            <Typography style={{color:"rgba(255, 176, 29, 0.925)"}} variant="subtitle2" component="h6">@{post.postedBy && !user ? post.postedBy.username: ''} {user ? user.username : ''} {!post.postedBy ? '!!This user has deleted their Account!!' : '' }</Typography>
            <Typography variant="body2" component="h6">{post ? post.postText : ''}</Typography>
            <Typography style={{display:'flex',
        alignItems:'center'}} onClick={onPostReactionsHandler} variant="inherit" component="small">
            <div style={{display:'flex',
            alignItems:'center'}}>{post ? post.likes.length : ''} <span>Likes</span>&nbsp; <i className={`fa fa-thumbs-up ${CSSstyle.like} `}></i></div>
            &nbsp; | &nbsp; <div style={{display:'flex',
             alignItems:'center'}}>{post ? post.dislikes.length : ''} <span style={{color:"rgb(243, 75, 69)"}}>Dislikes</span> &nbsp;<i className={`fa fa-thumbs-down ${CSSstyle.dislike} `}></i></div>
            </Typography>

        </Box>
        </Container>
        </Paper>
    )
}


Post.propTypes = {
    auth: PropTypes.object.isRequired,
    posts:PropTypes.object.isRequired,
    FetchProfile:PropTypes.func.isRequired,
    FetchTimeline:PropTypes.func.isRequired,
    LikePostAction:PropTypes.func.isRequired,
    DislikePostAction:PropTypes.func.isRequired,
    DeletePostAction:PropTypes.func.isRequired
  }
  
  const mapStateToProps = state => ({
    auth:state.auth,
    posts:state.posts
  });
  
  const mapDispatchToProps = ({
      FetchProfile:ProfileAction,
      FetchTimeline:TimelineAction,
      LikePostAction:LikePostAction,
      DislikePostAction:DislikePostAction,
      DeletePostAction:DeletePostAction
  });

export default connect(mapStateToProps, mapDispatchToProps)(Post);
