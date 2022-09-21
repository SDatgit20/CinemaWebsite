import axios from "axios";
import { urls } from "../../config/env-config";
import { authHeader } from "../../helpers/authService";

export const scheduleMovieService = async () => {
    const tokenKey = 'skyfox_token';

    const config = {
        headers: {
            Authorization: 'Basic ' + localStorage.getItem(tokenKey)
        }
    };
    
    const response = await axios.get(`${urls.service}/movies-to-schedule`, config);
    return response.data;
}