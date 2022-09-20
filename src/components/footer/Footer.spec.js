import React from "react";
import {shallow} from "enzyme";
import Footer from "./Footer";

describe("Basic rendering", () => {

    it("Should render footer", () => {
        const headerComponent = shallow(<Footer />);

        const footerDivComponent = headerComponent.find("div");
       
        expect(footerDivComponent.length).toBe(1);
    });

      it("Should display correct footer text", () => {
        const headerComponent = shallow(<Footer />);

        const footerPreComponent = headerComponent.find("pre");

        expect(footerPreComponent.length).toBe(1);
        expect(footerPreComponent.text()).toBe("Contact us now: helpdesk@skyfox.com");
    });

});
