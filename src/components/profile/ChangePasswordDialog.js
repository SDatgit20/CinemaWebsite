import React, { useState, useEffect } from "react";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Button, Dialog, Typography, TextField } from "@material-ui/core";
import styles from "./changePasswordDialogStyles";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { logout } from "../../helpers/authService";
import { onChangePassword } from "./services/passwordService.js";

export default ({ open, onClose, isAuthenticated }) => {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  })
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isNewConfirmPasswordValid, setIsNewConfirmPasswordValid] = useState(false);
  const [passwordChangeStatus, setPasswordChangeStatus] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPasswordChangeStatusMsg, setShowPasswordChangeStatusMsg] = useState("");
  const classes = styles();
  const handleClose = () => {
    onClose();
    setTimeout(() => window.location.assign("/Profile"), 2000);
  };
  const onOldChangeHandler = (event) => {
    setPassword({ ...password, oldPassword: event.target.value })
  };
  const onNewChangeHandler = (event) => {
    setPassword({ ...password, newPassword: event.target.value });
  };
  const onConfirmChangeHandler = (event) => {
    setPassword({ ...password, confirmNewPassword: event.target.value });
  };

  const handleClickShowOldPassword = () => {
    setShowOldPassword(
      !showOldPassword,
    ); 
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(
      !showNewPassword,
    );
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(
      !showConfirmPassword,
    );
  }

  const handleMouseDownOldPassword = (event) => {
    event.preventDefault();
  };


  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handlePassword = async (e) => {
    e.preventDefault()

    try {
      const response = await onChangePassword(password)
      const passwordResponse = response.data
      setShowPasswordChangeStatusMsg(passwordResponse);
      logout();
      setTimeout(() => window.location.assign("/login"), 1500);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setShowPasswordChangeStatusMsg(err.response.data)

      }
    }

  };

  useEffect(() => {
    if (password.newPassword.length > 8 && /\d/.test(password.newPassword)
      && /[A-Z]/.test(password.newPassword)
      && /[0-9]/.test(password.newPassword)
      && /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password.newPassword)) {
      setIsNewPasswordValid(true);
    } else {
      setIsNewPasswordValid(false);
    }
  }, [password.newPassword]);

  useEffect(() => {
    if (isNewPasswordValid && password.newPassword === password.confirmNewPassword) {
      setIsNewConfirmPasswordValid(true);
    }
    else {
      setIsNewConfirmPasswordValid(false);
    }
  }, [password.confirmNewPassword]);
  return (
    <>
      <Dialog
        open={open}
        fullWidth
        classes={{
          paper: classes.dialogRoot,
        }}
        onClose={handleClose}
      >
        <div className={classes.container}>

          <div className={classes.dialogHeader}>
            <div className={classes.dialogTitle}>
              <Typography variant="h6" className={classes.dialogHeaderText}>
            Change Password
          </Typography>
            </div>
            <div className={classes.closeIcon}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          <form 
            onSubmit={handlePassword}>
            <div className={classes.dialogMain}>

              <FormControl className={classes.dialogContent}>
                <InputLabel required="true" id="pldPassword"
                  variant="standard" htmlFor="standard-adornment-password">Old Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showOldPassword ? 'text' : 'password'}
                  value={password.oldPassword}

                  onChange={onOldChangeHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownOldPassword}
                      >
                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <p>
                <span
                  style={
                    { color: "red", padding: ".rem" }
                  }
                >
                  {((password.newPassword == password.confirmNewPassword) && password.newPassword !== "") ? " "
                    : "The password must contain at least- 5 letters, 1 capital letter, 1 small letter, 1 special character( @!#$%&), and 1 number"}
                </span>
              </p>
              <FormControl className={classes.dialogContent}>
                <InputLabel required="true"
                  variant="standard" htmlFor="standard-adornment-password">New Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={password.newPassword}
                  onChange={onNewChangeHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownNewPassword}
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <p>
                <span
                  style={
                    isNewPasswordValid
                      ? { color: "green", padding: ".2rem" }
                      : { color: "red", padding: ".2rem" }
                  }
                >
                  {isNewPasswordValid ? "Valid Password" : "Password not valid"}
                </span>
              </p>
              <FormControl className={classes.dialogContent}>
                <InputLabel required="true"
                  variant="standard" htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={password.confirmNewPassword}
                  onChange={onConfirmChangeHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>

            <Button data-testid="submitButton"
              disabled={!isNewConfirmPasswordValid}
              onClick={(e) => { setPasswordChangeStatus(true) }}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Submit
            </Button>
          </form>
        </div>
      </Dialog>

      <Snackbar
        open={passwordChangeStatus === true}
        autoHideDuration={500}
      >{(showPasswordChangeStatusMsg == "Password changed successfully") ?
        <Alert severity="success">{showPasswordChangeStatusMsg}</Alert> :
          <Alert severity="error">{showPasswordChangeStatusMsg}</Alert>}
      </Snackbar>
    </>
  );
}