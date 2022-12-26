import React, { useState, useEffect } from "react";
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import styles from "./styles/showsStyles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import useShows from "./hooks/useShows";
import {
  HEADER_DATE_FORMAT,
  INR_SYMBOL,
  QUERY_DATE_FORMAT,
} from "../../Constants";
import {
  dateFromSearchString,
  nextDateLocation,
  previousDateLocation,
} from "./services/dateService";
import ShowsRevenue from "./ShowsRevenue";
import useShowsRevenue from "./hooks/useShowsRevenue";
import SeatSelectionDialog from "./SeatSelectionDialog";
import PosterDialog from "./PosterDialog";
import { FeatureToggleProvider } from 'react-feature-toggles/lib/index';
import FeatureToggle from "react-feature-toggles/lib/FeatureToggle";


export default ({ location, history }) => {
  const classes = styles();
  const showsDate = dateFromSearchString(location.search);
  const { shows, showsLoading } = useShows(showsDate);
  const { showsRevenue, updateShowsRevenue, showsRevenueLoading } =
    useShowsRevenue(showsDate);
  const [showSelectSeatDialog, setShowSelectSeatDialog] = useState(false);
  const [showPosterDialog, setShowPosterDialog] = useState(false);

  var currentDate = new Date();
  var showDate = new Date(showsDate.format(QUERY_DATE_FORMAT));

  useEffect(() => {
    if (
      window.localStorage.getItem("rolename") === "customer" &&
      (isPreviousDayShow(currentDate, showDate) ||
        isAfterTwoDaysShow(currentDate, showDate))
    ) {
      history.push("/");
    }
  }, [showDate.getDate(), showDate.getMonth(), showDate.getFullYear()]);

  const emptyShow = {
    id: "",
    date: "",
    cost: "",
    movie: {
      id: "",
      name: "",
      duration: "",
      plot: "",
      posterUrl: "",
    },
    slot: {
      id: "",
      name: "",
      startTime: "",
      endTime: "",
    },
    bookedSeats: "",
  };
  const toggleNames = {
    SCHEDULE_MOVIE_FEATURE: 'Schedule movie feature',
    BOOK_MOVIE: 'Book Movie'
  };
  var bool=window.localStorage.getItem("scheduleMovieStatus");
  const toggles = {
    [toggleNames.SCHEDULE_MOVIE_FEATURE]: bool===null?true:(window.localStorage.getItem("scheduleMovieStatus") === 'true' ? true : false),
    [toggleNames.BOOK_MOVIE]: window.localStorage.getItem("bookMovie") === 'true' ? true : false
  };

  const scheduleMovie = () =>{
    return (
      <FeatureToggleProvider featureToggleList={toggles}>
        <FeatureToggle featureName={toggleNames.SCHEDULE_MOVIE_FEATURE}>
        <div data-testid="scheduleMovieDiv">
            <a href="/schedule" className={classes.scheduleMovieIcon}>
            <Button className={classes.scheduleMovieButton} variant="contained" color="primary">Schedule Movie</Button>
            </a>
        </div>
        </FeatureToggle>
      </FeatureToggleProvider>
    );
  }
  const [selectedShow, setSelectedShow] = useState(emptyShow);
  // const showsFormat=Object.parse(shows);

  return (
    <>
      <div className={classes.cardHeader}>
        <Typography variant="h4" className={classes.showsHeader}>
          Shows ({showsDate.format(HEADER_DATE_FORMAT)})
        </Typography>

        {window.localStorage.getItem("rolename") === "customer" ? (
          <></>
        ) : (
          <div className={classes.scheduleMovieDiv}>
            {scheduleMovie()}
          </div>
        )}
        
        {window.localStorage.getItem("rolename") === "customer" ? (
          <></>
        ) : (
          <ShowsRevenue
            showsRevenue={showsRevenue}
            showsRevenueLoading={showsRevenueLoading}
          />
        )}
      </div>
      <List className={classes.listRoot}>
        {shows.map((show) => (
          <div key={show.id} className={classes.showContainer}>
            <ListItem style={{ cursor: "pointer" }}>
              <ListItemAvatar
                classes={{ root: classes.localMoviesIcon }}
                onClick={() => {
                  setSelectedShow(show);
                  setShowPosterDialog(true);
                }}
              >
                <Avatar>
                  <img
                    src={show.movie.posterUrl}
                    alt="Poster"
                    height="40px"
                    width="40px"
                  ></img>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                className={(window.localStorage.getItem("rolename") === "customer") ? 
                (isNotPreviousSlotCustomer(show.slot.startTime, currentDate, showDate) ? classes.showContainer : classes.showContainerForPastTime) :
                (isNotPreviousSlotAdmin(show.slot.startTime, currentDate, showDate) ? classes.showContainer : classes.showContainerForPastTime)}
                primary={show.movie.name}
                onClick={() => {
                  setSelectedShow(show);
                  {
                    window.localStorage.getItem("rolename") === "customer" ? setShowSelectSeatDialog((window.localStorage.getItem("bookMovie") == 'true') && isNotPreviousSlotCustomer(show.slot.startTime, currentDate, showDate)) :
                    setShowSelectSeatDialog((window.localStorage.getItem("bookMovie") == 'true') && isNotPreviousSlotAdmin(show.slot.startTime, currentDate, showDate));
                  }
                }}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.slotTime}
                      color="textPrimary"
                    >
                      {show.slot.startTime}
                    </Typography>
                  </>
                }
              />
              <ListItemText
                primary={`${INR_SYMBOL}${show.cost}`}
                className={classes.price}
                primaryTypographyProps={{ variant: "h6", color: "secondary" }}
              />
            </ListItem>
          </div>
        ))}
      </List>
      <SeatSelectionDialog
        selectedShow={selectedShow}
        updateShowsRevenue={updateShowsRevenue}
        open={showSelectSeatDialog}
        onClose={() => setShowSelectSeatDialog(false)}
      />
      <PosterDialog
        selectedShow={selectedShow}
        open={showPosterDialog}
        onClose={() => setShowPosterDialog(false)}
      />
      <div className={classes.buttons}>
        {window.localStorage.getItem("rolename") === "customer" ? (
          <Button
            data-testid="customerPreviousButton"
            onClick={() => {
              history.push(previousDateLocation(location, showsDate));
            }}
            startIcon={<ArrowBackIcon />}
            color="primary"
            className={classes.navigationButton}
            style={{
              visibility:
                currentDate.getDate() !== showDate.getDate()
                  ? "initial"
                  : "hidden",
            }}
          >
            Previous Day
          </Button>
        ) : (
          <Button
            data-testid="adminPreviousButton"
            onClick={() => {
              history.push(previousDateLocation(location, showsDate));
            }}
            startIcon={<ArrowBackIcon />}
            color="primary"
            className={classes.navigationButton}
          >
            Previous Day
          </Button>
        )}
        {window.localStorage.getItem("rolename") === "customer" ? (
          <Button
            data-testid="customerNextButton"
            onClick={() => {
              history.push(nextDateLocation(location, showsDate));
            }}
            endIcon={<ArrowForwardIcon />}
            color="primary"
            className={classes.navigationButton}
            style={{
              visibility:
                currentDate.getDate() + 2 > showDate.getDate()
                  ? "initial"
                  : "hidden",
            }}
          >
            Next Day
          </Button>
        ) : (
          <Button
            data-testid="adminNextButton"
            onClick={() => {
              history.push(nextDateLocation(location, showsDate));
            }}
            endIcon={<ArrowForwardIcon />}
            color="primary"
            className={classes.navigationButton}
          >
            Next Day
          </Button>
        )}
      </div>
      <Backdrop className={classes.backdrop} open={showsLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export function isNotPreviousSlotAdmin(startTime, currentDate, showDate) {
  var startTimeSplit = startTime.split(":");
  var adminBookingWindow = 30 * 60 * 1000;
  var showHours =
    startTimeSplit[1][3] === "P"
      ? Number(startTimeSplit[0]) + 12
      : Number(startTimeSplit[0]);
  var showMinutes =
    Number(startTimeSplit[1][0]) * 10 + Number(startTimeSplit[1][1]);
  showDate.setHours(showHours);
  showDate.setMinutes(showMinutes);
  showDate = new Date(showDate.getTime() + adminBookingWindow);
  return !(showDate <= currentDate);
}

export function isNotPreviousSlotCustomer(startTime, currentDate, showDate){
    var startTimeSplit = startTime.split(':');
    var showHours = (startTimeSplit[1][3] === 'P') ? Number(startTimeSplit[0])+12 : Number(startTimeSplit[0]);
    var showMinutes = Number(startTimeSplit[1][0]) * 10+Number(startTimeSplit[1][1]);
    showDate.setHours(showHours);
    showDate.setMinutes(showMinutes);
    showDate=new Date(showDate.getTime());
    return !(showDate<=currentDate);
  }

export function isPreviousDayShow(currentDate, showDate) {
  if (
    showDate.getYear() < currentDate.getYear() ||
    showDate.getMonth() < currentDate.getMonth() ||
    showDate.getDate() < currentDate.getDate()
  ) {
    return true;
  }
  return false;
}

export function isAfterTwoDaysShow(currentDate, showDate) {
  var twoDayWindow = new Date();
  twoDayWindow.setDate(currentDate.getDate() + 2);
  if (
    showDate.getYear() > twoDayWindow.getYear() ||
    showDate.getMonth() > twoDayWindow.getMonth() ||
    showDate.getDate() > twoDayWindow.getDate()
  ) {
    return true;
  }
  return false;
}
