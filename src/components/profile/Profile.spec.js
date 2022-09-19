import React from "react";
import { shallow } from "enzyme";
import Profile from "./Profile"
import ChangePasswordDialog from "./ChangePasswordDialog"
import { Button } from "@material-ui/core";
import { render, fireEvent } from "@testing-library/react";

describe("Basic rendering", () => {

    it("Should not render the logout section if authenticated", () => {
        const profileComponent = shallow(<Profile isAuthonticated={false} />);
        const changePasswordDialogComponent = profileComponent.find(<ChangePasswordDialog open={true}
            onClose={false}
            isAuthenticated={true} />);
        const buttonComponent = profileComponent.find(Button)
        const missingLogoutDivComponent = profileComponent.find("div");
        expect(missingLogoutDivComponent.length).toBe(1)
        expect(buttonComponent.text()).toBe("CHANGE PASSWORD");

    })

    // it("should check if change password dialog in opened", () => {
    //     const profileComponent = render(<Profile isAuthonticated={false} />);
    //     // const ChangePasswordDialog = jest.fn();

    //     const changePasswordButton = profileComponent.getByTestId("button")
    //     fireEvent.click(changePasswordButton)


    //     const profileComponentShallow = shallow(<Profile isAuthonticated={false} />);

    //     const buttonComponent = profileComponentShallow.find(Button);

    //     // expect(profileComponentShallow.prop(open)).toBe(true);
    //     expect(buttonComponent.prop("isAuthenticated")).toBe(true);
    //     // expect(rootRouterComponent.prop("isAuthenticated")).toBe(true);



    // })
})