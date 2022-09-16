import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) =>
({
    button: {
        width: "20%",
        marginLeft: "40%",
        marginTop: "2%"
    },
    signupContainer: {
        display: "flex",
        justifyContent: "center",
        padding: "5% 1% 10% 1%",
    },
    signupForm: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "30%"
    },
    failureText: {
        color: "red"
    },
    content: {
        marginBottom: "10px"
    },
    title: {
        color: "#556cd6"
    }
})
);