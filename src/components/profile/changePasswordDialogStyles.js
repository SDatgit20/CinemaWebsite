import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({passwordNotMatchErrorMessage:{
        display: "flex",
    },
        dialogRoot: {
            overflow: "hidden",
            minHeight: "30vh",
            maxHeight: "80vh"
        },
        container: {
            display: "flex",
            flexDirection: "column"
        },
        dialogHeader: {
            fontWeight: "bold",
            padding: "10px 0px 20px 10px"
        },
        dialogContent: {
            // display: "flex",
            // flexDirection: "row",
            marginBottom:"10px"
        },
        dialogMain: {
            display: "flex",
            padding: "10px 10px 10px 10px",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: "98%",
            maxWidth: "98%",
        },
        dialogBottom: {
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",

            padding: "20px 0px 0px 0px"
        },
        dialogButton: {
            width: "20%",
            margin: "5px 5px 10px 10px"
    },
    dialogTitle: {
        padding: "5px",
        textAlign: "center",
        color: "black",
        width: "100%"
    },
    dialogHeader: {
        display: "flex",
        justifyContent: "space-between",
    },
    dialogHeaderText: {
        fontWeight: "bold",
        padding: "10px 0px 2px 10px"
    },
    submitButton: {
        width: "20%",
        margin: "16px 0px 15px 230px"
        }
    })
);
