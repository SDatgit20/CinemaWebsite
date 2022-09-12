import React, { useState, useEffect } from "react";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Button, Dialog, Typography, TextField } from "@material-ui/core";
import { initialValues, formSchema } from "./Services/changePasswordService"
import styles from "./changePasswordDialogStyles";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import apiService from "../../helpers/apiService";

export default ({ open, onClose, isAuthenticated }) => {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  })
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isNewConfirmPasswordValid, setIsNewConfirmPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false)

  const classes = styles();
  const handleClose = () => {
    onClose();
  };
  const onOldChangeHandler = (event) => {
    setPassword({ ...password, oldPassword: event.target.value })
  };
  const onNewChangeHandler = (event) => {
    setPassword({ ...password, newPassword: event.target.value });
  };
  const onNewConfirmChangeHandler = (event) => {
    setPassword({ ...password, confirmNewPassword: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(
      !showPassword,
    );
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePassword = async (e) => {
    e.preventDefault()
    try {
      const response = await apiService.post("login/changePassword", password)
      alert(response.data)
      setPasswordChangeSuccess(true)
    } catch (err) {
      alert("Old Password does not matched")

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
      >

        <div className={classes.container}>
          <Typography variant="h6" className={classes.dialogHeader}>
            Change Password
          </Typography>
          <form
            onSubmit={handlePassword}>
            <div className={classes.dialogMain}>
              <p>
                <span
                  style={
                    { backgroundColor: "lightpink", padding: ".3rem" }
                  }
                >
                  {((password.newPassword == password.confirmNewPassword) && password.newPassword !== "") ? " "
                    : "Password length atleast 8 with [A..Z],[a..z],[0..9],[/,@,#,$,...*]"}
                </span>
              </p>
              <FormControl className={classes.dialogContent}>
                <InputLabel required="true"
                  variant="standard" htmlFor="standard-adornment-password">Old Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type='text'
                  value={password.oldPassword}

                  onChange={onOldChangeHandler}
                />
              </FormControl>
              <FormControl className={classes.dialogContent}>
                <InputLabel required="true"
                  variant="standard" htmlFor="standard-adornment-password">New Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password.newPassword}
                  onChange={onNewChangeHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <p>
                <span
                  style={
                    isNewPasswordValid
                      ? { backgroundColor: "lightgreen", padding: ".2rem" }
                      : { backgroundColor: "lightpink", padding: ".2rem" }
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
                  type='password'
                  value={password.confirmNewPassword}
                  onChange={onNewConfirmChangeHandler}
                />
              </FormControl>

            </div>

            <Button
              disabled={!isNewConfirmPasswordValid}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.dialogButton}

            >
              Submit
            </Button>

          </form>

        </div>


      </Dialog>

      <Snackbar
        open={passwordChangeSuccess === true}
        autoHideDuration={3000}
      >
        <Alert severity="success">Password Change successfully</Alert>
      </Snackbar>
    </>
  );
}