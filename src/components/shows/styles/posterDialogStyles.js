import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        dialogRoot: {
            overflow: "hidden",
            maxWidth:"400px"
        },
        moviePicture: {
            width:"250px",
            height:"350px"
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
            fontWeight:"bold",
            paddingLeft:"45px"
        },
    })
);
