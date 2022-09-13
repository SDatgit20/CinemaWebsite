import React from "react";
import {shallow} from "enzyme";
import Header from "./Header";
import {Typography} from "@material-ui/core";

describe("Basic rendering", () => {
    const testOnLogout = jest.fn();

    it("Should not render the logout section if not authenticated", () => {
        const headerComponent = shallow(<Header isAuthenticated={false} onLogout={testOnLogout}/>);

        const typographyComponent = headerComponent.find(Typography);
        const missingLogoutDivComponent = headerComponent.find("div");
        expect(missingLogoutDivComponent.length).toBe(1);
        expect(typographyComponent.length).toBe(1);
        expect(typographyComponent.text()).toBe("SkyFox Cinema");
    });

    it("Should render the logout section if authenticated", () => {
        const headerComponent = shallow(<Header isAuthenticated={true} onLogout={testOnLogout}/>);

        const typographyComponents = headerComponent.find(Typography);
        const logoTypographyComponent = typographyComponents.at(0);
        const logoutDivComponent = headerComponent.find("div");
        const logoutTypographyComponent = typographyComponents.at(1);
       // expect(logoutDivComponent.prop("onClick")).toBe(testOnLogout);
        expect(logoutTypographyComponent.text()).toBe("Logout");
        expect(logoTypographyComponent.length).toBe(1);
        expect(logoTypographyComponent.text()).toBe("SkyFox Cinema");
    });
});
