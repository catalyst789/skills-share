import React, { useState } from 'react';
import CSSstyle from './Navigation.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {AppBar, Toolbar, IconButton, Typography, MenuItem, Menu} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';        
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Timeline from '@material-ui/icons/Timeline';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Settings from '@material-ui/icons/Settings';

import { LogOut } from '../../Store/Actions'


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function Navigation(props) {
  // console.log(props);
  const { isAuthenticated } = props.auth;
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const gotoProfile = () => {
    handleMenuClose();
    props.history.push('/profile');
  };

  const gotoTimeline = () => {
    props.history.push('/timeline');
    handleMenuClose();
  };

  const gotoSetting = () => {
    props.history.push('/editProfile');
    handleMenuClose();
  };


  const loggingout = () => {
    props.LogOut();
    handleMenuClose();
    props.history.push('/');
  }

  const gotoHome = () => {
    
  }


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={gotoHome}>
      <IconButton title="Timeline" title="Home" color="inherit">
      <HomeIcon />
      </IconButton>
      <p>Home</p>
    </MenuItem>
      <MenuItem onClick={gotoTimeline}>
        <IconButton title="Timeline" color="inherit">
            <Timeline />
        </IconButton>
        <p>Timeline</p>
      </MenuItem>
      <MenuItem onClick={gotoProfile}>
        <IconButton title="Profile" color="inherit">
            <VerifiedUser />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={loggingout}>
        <IconButton title="Logout" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
      <MenuItem onClick={gotoSetting}>
      <IconButton title="Settings" color="inherit">
        <Settings />
      </IconButton>
      <p>Settings</p>
    </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={CSSstyle.backgroundColor}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
          <Link to="/" style={{textDecoration: 'none', color:'#ffff', fontFamily: 'PlayFair Display', fontWeight: '600', fontSize: '25px'}} >Skillls.share</Link>           
          </Typography>
          <div className={classes.grow} />

          {isAuthenticated ? (
            <div className={classes.sectionDesktop}>
            <IconButton onClick={gotoHome}
              title="Home"  color="inherit">
              <HomeIcon />
            </IconButton>
            <IconButton onClick={gotoTimeline}
              title="Timeline" color="inherit">
                <Timeline />        
            </IconButton>
            <IconButton onClick={gotoProfile}
              title="Profile" color="inherit">
                <VerifiedUser />
            </IconButton>
            <IconButton
              onClick={gotoSetting}
              title="Settings" color="inherit">
              <Settings />
            </IconButton>
            <IconButton
              onClick={loggingout}
              title="Logout" color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
          ) : ''}

           

            {isAuthenticated ?  <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div> : '' }

         

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}

Navigation.propTypes = {
  auth: PropTypes.object,
}

const mapStateToProps = state => ({
  auth:state.auth
});

const mapDispatchToProps = ({
  LogOut:LogOut
});




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));