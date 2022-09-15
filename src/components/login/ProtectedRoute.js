// noinspection ES6CheckImport
import {Redirect, Route} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

const ProtectedRoute = ({component: Component, isAuthenticated, ...rest}) => {
    

    const renderedComponent = (props) => {
        const {location} = props;
        return isAuthenticated
            ? (<Component {...props}/>)
            : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {
                            from: location
                        }
                    }}
                />
            );
    };

    return (
        <Route
            {...rest}
            component={renderedComponent}
        />
    );
}

ProtectedRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default ProtectedRoute;
