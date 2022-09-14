import React from "react";
import { shallow } from "enzyme";
import Profile from "./Profile"
import ChangePasswordDialog from "./ChangePasswordDialog"
import { Button } from "@material-ui/core";

describe("Basic rendering", () => {

    it("Shodld not render the logout section if authenticated", () => {
        const profileComponent = shallow(<Profile isAuthonticated={false} />);
        const changePasswordDialogComponent = profileComponent.find(<ChangePasswordDialog open={true}
            onClose={false}
            isAuthenticated={true} />);
        const buttonComponent = profileComponent.find(Button)
        const missingLogoutDivComponent = profileComponent.find("div");
        expect(missingLogoutDivComponent.length).toBe(1)
        // expect(changePasswordDialogComponent.length).toBe(1);
        expect(buttonComponent.text()).toBe("CHANGE PASSWORD");

    })
})