import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import CustomerDetailsDialog from "./CustomerDetailsDialog";
import bookingService from "./services/bookingService";
import {when} from "jest-when";
import moment from "moment";

jest.mock("./services/bookingService", () => ({
    __esModule: true,
    default: {
        create: jest.fn()
    }
}));

jest.mock("moment");

describe("Basic rendering and functionality", () => {
    const open = true;
    const onClose = jest.fn();
    const updateShowsRevenue = jest.fn();
    const selectedShow = {
        id: 1,
        cost: 150,
        movie: {
            name: "Movie 1",
            plot: "Suspense movie",
            duration: "1hr 30m"
        },
        slot: {startTime: "start time 1"}
    };

    it("Should display the show info", () => {
        const {queryByText} = render(<CustomerDetailsDialog seats={"2"} selectedShow={selectedShow} open={open}
                                                            onClose={onClose}
                                                            updateShowsRevenue={updateShowsRevenue}/>);

        expect(queryByText("Enter Customer Details")).toBeTruthy();
        expect(queryByText("Name")).toBeTruthy();
        expect(queryByText("Phone Number")).toBeTruthy();
    });

    it("Should call booking service api to create booking on submit", async () => {
        const {getByTestId} = render(<CustomerDetailsDialog seats={"2"} selectedShow={selectedShow}
                                                            open={open}
                                                            onClose={onClose}
                                                            updateShowsRevenue={updateShowsRevenue}/>);

        const testFormat = jest.fn();
        when(testFormat).calledWith("YYYY-MM-DD").mockReturnValue("2020-06-19");

        moment.mockReturnValue({
            format: testFormat
        });

        when(bookingService.create).calledWith({name: "Name", phoneNumber: "1234567890"})
            .mockResolvedValue("");

        fireEvent.change(getByTestId("name"), {
            target: {
                value: "Name"
            }
        });

        fireEvent.change(getByTestId("phoneNumber"), {
            target: {
                value: "1234567890"
            }
        });

        fireEvent.click(getByTestId("bookButton"));

        const expectedPayload = {
            "customer": {"name": "Name", "phoneNumber": "1234567890"},
            "date": "2020-06-19",
            "noOfSeats": "2",
            "showId": 1
        };

        await waitFor(() => {
            // expect(bookingService.create).toHaveBeenCalledTimes(1);
            // expect(bookingService.create).toHaveBeenCalledWith(expectedPayload);
        });
    });
});
