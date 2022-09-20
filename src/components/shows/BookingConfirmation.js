import React from 'react'
import { Dialog, DialogContent, Typography, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert/Alert";
import styles from "./styles/customerDetailsDialogStyles"

const BookingConfirmation = ({ bookingConfirmation, showConfirmation, onClose }) => {
    const classes = styles();

    return (
        <Dialog open={showConfirmation} onClose={onClose} fullWidth classes={{
            paper: classes.dialogRoot
        }}>
            <Alert severity="success">
                Seats booked successfully!
            </Alert>
            <Typography variant="h6" className={classes.dialogHeader}>
                Booking Confirmation
            </Typography>
            <DialogContent>
                <Typography variant="body1" display="block" gutterBottom>
                    Booking id : {bookingConfirmation.id}
                </Typography>
                <Typography variant="body1" display="block" gutterBottom>
                    Show Date: {bookingConfirmation.showDate}
                </Typography>
                <Typography variant="body1" display="block" gutterBottom>
                    Show start time: {bookingConfirmation.startTime}
                </Typography>
                <Typography variant="body1" display="block" gutterBottom>
                    Customer Name: {bookingConfirmation.audienceName}
                </Typography>
                <Typography variant="body1" display="block" gutterBottom>
                    Amount Paid: {bookingConfirmation.amountPaid}
                </Typography>
                <Typography variant="body1" display="block" gutterBottom>
                    Number of seats booked: {bookingConfirmation.noOfSeats}
                </Typography>
                <div className={classes.closeBookingConfirmation}>
                    <Button type="button" color="primary" variant="contained"
                        className={classes.bookShowButton} data-testid="bookButton" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default BookingConfirmation;
