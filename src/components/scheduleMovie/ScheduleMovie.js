import React, { useState, useEffect } from 'react';
import { Button, Snackbar, Select, MenuItem, FormControl, InputLabel,makeStyles } from "@material-ui/core";
import { scheduleMovieService } from './ScheduleMovieService';
import { object } from 'prop-types';


const useStyles = makeStyles(theme => ({
  FormControl :{
    minWidth : 500,
    color: 'blue'
  }
}));

export default () => {
  const [titles, setTitles] = useState([]);
  const [selectTitle, setSelectTitle] = useState('')
  const [open,setOpen] = useState(false);
  const classes = useStyles();

  const handleChange = (event) => {
    setSelectTitle(event.target.value);
    setOpen(true);
  }

  const handleClick = () =>{
    
  }

  useEffect(() => {
    fetchMoviesToSchedule();
  }, [])

  const showDropdown = () => {
    let key = 0;
    return (<>
    <FormControl>
      <InputLabel>Select a movie</InputLabel>
        <Select  className= {classes.FormControl} onChange={handleChange}>
         {titles.map(title => {
          return (
            <MenuItem value={title} key={key++}>
              {title}
            </MenuItem>
          );
        })}
      </Select>
      {
      open ?
      <>
      <p>{selectTitle}</p>
      <button onClick={handleClick}> Schedule Now</button>
      </>:
      <></>
      }
      </FormControl>
    </>)
  }

  const fetchMoviesToSchedule = async () => {
    try {
      const response = await scheduleMovieService();
      const titles = Object.values(response);
      setTitles(titles);
      console.log(titles);
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
