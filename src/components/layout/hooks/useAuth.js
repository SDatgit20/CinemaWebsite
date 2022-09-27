import {useEffect, useState} from "react";
import {isLoggedIn, login, logout} from "../../../helpers/authService";

export default () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        setIsAuthenticated(isLoggedIn());
    }, []);
    
    const handleLogin = async (username, password) => {
        const userDetails = await login(username, password);
        setIsAuthenticated(true);
        window.localStorage.setItem("scheduleMovieStatus", userDetails.scheduleMovieStatus); 
        window.localStorage.setItem("bookMovie", userDetails.bookMovie); 
        window.localStorage.setItem("rolename", userDetails.roleName); 
        window.localStorage.setItem("userProfileFeature", userDetails.userProfileFeature); 
        window.localStorage.setItem("userName", userDetails.username);
            if(!window.location.hash) {
                window.location = window.location + '#loaded';
                window.location.reload();
            }
        
        return userDetails;
    };

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
        window.location.replace("/");
    };

    return {
        isAuthenticated: isAuthenticated,
        handleLogin: handleLogin,
        handleLogout: handleLogout
    };
}
