import { makeStyles } from "@material-ui/core";
export default makeStyles((theme) => ({
    page404: {
        background: "#fff",
        fontFamily: "'Arvo', serif"
    },
    ".page404  img": { width: "100%" },
    fourZeroFourBg: {
        backgroundImage:
            "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
        height: "400px",
        backgroundPosition: "center",
        backgroundRepeat:"no-repeat",
    },
    message:{
        textAlign:"center",
        fontSize: "80px"
    },
    otherText:{
        textAlign:"center",
        fontSize: "40px" ,
        paddingTop:"164px"
    },
    contantBox404: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    link404: {
        color: "white",
        padding: "10px 20px",
        background: "#556CD6;",
        margin: "20px 0",
        display: "inline-block",
        textDecoration:"none"
    },
}
)
);