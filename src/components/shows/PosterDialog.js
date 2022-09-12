import { Dialog, Typography} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from "react";
import styles from "./styles/posterDialogStyles"
import PropTypes from "prop-types";

const PosterDialog = ({selectedShow, open, onClose}) => {
    const classes = styles();

    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth classes={{
                paper: classes.dialogRoot
            }}>
                <div className={classes.container}>
                    <div className={classes.dialogHeader}>
                        <div className={classes.dialogTitle}>
                          <Typography variant="h6" className={classes.titleText}>
                        {selectedShow.movie.name}
                        </Typography>
                        </div>
                        <div className={classes.closeIcon}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                        </div>
                    </div>
                    <div className={classes.dialogContent}>
                        <div className={classes.moviePicture}>
                            <img src={selectedShow.movie.posterUrl} alt="Poster"></img>  
                        </div>   
                    </div>
                </div>
            </Dialog>
        </>
    );
}

PosterDialog.propTypes = {
    selectedShow: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default PosterDialog;
