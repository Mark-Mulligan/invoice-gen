import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginTitle: {
    fontSize: '44px',
    textAlign: 'center'
  },
  paragraph: {
    fontSize: '18px',
    textAlign: 'center'
  },
  loginContainer: {
    maxWidth: '460px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingTop: '25px',
    paddingBottom: '40px',
    borderRadius: '15px'
  }
});

const LoginPage = ({ onSignInClick, history }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={`${classes.loginContainer} container-fluid`}>
        <h1 className={classes.loginTitle}>Lesson Invoice Generator</h1>
        <hr />
        <p className={classes.paragraph}>Easily manage a roster of students and effortlessly create invoices in seconds.</p>
        <button
          onClick={() => onSignInClick(history)}
          className="btn btn-dark btn-block"
        >
          <i className="fab fa-google mr-1"></i>
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;