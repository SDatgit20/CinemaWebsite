import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import EmailIcon from '@material-ui/icons/Email';
import styles from "./styles/footerStyles";

const Footer = () => {
    const classes = styles();


    return (
        
        <div className={classes.footer}>
            <Typography className={classes.footerText} variant="h5">
                <pre>Contact us now: <a href="mailto:Skyfox@gmail.com" className={classes.email}>Skyfox@gmail.com</a></pre>
            </Typography>
        </div>
    );
};


export default Footer;
