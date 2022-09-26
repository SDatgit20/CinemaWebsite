import { blue } from "@material-ui/core/colors";
import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        cardHeader: {
            display: "flex",
            justifyContent: "space-between"
        },
        showDetails:{
            width:"70%"
        },
        showContainer: {
            "& :hover": {
                backgroundColor: "#f9f8fd",
            }
        },
        showContainerForPastTime: {
            PointerEvent:"none",
            opacity:"0.5"
        },

        localMoviesIcon: {
            "& :hover": {
                backgroundColor: "#bdbdbd",
            }
        },
        showsHeader: {
            padding: "15px 0 0 15px",
            display: "flex",
            fontWeight: "bold",
            alignSelf: "center"
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        listRoot: {
            width: '100%',
            backgroundColor: theme.palette.background.paper
        },
        price: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        slotTime: {
            color: theme.palette.primary.main,
            fontWeight: "bold",
            width:"20%"
        },
        buttons: {
            display: "flex",
            justifyContent: 'space-between'
        },
        navigationButton: {
            margin: "20px"
        },
        paper: {
            width: '200',
            height: '500',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        scheduleMovieIcon:{
            display: 'flex',
            textDecoration: 'none',
            alignItems:"right",
            fontSize: '1.25em'
        },
        scheduleMovieButton: {
            color: "white",
            backgroundColor: theme.palette.primary.main,
            display: "flex",
            alignItems: "right"
        },
        scheduleMovieDiv: {
            marginTop: "16.5px",
            width: "1000px",
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "20px",
            marginLeft: "20px"
        }
    })
);
