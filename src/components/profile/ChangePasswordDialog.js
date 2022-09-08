import React , {useState}from 'react';
import {Avatar, Button, Dialog, Typography, TextField, Input} from "@material-ui/core";
import styles from "./changePasswordDialogStyles";
import { ValidationError } from 'yup';
import { logout } from '../../helpers/authService';


export default ({open, onClose, isAuthenticated}) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    
    const classes = styles();
    const handleClose = () => {
        onClose();
    };
    const onOldChangeHandler = event => {
        setOldPassword(event.target.value);
    };
    const onNewChangeHandler = event => {
        setNewPassword(event.target.value);
    };
    const onNewConfirmChangeHandler = event => {
        setConfirmNewPassword(event.target.value);
    };

    const validation = () => {
        var minMaxLength = /^[\s\S]{8,64}$/,
        upper = /[A-Z]/,
        number = /[0-9]/,
        special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
        if(minMaxLength.test(newPassword) && upper.test(newPassword) && number.test(newPassword) && special.test(newPassword)) logout();
    };
    
    return (
        
        <Dialog open={open} onClose={handleClose} fullWidth classes={{
            paper: classes.dialogRoot
        }}>
            <div className={classes.container}>
           <Typography variant="h6" className={classes.dialogHeader}>Change Password</Typography>
           <form action='/'>
                    <div className={classes.dialogMain}>   
                    <TextField className={classes.dialogContent} id="old_password" 
                    label="Old Password" variant="standard" required="true" onChange={onOldChangeHandler} value={oldPassword}/>
                    <TextField className={classes.dialogContent} id="new_password" 
                    label="New Password" variant="standard" required="true" onChange={onNewChangeHandler} value={newPassword}/>
                    <TextField className={classes.dialogContent} id="confirm_password" 
                    label="Confirm New Password" variant="standard" required="true" onChange={onNewConfirmChangeHandler} value={confirmNewPassword}/>
                      
                    </div>
                    <Button onSubmit={validation} type="submit" variant="contained" color="primary" className={classes.dialogButton}>Submit</Button>
                    </form>
            </div>
            
        </Dialog>
        
    )
};
