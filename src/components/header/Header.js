import React from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import MovieIcon from '@material-ui/icons/Movie';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';
import styles from "./styles/headerStyles";
import PropTypes from "prop-types";
import fetchAll from "../shows/services/showsService"
const Header = ({onLogout, isAuthenticated}) => {
    const classes = styles();

    const logoutSection = () => {
        if (isAuthenticated) {
            return (
                <div className={classes.logoutDiv}>
                    <div className={classes.personDiv}>
                        <a href="/profile">
                            <div className={classes.personIcon}>
                                <Person />
                            </div>
                        </a>
                    </div>
                    <div onClick={onLogout} className={classes.logoutLink}>
                    <ExitToAppIcon/>
                    <Typography className={classes.headerLogo} variant="body1">
                        Logout
                    </Typography>
                    </div>
                </div>
            );
        }
    };
    const signupSection = () => {
        if (!isAuthenticated) {
            return (
                <div>
                    <a href="/signup" className={classes.signupIcon}>
                        Signup
                    </a>
                </div>
            );
        }
    };

    return (
        <AppBar position={"sticky"}>
            <Toolbar className={classes.toolbar}>
                <a href="/" className={classes.headerLink}>
                    <MovieIcon className={classes.cinemaLogoIcon}/>
                    <Typography className={classes.headerLogo} variant="h5">
                        SkyFox Cinema
                    </Typography>
                </a>
                {signupSection()}
                {logoutSection()}

            </Toolbar>

        </AppBar>
    );
};

Header.propTypes = {
    onLogout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default Header;
