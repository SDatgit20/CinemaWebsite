import {useEffect, useState} from "react";
import {changePassword} from "../../helpers/authService";

export default () => {
    const handleChangePassword = async () => {
        const userDetails = await changePassword(password);
        return userDetails;
    };

    return {
        handleChangePassword: handleChangePassword,
        
    };
}
