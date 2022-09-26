import {makeStyles} from "@material-ui/core/styles";

export default makeStyles(theme => ({
    FormControl: {
      minWidth: 500,
      color: 'blue'
    },
    failureText: {
      color: "red"
    },
    movieRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "20px"
    },
    movieRowElement: {
      padding: "20px"
    },
    okButton: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      width: "10px",
      height: "40px",
      marginTop: "30px",
      marginLeft: "30px"
    },
    goBackButton: {
      margin: "20px",
      marginTop: "50px"
    }
  }));