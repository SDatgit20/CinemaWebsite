import React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import ChangePasswordDialog from "./ChangePasswordDialog";
import Profile from "./Profile"
import { render, shallow } from "enzyme";
import { when } from "jest-when";
import { Button, Dialog } from "@material-ui/core";
import { fireEvent } from "@testing-library/react";

describe("Basic rendering and functionality", () => {
    const open = true;
    const onClose = jest.fn();
    const testOldPassword = "testOldPassword";
    const testNewPassword = "testNewPassword";
    const testConfirmPassword = "testConfirmPassword"
    const passwordValue = {
        oldPassword: testOldPassword,
        newpassword: testNewPassword,
        confirmPassword: testConfirmPassword
    };

    it("Should render the dialog with submit button", () => {
        const changePasswordDialogComponent = shallow(<ChangePasswordDialog open={open}
            onClose={onClose}
            isAuthonticated={false} />);
        const buttonComponent = changePasswordDialogComponent.find(Button)
        expect(buttonComponent.text()).toBe("Submit");
    });

    it("should initially not show error message", () => {
        const errorMessage = ""
        const testPasswordService = jest.fn();
        const renderHookResult = renderHook(() => ChangePasswordDialog(testPasswordService));
        const result = renderHookResult.result;
        expect(errorMessage).toBe("");
    });



    it("should not show error message if non-400 error", async () => {
        const testPasswordService = jest.fn();
        const changePasswordDialogComponent = render(<ChangePasswordDialog open={open}
            onClose={onClose}
            isAuthonticated={false} />);
        const testError = "test error";
        when(testPasswordService).calledWith(passwordValue).mockRejectedValue(testError);
        const renderHookResult = renderHook(() => ChangePasswordDialog(testPasswordService));
        const result = renderHookResult.result;
        const { handlePassword } = result.current;

        try {
            await act(() => handlePassword(passwordValue));
            fail("Error not rethrown");
        } catch (err) {
            const { errorMessage } = result.current;
            expect(testPasswordService).toBeCalledTimes(0);
        }
    });

});
