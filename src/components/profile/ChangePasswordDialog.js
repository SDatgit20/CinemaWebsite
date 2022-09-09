import React, { useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  TextField,
} from "@material-ui/core";
import styles from "./changePasswordDialogStyles";

export default ({ open, onClose, isAuthenticated }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const classes = styles();
  const handleClose = () => {
    onClose();
  };
  const onOldChangeHandler = (event) => {
    setOldPassword(event.target.value); 
  };
  const onNewChangeHandler = (event) => {
    setNewPassword(event.target.value);
  };
  const onNewConfirmChangeHandler = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      classes={{
        paper: classes.dialogRoot,
      }}
    >
      <div className={classes.container}>
        <Typography variant="h6" className={classes.dialogHeader}>
          Change Password
        </Typography>
        <form>
          <div className={classes.dialogMain}>
            <TextField
              type="password"
              className={classes.dialogContent}
              id="old_password"
              label="Old Password"
              variant="standard"
              required
              onChange={onOldChangeHandler}
              value={oldPassword}
            />
            <TextField
              type="password"
              className={classes.dialogContent}
              id="new_password"
              label="New Password"
              variant="standard"
              required
              onChange={onNewChangeHandler}
              value={newPassword}
            />
            <TextField
              type="password"
              className={classes.dialogContent}
              id="confirm_password"
              label="Confirm New Password"
              variant="standard"
              required
              onChange={onNewConfirmChangeHandler}
              value={confirmNewPassword}
            />
          </div>
          <Button
            onClick={onSubmit}
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
  );
};
