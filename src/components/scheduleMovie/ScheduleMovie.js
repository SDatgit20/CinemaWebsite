import React, { useState, useEffect } from 'react';
import { Button, Snackbar, Select, MenuItem, FormControl, InputLabel, makeStyles, TextField, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from "@material-ui/core";
import { addDateAndSlot, scheduleMovieService } from './ScheduleMovieService';
import { useFormik } from "formik";
import MuiAlert from "@material-ui/lab/Alert";
import Moment from 'moment';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from 'react-router-dom';
import styles from './styles/scheduleMovieStyles';

function Alert(props) {
  return <MuiAlert variant="filled" {...props} />;
}

export default () => {
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [movieMap, setMovieMap] = useState([]);
  const [openMovieBox, setOpenMovieBox] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [response, setResponse] = useState('');
  const [dialogBox, setDialogBox] = useState(false);
  const history = useHistory();
  const classes = styles();

  const formik = useFormik({
    initialValues: {
      date: "",
      slot: ""
    },

    validate: () => {

      const errors = {};
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](22)$/;
      const slotRegex = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/gm;

      const date = Moment(formik.values.date, 'DD/MM/YY').format('YYYY-MM-DD');
      const slotTime = Moment(formik.values.slot, 'hh:mm A').format('HH:mm:ss');
      const now = date + slotTime;


      if (!formik.values.date || (/^\s*$/.test(formik.values.date))) {
        errors.date = "Please enter date"
      }
      else if (!(dateRegex.test(formik.values.date))) {
        errors.date = "Please enter a valid date DD/MM/YY"
      }
      else if(!Moment().isSameOrBefore(date, 'D'))
      errors.date = "Movie cannot be scheduled for past dates";

      if (!formik.values.slot || (/^\s*$/.test(formik.values.slot))) {
        errors.slot = "Please enter slot"
      }
      else if (!(slotRegex.test(formik.values.slot))) {
        errors.slot = "Please enter a valid time slot HH:MM AM/PM/am/pm"
      }
      else if(Moment().diff(Moment(now, "YYYY-MM-DD HH:mm:ss")) > 0)
        errors.slot = "Movie cannot be scheduled for past time";

      return errors;
    },
  });

  const handleChange = (event, key) => {
    setSelectedMovieId(key.key);
    setSelectedTitle(event.target.value);
    setOpenMovieBox(true);
  }

  const handleClose = () => {
    setOpenErrorSnackbar(false);
    setOpenSuccessSnackbar(false);
  }

  const addMovieSlot = async () => {
    if (!formik.values.date || !formik.values.slot) {
      setOpenErrorSnackbar(true);
      setResponse("Please enter the date and timeslot");
      return;
    }
    if (formik.errors.date) {
      setOpenErrorSnackbar(true);
      setResponse("Please enter a valid date");
      return;
    }
    if (formik.errors.slot) {
      setOpenErrorSnackbar(true);
      setResponse("Please enter a valid timeslot");
      return;
    }

    try {
      const response = await addDateAndSlot(formik.values.date, formik.values.slot, selectedMovieId);
      // setOpenSuccessSnackbar(true);
      setResponse(response);
      setDialogBox(true);
      formik.resetForm({ values: '' })
      
    }
    catch (err) {
      if (err.response && err.response.status === 400) {
        setOpenErrorSnackbar(true);
        setResponse(err.response.data);
      }
    }
  }
  
  const closeDialogBox = () => {
    setDialogBox(false);
  };

  useEffect(() => {
    fetchMoviesToSchedule();
  }, [])

  const showDropdown = () => {
    // let key = 0;
    return (<>
      <FormControl>
        <InputLabel>Select a movie</InputLabel>
        <Select className={classes.FormControl} onChange={handleChange}>
          {movieMap.map(([id, title]) => {
            return (
              <MenuItem value={title} key={id}>
                {title}
              </MenuItem>
            );
          })}
        </Select>
        {
          openMovieBox ?
            <>
              <div className={classes.movieRow}>
                <h2 className={classes.movieRowElement}>{selectedTitle}</h2>

                <div className={classes.movieRowElement}>
                  <TextField name="date" label="Date" value={formik.values.date} onChange={formik.handleChange} onBlur={formik.handleBlur} required="true" />
                  {formik.touched.date && formik.errors.date ? <div className={classes.failureText}>{formik.errors.date}</div> : <div>dd/mm/yy | example: 21/09/22</div>}
                </div>

                <div className={classes.movieRowElement}>
                  <TextField name="slot" label="Time Slot" value={formik.values.slot} onChange={formik.handleChange} onBlur={formik.handleBlur} required="true" />
                  {formik.touched.slot && formik.errors.slot ? <div className={classes.failureText}>{formik.errors.slot}</div> : <div>example: 11:00 PM</div>}
                </div>

                <Button className={classes.okButton} onClick={addMovieSlot} variant="contained" color="primary">
                  OK
                </Button>

                <Dialog open={dialogBox} onClose={closeDialogBox}>
                  <DialogContent>
                    <DialogContentText>
                      <h2>Movie Scheduled Successfully</h2>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={closeDialogBox} color="primary" autoFocus>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>

              </div>

              <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity="success">{response} - <b>{selectedTitle}</b></Alert>
              </Snackbar>

              <Snackbar open={openErrorSnackbar} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity="error">{response}</Alert>
              </Snackbar>
            </> :
            <></>
        }
        
      </FormControl>
      <div>
          <Button className={classes.goBackButton} onClick={() => {
              history.push("/shows");
            }}
            startIcon={<ArrowBackIcon />}
            color="primary">
            Go Back
          </Button>
        </div>
    </>)
  }

  const fetchMoviesToSchedule = async () => {
    try {
      const response = await scheduleMovieService();
      const movieMap = Object.entries(response);

      setMovieMap(movieMap);
    }
    catch (err) {
      if (err.response && err.response.status === 400) {
        console.log(err.response.data);
      }
    }
  }

  return (
    <div className="main">
      {showDropdown()}
    </div>
  );
}
