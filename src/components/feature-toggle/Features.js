import React from 'react';
import ReactDOM from 'react-dom';
import { FeatureToggleProvider } from '/Users/abishekm/Documents/Neev/neev-alpha-02-booking-frontend-repo/node_modules/react-feature-toggles/lib/index';
import FeatureToggle from "/Users/abishekm/Documents/Neev/neev-alpha-02-booking-frontend-repo/node_modules/react-feature-toggles/lib/FeatureToggle";

const toggleNames = {
  LOGIN_FEATURE: 'Login',
};
 
export const toggles = {
  [toggleNames.LOGIN_FEATURE]: true,
};

export default toggleNames;