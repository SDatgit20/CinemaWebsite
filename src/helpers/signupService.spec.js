import axios from "axios";
import { urls } from "../config/env-config";
import { signup } from "./signupService";

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock("axios", () => ({
    post: jest.fn(),
}));

describe("Mocking Post API", () => {

    it("should post user details and to receive response as signed up successfully", async () => {

        const username = "Username@123"
        const fullName = "user"
        const email = "apple@gmail.com"
        const phoneNumber = "9999999998"
        const password = "apple@123"
        const confirmPassword = "apple@123"

        const requestBody = { username, fullName, email, phoneNumber, password, confirmPassword };
        axios.post.mockResolvedValueOnce({
            data:
                { response: "Signed up successfully!!!" }
        });
        const actualResponse = await signup(username, fullName, email, phoneNumber, password, confirmPassword);
        const expectedResponse = { response: "Signed up successfully!!!" };

        expect(axios.post).toHaveBeenCalledWith(`${urls.service}/sign-up`, requestBody);
        expect(axios.post).toBeCalledTimes(1);
        expect(actualResponse).toEqual(expectedResponse);
    });


    it("should post user details and to receive response as username already exists", async () => {

        const username = "Username@123"
        const fullName = "user1"
        const email = "redapple@gmail.com"
        const phoneNumber = "8999999998"
        const password = "redapple@123"
        const confirmPassword = "redapple@123"

        const requestBody = { username, fullName, email, phoneNumber, password, confirmPassword };
        axios.post.mockResolvedValueOnce({
            data:
                { response: "Username already exists" }
        });
        const actualResponse = await signup(username, fullName, email, phoneNumber, password, confirmPassword);
        const expectedResponse = { response: "Username already exists" };

        expect(axios.post).toHaveBeenCalledWith(`${urls.service}/sign-up`, requestBody);
        expect(axios.post).toBeCalledTimes(1);
        expect(actualResponse).toEqual(expectedResponse);
    });

});
