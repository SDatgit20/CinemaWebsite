import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ChangePasswordDialog from "./ChangePasswordDialog";
import styles from "./changePasswordDialogStyles";

export default ({ isAuthenticated }) => {
  const classes = styles();
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);
  return (
    <div>
      <h1>User Profile</h1>
      <h3>Username</h3>
      <h4>Seed-user-2</h4>
      <Button
        className={classes.dialogButton}
        variant="contained"
        color="primary"
        onClick={() => {
          setChangePasswordDialog(true);
        }}
      >
        CHANGE PASSWORD
      </Button>
      <ChangePasswordDialog
        open={changePasswordDialog}
        onClose={() => setChangePasswordDialog(false)}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};
