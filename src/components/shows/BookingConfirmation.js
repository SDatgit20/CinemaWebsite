import React from 'react'
import { Dialog, DialogContent, Typography, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert/Alert";
import styles from "./styles/customerDetailsDialogStyles";
import QRCode from "react-qr-code";
import { PDFDownloadLink } from '@react-pdf/renderer';
import TicketPdf from './TicketPdf';


const BookingConfirmation = ({ bookingConfirmation, showConfirmation, onClose }) => {
    const classes = styles();

    const fileName = "Ticket.pdf";

    var bookingQrResponse = "Booking summary" + '\n' +
        "Booking id:" + bookingConfirmation.id + '\n' +
        "Show Date:" + bookingConfirmation.showDate + '\n' +
        "Show start time:" + bookingConfirmation.startTime + '\n' +
        "Customer Name:" + bookingConfirmation.audienceName + '\n' +
        "Amount Paid:" + bookingConfirmation.amountPaid + '\n' +
        "Number of seats booked:" + bookingConfirmation.noOfSeats;
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
                <QRCode value={bookingQrResponse}
                // <>
                /* <Typography variant="body1" display="block" gutterBottom>
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
                </Typography></>} */
                />
                <div className={classes.closeBookingConfirmation}>
                        <PDFDownloadLink
                            document={<TicketPdf details={bookingConfirmation}/>}
                            fileName={fileName}
                            style={{
                                textDecoration: "none",
                                padding: "10px",
                                color: "white",
                                backgroundColor: "#556cd6",
                                paddingRight: "10px",
                                marginTop: "16px",
                                marginRight: "48px",
                                paddingLeft: "10px",
                                paddingTop: "9px",
                                borderRadius:"4px",
                                paddingBottom: "0px",
                            }
                              }
                        >
                            Download ticket
                        </PDFDownloadLink>
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
