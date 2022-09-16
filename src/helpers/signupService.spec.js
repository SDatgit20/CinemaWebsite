import axios from "axios";
import { when } from "jest-when";
import { act } from "react-dom/test-utils";
import { urls } from "../config/env-config";
import { signup } from "./signupService";

jest.mock("axios", () => ({
    post: jest.fn(),
}));

describe("Mocking Post API", () => {

    const username = "UserName@123";
    const fullName = "Latha"
    const email = "dgmail.com"
    const phoneNumber = "9999999999"
    const password = "Bandaru@123A";
    const confirmPassword = "Bandaru@123A";

    it("should post user details to backend", async () => {

        const requestBody = { username, fullName, email, phoneNumber, password, confirmPassword };
        axios.post.mockResolvedValueOnce(requestBody);

        const actualMessage = await signup(username, fullName, email, phoneNumber, password, confirmPassword);

        expect(axios.post).toHaveBeenCalledWith(`${urls.service}/sign-up`, requestBody);
        expect(axios.post).toBeCalledTimes(1);
        console.log(actualMessage);
    });

});
