import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alerts(props) {


    // console.log(props);


  const classes = useStyles();

  return (
    <div className={classes.root}>
        {props.msg ? <Alert severity="success">{props.msg}</Alert> : ''}
    </div>
  );
}


const mapStateToProps = state => ({
    msg: state.register.successMessage
  });


export default connect(mapStateToProps)(Alerts);
