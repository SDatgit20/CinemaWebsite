import React from "react";
import { Typography } from "@material-ui/core";
import styles from "./styles/footerStyles";

const Footer = () => {
    const classes = styles();


    return (
        
        <div className={classes.footer}>
            <Typography variant="h5">
                <pre className={classes.footerText}>Contact us now: <a href="mailto:helpdesk@skyfox.com" className={classes.email}>helpdesk@skyfox.com</a></pre>
            </Typography>
        </div>
    );
};


export default Footer;
