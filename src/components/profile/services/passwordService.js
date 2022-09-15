import axios from "axios";
import { urls } from "../../../config/env-config";

const tokenKey = 'skyfox_token';

export const onChangePassword = async (password) => {

    const config = {
        headers: {
            Authorization: 'Basic ' + localStorage.getItem(tokenKey)
        }
    };
    const { oldPassword, newPassword, confirmNewPassword } = password;
    const requestBody = { oldPassword: oldPassword, newPassword: newPassword, confirmNewPassword: confirmNewPassword }
    const response = await axios.put(`${urls.service}/login/changePassword`, requestBody, config);

    return response;

};
