import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
        headerLink: {
            color: theme.palette.primary.contrastText,
            display: 'flex',
            justifyContent: "flex-start",
            textDecoration: 'none',
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
            padding: "0 4em"
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
            color: theme.palette.primary.contrastText
        },
        signupIcon:{
            color: theme.palette.primary.contrastText,
            display: 'flex',
            justifyContent: "flex-start",
            textDecoration: 'none',
            cursor: "pointer",
            fontSize: '1.25em'
        }
    })
);
