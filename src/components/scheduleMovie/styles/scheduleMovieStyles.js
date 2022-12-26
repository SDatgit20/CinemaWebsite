import { makeStyles } from "@material-ui/core/styles";

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
    padding: "20px",
    flexFlow:"wrap",
  },
  movieRowElement: {
    padding: "20px"
  },
  hide: {
    display: "none",
  },
  inp: {
    marginLeft: "20px",
    marginTop: "20px",
    height: "48px",
    width:"77vw",
    fontFamily:"Helvetica",
    fontWeight: "400",
    fontSize: "1rem",
    paddingLeft: "15px",
  },

  dropdown: {
    marginLeft: "20px",
    marginTop: "20px",
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