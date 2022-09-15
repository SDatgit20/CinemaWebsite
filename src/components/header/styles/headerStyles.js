import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
        headerLink: {
            color: theme.palette.primary.contrastText,
            display: 'flex',
            justifyContent: "flex-start",
            textDecoration: 'none'
        },
        logoutLink: {
            display: 'flex',
            justifyContent: "flex-start",
            alignItems: "center",
            cursor: "pointer"
        },
        cinemaLogoIcon: {
            fontSize: '2.25em'
        },
        headerLogo: {
            marginLeft: '0.15em'
        },
        toolbar: {
            display: 'flex',
            justifyContent: "space-between",
            padding: "0 4em",
            margin: "0px, 0px, 0px, 300px",
        },
        cartButton: {
            color: "white",
            padding: "10px"
        },
        personIcon:{
            display: "flex",
            flexDirection:"row",
            justifyContent: "flex-start",
            alignItems: "center",
            cursor: "pointer",
            margin: "0px, 100px, 0px, 10px",
            color: theme.palette.primary.contrastText
    },
    logoutDiv: {
        display: 'flex',
        justifyContent: "space-between",
        width: "8%"
    }
    })
);
