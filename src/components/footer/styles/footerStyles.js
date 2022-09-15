import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
        footer: {
            position: "fixed",
            left: "0",
            bottom: "0",
            width: "100%",
            backgroundColor: "#556cd6",
            color: "white",
            height:"8%",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
         },

         footerText:{
            fontSize:"1.0rem",
         },
         email:{
            color:"white"
         }
    })
);
