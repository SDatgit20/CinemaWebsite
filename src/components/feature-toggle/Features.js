import React from 'react';
import ReactDOM from 'react-dom';
import { FeatureToggleProvider } from '/Users/abishekm/Documents/Neev/neev-alpha-02-booking-frontend-repo/node_modules/react-feature-toggles/lib/index';
import FeatureToggle from "/Users/abishekm/Documents/Neev/neev-alpha-02-booking-frontend-repo/node_modules/react-feature-toggles/lib/FeatureToggle";

const toggleNames = {
  LOGIN_FEATURE: 'Login',
  // SCHEDULE_MOVIE_FEATURE: 'Schedule movie feature'
};
 
export const toggles = {
  [toggleNames.LOGIN_FEATURE]: true,
  // [toggleNames.SCHEDULE_MOVIE_FEATURE]: window.localStorage.getItem("scheduleMovieStatus") == 'true' ? true : false
};

export default toggleNames;