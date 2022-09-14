import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        dialogHeader: {
            padding: "10px 20px 0px 20px",
            fontWeight: "bold"
        },
        dialogContent: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            "&:first-child": {
                padding: "5px 20px"
            }
        },
        bookShowButton: {
            margin: "16px 0px 15px 0px"
        },
        closeBookingConfirmation:{
            display:"flex",
            justifyContent:"center"
        },
        closeCustomerDetailDialog:{
            paddingLeft:"70px"
        }
    })
);
