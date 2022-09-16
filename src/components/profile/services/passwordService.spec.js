import axios from "axios";
import { when } from "jest-when";
import { urls } from "../../../config/env-config";
import { onChangePassword } from "./passwordService";

jest.mock("axios", () => ({
    put: jest.fn(),
}));

describe("Basic logic", () => {

    const testOldPassword = "testOldPassword";
    const testNewPassword = "testNewPassword";
    const testConfirmPassword = "testConfirmPassword"
    const passwordValue = {
        oldPassword: testOldPassword,
        newpassword: testNewPassword,
        confirmPassword: testConfirmPassword
    };

    beforeAll(() => {
        window.btoa = (data) => data;
    });

    it("should set auth header if logged in successfuly", async () => {
        const testConfig = {
            headers: {
                Authorization: 'Basic' + localStorage.getItem('skyfox_token')
            }
        };
        when(axios.put)
            .calledWith(`${urls.service}/login`, testConfig)
            .mockResolvedValue({ data: "response" });

        const actualPasswordDetails = await onChangePassword(passwordValue);
    });
    afterEach(() => {
        localStorage.removeItem("skyfox_token");
    });
})