import {Avatar, Button, Dialog, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import styles from "./styles/seatSelectionDialogStyles"
import CustomerDetailsDialog from "./CustomerDetailsDialog";
import {INR_SYMBOL} from "../../Constants";
import PropTypes from "prop-types";

const SeatSelectionDialog = ({selectedShow, updateShowsRevenue, open, onClose}) => {
    const [showCustomerDetails, setShowCustomerDetails] = useState(false);
    const [seats, setSeats] = useState(1);
    const [invalidSeatNumber, setInvalidSeatNumber] = useState(false);
    const [isSeatAvailable, setIsSeatAvailable] = useState(true);
    let availableSeats = 100 - selectedShow.bookedSeats
   
    const classes = styles();

    useEffect(() => {
        

        if (seats > 20 || seats <= 0) {
            setInvalidSeatNumber(true);
        }
        else {
            setInvalidSeatNumber(false);
            if (seats > availableSeats) {
                setIsSeatAvailable(false);
            }
            else {
                setIsSeatAvailable(true)
            }
           

        }
    }, [seats]);

    
    const handleClose = () => {
        setSeats("1");
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth classes={{
                paper: classes.dialogRoot
            }}>
                <div className={classes.container}>
                <div style={{ display: "inline" }}>
                        <div> 
                        <Typography variant="h6" className={classes.alertMessage} >
                            { availableSeats <= 10 || availableSeats<1 ? <span  >Hurry up ! Only {availableSeats} seats Available</span> : ""}
                        </Typography>
                        <Typography variant="h6" className={classes.dialogHeader}>
                            Select Seats
                        </Typography>
                        </div>
                    </div>
                    <div className={classes.dialogContent}>
                        <div className={classes.moviePicture}>
                            <Avatar>
                            <img src={selectedShow.movie.posterUrl} alt="Poster" height="40px" width="40px"></img>  
                            </Avatar>
                        </div>
                        <div className={classes.dialogMain}>
                            <Typography className={classes.movieMarquee} color="primary">
                                {selectedShow.movie.name}
                            </Typography>
                            <Typography variant="body2">
                                {selectedShow.movie.plot}
                            </Typography>
                            <Typography variant="subtitle2" color="primary" className={classes.movieMarquee}>
                                {selectedShow.movie.duration}
                            </Typography>
                            <div className={classes.dialogBottom}>
                                <div className={classes.seatsAndAmount}>
                                    <div className={classes.seatsSelector}>
                                        <TextField type="number" label="Seats" defaultValue="1"
                                                   inputProps={{step: "1", min: "1", max: "20"}}
                                            onChange={(e) => setSeats(e.target.value)} />
                                    </div>
                                    <Typography variant="subtitle1" color="secondary">
                                        {`${INR_SYMBOL}${(selectedShow.cost * seats).toFixed(2)}`}
                                    </Typography>
                                </div>
                                <Button variant="contained" color="primary"
                                    disabled={invalidSeatNumber || !isSeatAvailable}
                                        onClick={() => {
                                            setShowCustomerDetails(true);
                                            onClose();
                                        }}
                                        className={classes.dialogButton}>
                                    Next
                                </Button>
                            </div>
                            <div>
                            <span
                                    style={

                                        { color: "red", padding: ".2rem" } 
                                    }
                                >
                                    {invalidSeatNumber === true ? (seats <= 0 ? <p>Book atleast 1 seat</p> : <p>Seat number must be less then 20</p>) :

                                        (isSeatAvailable ? "" : <p>Only {availableSeats} seats Available</p>)}



                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
            <CustomerDetailsDialog seats={seats} selectedShow={selectedShow} updateShowsRevenue={updateShowsRevenue}
                                   open={showCustomerDetails} onClose={() => {
                handleClose();
                setShowCustomerDetails(false)
            }}/>
        </>
    );
}

SeatSelectionDialog.propTypes = {
    selectedShow: PropTypes.object.isRequired,
    updateShowsRevenue: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default SeatSelectionDialog;
