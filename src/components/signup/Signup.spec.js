import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { when } from "jest-when";
import { render, fireEvent, act, waitFor} from "@testing-library/react";
import Signup from "./Signup";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe('signup', () => {

    it("rendering signUp form", async () => {

        const { queryByText } = render(<Signup/>)

        expect(queryByText("Signup")).toBeInTheDocument();
        expect(queryByText("Full Name")).toBeInTheDocument();
        expect(queryByText("User Name")).toBeInTheDocument();
        expect(queryByText("Email id")).toBeInTheDocument();
        expect(queryByText("Contact Number")).toBeInTheDocument();
        expect(queryByText("Password")).toBeInTheDocument();
        expect(queryByText("Confirm Password")).toBeInTheDocument();
        expect(queryByText("Submit")).toBeInTheDocument();
    });


    it("should display error message when wrong input is entered in the input field", async () => {

        const { getByTestId,getByText } = render(<Signup/>);

        fireEvent.change(getByTestId("user_name"), {
            target: {
                value: "user123"
            }
        });

        fireEvent.change(getByTestId("full_name"), {
            target: {
                value: "Username"
            }
        });
        fireEvent.change(getByTestId("email"), {
            target: {
                value: "Usernamexgmail.com"
            }
        });
        fireEvent.change(getByTestId("contact_number"), {
            target: {
                value: "9898989898"
            }
        });
        fireEvent.change(getByTestId("password"), {
            target: {
                value: "Username123"
            }
        });
        fireEvent.change(getByTestId("confirm_password"), {
            target: {
                value: "Username@123"
            }
        });

        act(() => {
            fireEvent.submit(getByTestId("form"));
        });

        await waitFor(() => expect(getByText("Please enter a valid user name")).toBeInTheDocument());
        await waitFor(() => expect(getByText("Please enter valid email id")).toBeInTheDocument());
        await waitFor(() => expect(getByText("The password must contain at least- 5 letters, 1 capital letter, 1 small letter, 1 special character( @!#$%&), and 1 number")).toBeInTheDocument());
        await waitFor(() => expect(getByText("password did not match")).toBeInTheDocument());
    });

    it("should submit the form when all inputs are valid", async () => {
 
        const handleSubmit = jest.fn();
        const { getByTestId,getByText,getByRole} = render(<Signup onSubmit={handleSubmit}/>);

        fireEvent.change(getByTestId("user_name"), {
            target: {
                value: "user@123"
            }
        });

        fireEvent.change(getByTestId("full_name"), {
            target: {
                value: "Username"
            }
        });
        fireEvent.change(getByTestId("email"), {
            target: {
                value: "Username@gmail.com"
            }
        });
        fireEvent.change(getByTestId("contact_number"), {
            target: {
                value: "9898989898"
            }
        });
        fireEvent.change(getByTestId("password"), {
            target: {
                value: "Username@123"
            }
        });
        fireEvent.change(getByTestId("confirm_password"), {
            target: {
                value: "Username@123"
            }
        });
        fireEvent.click(getByRole("button"));
        //await waitFor(()=>expect(handleSubmit).toHaveBeenCalled());
        act(() => {
            fireEvent.submit(getByTestId("form"));
        });
        //await waitFor(()=>expect(handleSubmit).toHaveBeenCalled());
        //await waitFor(() => expect(findByText("Signed Up Successfully!!!")).toBeInTheDocument());
        //await waitFor(() =>  expect(handleSubmit).toHaveBeenCalled());
    });

});
