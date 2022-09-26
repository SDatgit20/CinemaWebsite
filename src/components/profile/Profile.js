import React, {useState} from "react";
import {Button} from "@material-ui/core";
import ChangePasswordDialog from './ChangePasswordDialog';
import styles from "./changePasswordDialogStyles";
import { FeatureToggleProvider } from 'react-feature-toggles/lib/index';
import FeatureToggle from "react-feature-toggles/lib/FeatureToggle";
import PageNotFound from "../feature-toggle/PageNotFound";

export default ({isAuthenticated}) => {
    const classes = styles();
    const [changePasswordDialog, setChangePasswordDialog] = useState(false);

    const toggleNames = {
        USERPROFILE_FEATURE: 'User profile feature'
    };
      
    const toggles = {
        [toggleNames.USERPROFILE_FEATURE]: window.localStorage.getItem("userProfileFeature") === 'true' ? true : false
    };

    return (
        <FeatureToggleProvider featureToggleList={toggles}>
        <FeatureToggle featureName={toggleNames.USERPROFILE_FEATURE}>
        <div>
            <div className={classes.userName}>
            <h1>User Profile</h1>
            <h3>Username: {window.localStorage.getItem("userName")}</h3>
            
            </div>
            <Button data-testid="button" className={classes.dialogButton} variant="contained" color="primary" onClick={() => {
                                setChangePasswordDialog(true);
                            }}>CHANGE PASSWORD</Button>
            <ChangePasswordDialog open={changePasswordDialog} onClose={() => setChangePasswordDialog(false)} isAuthenticated={isAuthenticated}/>
        </div>
        </FeatureToggle>
        <FeatureToggle featureName={toggleNames.USERPROFILE_FEATURE} showOnlyWhenDisabled>
            <PageNotFound></PageNotFound>
        </FeatureToggle>
        </FeatureToggleProvider>
    )
};
