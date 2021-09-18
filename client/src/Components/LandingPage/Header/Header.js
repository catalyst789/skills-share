import React from 'react';
import CSSstyle from './Header.module.css';
import { Link } from 'react-router-dom';
import BackgroundVideo from '../../../assets/bg-video1.mp4';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import HowToReg from '@material-ui/icons/HowToReg';
import LockOpenIcon from '@material-ui/icons/LockOpen';

function Header() {
    return (
      <Grid align="center" container className={CSSstyle.headerContainer}>
      <video className={CSSstyle.headerVideo} loop muted autoPlay src={BackgroundVideo} />
      <Box className={CSSstyle.headerContent}>
      <Typography variant="h4" component="h1">Here We Teach So You May Outreach
        <span className={CSSstyle.dot} >.</span>
      </Typography>
      <Typography variant="h6" component="h4">Join Sheryians to code, learn, make, and discover.</Typography>
      <Link to="signup" style={{textDecoration: 'none', marginRight: '1em'}} ><Button className={CSSstyle.signUpButton} variant="contained" startIcon={<HowToReg />}>Sign Up</Button></Link>
      <Link to="signin" style={{textDecoration: 'none'}}><Button className={CSSstyle.signUpButton} variant="contained" startIcon={<LockOpenIcon />}>Sign In</Button></Link>
      </Box>
      </Grid>
    )
}

export default Header;