import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        dialogRoot: {
            overflow: "hidden",
        },
        dialogTitle: {
            padding: "25px",
            textAlign:"center",
            color:"black",
            width:"100%"
        },
        dialogHeader: {
            display:"flex",
            justifyContent:"space-between",
        },
        dialogContent: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom:"20px",
        },
        closeIcon:{
            color:"black"
        },
        titleText:{
            fontFamily:"Helvetica",
            fontWeight:"bold"
        },
    })
);
