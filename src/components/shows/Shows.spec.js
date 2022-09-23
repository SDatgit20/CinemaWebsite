import React from "react";
import {
  fireEvent,
  getAllByAltText,
  getByText,
  render,
} from "@testing-library/react";
import Shows from "./Shows";
import { when } from "jest-when";
import {
  dateFromSearchString,
  nextDateLocation,
  previousDateLocation,
} from "./services/dateService";
import useShows from "./hooks/useShows";
import SeatSelectionDialog from "./SeatSelectionDialog";
import useShowsRevenue from "./hooks/useShowsRevenue";
import { shallow } from "enzyme";
import ShowsRevenue from "./ShowsRevenue";
import {isAfterTwoDaysShow, isPreviousDayShow, isNotPreviousSlot} from "./Shows"

jest.mock("./services/dateService", () => ({
  dateFromSearchString: jest.fn(),
  nextDateLocation: jest.fn(),
  previousDateLocation: jest.fn(),
}));

jest.mock("./hooks/useShows", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("./hooks/useShowsRevenue", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("./SeatSelectionDialog", () => {
  return () => <div>SeatSelection</div>;
});

jest.mock("./PosterDialog", () => {
  return () => <div>Poster</div>;
});

describe("Basic rendering and functionality", () => {
  let testHistory;
  let testLocation;
  let testShowDate;

  beforeEach(() => {
    testHistory = {
      push: jest.fn(),
    };

    testLocation = {
      search: "testSearch",
    };

    testShowDate = {
      format: jest.fn(),
    };
    when(dateFromSearchString)
      .calledWith("testSearch")
      .mockReturnValue(testShowDate);
    when(nextDateLocation)
      .calledWith(testLocation, testShowDate)
      .mockReturnValue("Next Location");
    when(previousDateLocation)
      .calledWith(testLocation, testShowDate)
      .mockReturnValue("Previous Location");
    when(testShowDate.format)
      .calledWith("Do MMM YYYY")
      .mockReturnValue("Show Date");
    when(useShows)
      .calledWith(testShowDate)
      .mockReturnValue({
        showsLoading: false,
        shows: [
          {
            id: 1,
            cost: 150,
            movie: { name: "Movie 1", posterUrl: "poster.url" },
            slot: { startTime: "9:00 AM" },
          },
          {
            id: 2,
            cost: 160,
            movie: { name: "Movie 2", posterUrl: "poster2.url" },
            slot: { startTime: "1:30 PM" },
          },
        ],
      });
    when(useShowsRevenue).calledWith(testShowDate).mockReturnValue({
      showsRevenue: 549.99,
      showsRevenueLoading: false,
    });
  });

  it("Should display the show info", () => {
    const shows = render(
      <Shows history={testHistory} location={testLocation} />
    );

    shows.getByText("Shows (Show Date)");

    shows.getByText("Movie 1");
    shows.getByText("9:00 AM");
    shows.getByText("₹150");

    shows.getByText("Movie 2");
    shows.getByText("1:30 PM");
    shows.getByText("₹160");
  });

  it("Should push to history if next or previous clicked", () => {
    const shows = render(
      <Shows history={testHistory} location={testLocation} />
    );

    const previousDayButton = shows.getByText("Previous Day");
    const nextDayButton = shows.getByText("Next Day");

    fireEvent.click(previousDayButton);
    fireEvent.click(nextDayButton);

    expect(testHistory.push).toBeCalledTimes(2);
    expect(testHistory.push).toHaveBeenNthCalledWith(1, "Previous Location");
    expect(testHistory.push).toHaveBeenNthCalledWith(2, "Next Location");
  });

  it("Should display seat selection when a show is selected", () => {
    const { getByText, queryByText } = render(
      <Shows history={testHistory} location={testLocation} />
    );

    expect(queryByText("SeatSelectionDialog")).toBeNull();

    fireEvent.click(getByText("Movie 1"));

    expect(getByText("SeatSelection")).toBeTruthy();
  });

  it("Should display poster when the selected icon is clicked", () => {
    const { getByText, queryByText, getAllByAltText } = render(
      <Shows history={testHistory} location={testLocation} />
    );

    expect(queryByText("PosterDialog")).toBeNull();

    const posters = getAllByAltText("Poster");

    fireEvent.click(posters[0]);

    expect(getByText("Poster")).toBeTruthy();
  });

  it("Should display revenue when rendered for admin", () => {
      const shows = shallow(<Shows history={testHistory} location={testLocation}/>);

      const showsRevenue = shows.find(ShowsRevenue);

      expect(showsRevenue.prop("showsRevenue")).toBe(549.99);
      expect(showsRevenue.prop("showsRevenueLoading")).toBe(false);
  });

  it("Should not be able to view pop-up when previous day's shows is clicked", () => {
    const shows = render(
      <Shows history={testHistory} location={testLocation} />
    );

    const previousDayButton = shows.getByText("Previous Day");

    fireEvent.click(previousDayButton);
    fireEvent.click(shows.getByText("Movie 1"));

    expect(shows.getByText("Movie 1")).toBeDisabled;
  });

  it("Should be able to view pop-up when next day's shows is clicked", () => {
    const shows = render(
      <Shows history={testHistory} location={testLocation} />
    );

    const nextDayButton = shows.getByText("Next Day");

    fireEvent.click(nextDayButton);
    fireEvent.click(shows.getByText("Movie 1"));

    expect(shows.getByText("Movie 1")).not.toBeDisabled;
  });
  
  it("should return false when show slot is past on previous day for admin", () =>{
    const currentDate=new Date("Thu Sep 22 2022 9:30:00 GMT+0530 (India Standard Time)");
    var showDate = new Date();
    showDate.setDate(currentDate.getDate()-1);
    var startTime = "9:00 AM";

    expect(isNotPreviousSlot(startTime,currentDate,showDate)).toEqual(false);
});

it("should return true when show slot is not past on current day for admin", () =>{
    const currentDate=new Date("Thu Sep 22 2022 8:30:00 GMT+0530 (India Standard Time)");
    var showDate = new Date();
    showDate.setDate(currentDate.getDate());
    var startTime = "9:00 AM";

    expect(isNotPreviousSlot(startTime,currentDate,showDate)).toEqual(true);
});

it("should return true when show slot is on future day for admin", () =>{
    const currentDate=new Date("Thu Sep 22 2022 8:30:00 GMT+0530 (India Standard Time)");
    var showDate = new Date();
    showDate.setDate(currentDate.getDate()+1);
    var startTime = "9:00 AM";

    expect(isNotPreviousSlot(startTime,currentDate,showDate)).toEqual(true);
});

it("should return true when previous day is called in url for customer", () =>{
    const currentDate=new Date("Thu Sep 22 2022 8:30:00 GMT+0530 (India Standard Time)");
    var showDate = new Date();
    showDate.setDate(currentDate.getDate()-1);

    expect(isPreviousDayShow(currentDate,showDate)).toEqual(true);
});

it("should return false when current day is called in url for customer", () =>{
    const currentDate=new Date("Thu Sep 22 2022 8:30:00 GMT+0530 (India Standard Time)");
    var showDate = new Date();
    showDate.setDate(currentDate.getDate());

    expect(isPreviousDayShow(currentDate,showDate)).toEqual(false);
});

it("should return false when future day is called in url for customer", () =>{
    const currentDate=new Date("Thu Sep 22 2022 8:30:00 GMT+0530 (India Standard Time)");
    var showDate = new Date();
    showDate.setDate(currentDate.getDate()+1);

    expect(isPreviousDayShow(currentDate,showDate)).toEqual(false);
});

it("should return false when next day is called in url for customer", () =>{
    const currentDate=new Date("Thu Sep 22 2022 8:30:00 GMT+0530 (India Standard Time)");
    var showDate = new Date();
    showDate.setDate(currentDate.getDate()+1);

    expect(isAfterTwoDaysShow(currentDate,showDate)).toEqual(false);
});

it("should return false when next to next day is called in url for customer", () =>{
    const currentDate=new Date("Thu Sep 22 2022 8:30:00 GMT+0530 (India Standard Time)");
    var showDate = new Date();
    showDate.setDate(currentDate.getDate()+2);

    expect(isAfterTwoDaysShow(currentDate,showDate)).toEqual(false);
});

it("should return true when after two days is called in url for customer", () =>{
    const currentDate=new Date("Thu Sep 22 2022 8:30:00 GMT+0530 (India Standard Time)");
    var showDate = new Date();
    showDate.setDate(currentDate.getDate()+3);

    expect(isAfterTwoDaysShow(currentDate,showDate)).toEqual(true);
});

it("should return false when after past day is called in url for customer", () =>{
    const currentDate=new Date("Thu Sep 22 2022 8:30:00 GMT+0530 (India Standard Time)");
    var showDate = new Date();
    showDate.setDate(currentDate.getDate()-1);
    
    expect(isAfterTwoDaysShow(currentDate,showDate)).toEqual(false);
});
  
});
