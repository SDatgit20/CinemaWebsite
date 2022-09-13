import axios from "axios";
import { urls } from "../config/env-config";

export const signup = async (full_name, email, contact_number, password, confirm_password) => {

    const requestBody = { email: email, fullName: full_name, phoneNumber: contact_number, password: password, confirmPassword: confirm_password };
    const response = await axios.post(`${urls.service}/sign-up`, requestBody);
    const responseBody = response.data;
    return responseBody;
}

