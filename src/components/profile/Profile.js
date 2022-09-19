import React, {useState} from "react";
import {Button, Dialog, Typography} from "@material-ui/core";
import ChangePasswordDialog from './ChangePasswordDialog';
import styles from "./changePasswordDialogStyles";

export default ({isAuthenticated}) => {
    const classes = styles();
    const [changePasswordDialog, setChangePasswordDialog] = useState(false);
    return (
        <div>
            <div className={classes.userName}>
            <h1>User Profile</h1>
            <h3>Username</h3>
            </div>
            <Button data-testid="button" className={classes.dialogButton} variant="contained" color="primary" onClick={() => {
                                setChangePasswordDialog(true);
                            }}>CHANGE PASSWORD</Button>
            <ChangePasswordDialog open={changePasswordDialog} onClose={() => setChangePasswordDialog(false)} isAuthenticated={isAuthenticated}/>
        </div>
    )
};
