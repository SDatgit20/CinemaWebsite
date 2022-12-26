import axios from "axios";
import { urls } from "../../config/env-config";

 const payment = async (amount, customer_name, phoneNumber) => {

    const requestBody = {amount: amount,customerName: customer_name,phoneNumber: phoneNumber};
    const response = await axios.post(`${urls.service}/orders`, requestBody);
    const responseBody = response.data;
    return responseBody;
}

export default payment;

