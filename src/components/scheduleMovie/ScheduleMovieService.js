import axios from "axios";
import { urls } from "../../config/env-config";
import Moment from 'moment';

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

export const addDateAndSlot = async (date, slotTime, movieId) => {
    const tokenKey = 'skyfox_token';

    const config = {
        headers: {
            Authorization: 'Basic ' + localStorage.getItem(tokenKey)
        }
    };

    const requestBody = {
        date: Moment(date, 'DD/MM/YY').format('YYYY-MM-DD'),
        movieId: movieId,
        slotTime: Moment(slotTime, 'hh:mm A').format('HH:mm:ss')
    };
    
    const response = await axios.post(`${urls.service}/schedule-movie-slot`, requestBody, config);
    return response.data;
}