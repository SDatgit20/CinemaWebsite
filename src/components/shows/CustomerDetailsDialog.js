import { Button, Dialog, DialogContent, Typography } from "@material-ui/core";
import React, { useState } from "react";
import styles from "./styles/customerDetailsDialogStyles"
import bookingService from "./services/bookingService";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Alert from "@material-ui/lab/Alert/Alert";
import PropTypes from "prop-types";
import moment from "moment";
import { object, string } from "yup";
import { Form, Formik } from "formik";
import FormikTextField from "../formik/FormikTextField";
import BookingConfirmation from "./BookingConfirmation";

const CustomerDetailsDialog = ({ seats, selectedShow, updateShowsRevenue, open, onClose }) => {
    const [success, setSuccess] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [bookingConfirmation, setBookingConfirmation] = useState({});
    const classes = styles();

    const handleClose = () => {
        setShowConfirmation(false);
    };


    const initialValues = {
        name: "",
        phoneNumber: ""
    };

    const formSchema = object({
        name: string("Enter name")
            .required("Name is required")
            .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid Name"),
        phoneNumber: string("Enter phone number")
            .required("Phone number is required")
            .matches(/^[6-9]\d{9}$/, "Invalid Phone Number")
    });

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const bookShow = async (values) => {
        const today = moment().format("YYYY-MM-DD");
        const payload = {
            date: today,
            showId: selectedShow.id,
            audience: {
                name: values.name,
                phoneNumber: values.phoneNumber
            },
            noOfSeats: seats
        };

        try {
            const response = await bookingService.create(payload);
            setBookingConfirmation(response.data);

            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }
            const orderId = response.data.orderId;
            var rzpId;
            const customerName = response.data.audienceName;
            const options = {
                key: "rzp_test_jqsL603YDLrd5J", // Enter the Key ID generated from the Dashboard
                name: "SkyFox Media Entertainment",
                description: "Test Transaction",
                order_id: response.data.orderId,
                handler: async function (response) {
                    const data = {
                        orderCreationId: orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature
                    };
                    rzpId = response.razorpay_payment_id;
                    console.log(data);
                    setSuccess(true);
                    setShowConfirmation(true);
                    updateShowsRevenue();
                },
                modal: {
                    ondismiss: function () {
                        if (rzpId === undefined)
                            setSuccess(false);
                    }
                },
                prefill: {
                    name: customerName,
                    contact: payload.audience.phoneNumber,
                },
                theme: {
                    color: "#61dafb",
                },
            };
            const paymentObject = new window.Razorpay(options);
            try {
                paymentObject.open();
                console.log("success");
            }
            catch (e) {
                console.log("Error " + e);
            }
        } catch {
            setSuccess(false);
        } finally {
            onClose();
        }

    };
    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth={false}>
                <Typography variant="h6" className={classes.dialogHeader}>
                    Enter Customer Details
                </Typography>
                <Formik validationSchema={formSchema} initialValues={initialValues} onSubmit={bookShow}>
                    {
                        ({ isValid }) => {
                            return (
                                <Form>
                                    <DialogContent className={classes.dialogContent}>
                                        <FormikTextField
                                            required
                                            margin="dense"
                                            inputProps={{ "data-testid": "name" }}
                                            name="name"
                                            label="Name"
                                            fullWidth
                                            autoComplete='off'
                                            autoFocus
                                        />
                                        <FormikTextField
                                            required
                                            margin="dense"
                                            inputProps={{ "data-testid": "phoneNumber" }}
                                            name="phoneNumber"
                                            label="Phone Number"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                        <div className={classes.closeCustomerDetailDialog}>
                                            <Button type="submit" disabled={!isValid} color="primary" variant="contained"
                                                className={classes.bookShowButton} data-testid="bookButton">
                                                Book
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Form>
                            );
                        }
                    }
                </Formik>
            </Dialog>

            <BookingConfirmation bookingConfirmation={bookingConfirmation} showConfirmation={showConfirmation} onClose={handleClose} />

            <Snackbar open={success === false} autoHideDuration={2000} onClose={() => setSuccess(null)}>
                <Alert severity="error">
                    Sorry, seats could not be booked!
                </Alert>
            </Snackbar>
        </>
    )
}

CustomerDetailsDialog.propTypes = {
    selectedShow: PropTypes.object.isRequired,
    seats: PropTypes.string.isRequired,
    updateShowsRevenue: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default CustomerDetailsDialog;
