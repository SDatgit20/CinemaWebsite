import React from "react";
import {render} from "@testing-library/react";
import PosterDialog from "./PosterDialog";
describe("Basic rendering and functionality", () => {
    const openDialog = true;
    const onClose = jest.fn();
    const selectedShow = {
        id: 1,
        cost: 150,
        movie: {
            name: "Movie 1",
            plot: "Suspense movie",
            duration: "1hr 30m",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BMTYyMjIyMjY4N15BMl5BanBnXkFtZTgwMzAxNTQ5MTE@._V1_.jpg"
        },
        slot: {startTime: "start time 1"}
    };
    it("Should display the movie name on dialog", () => {
        const {queryByText} = render(<PosterDialog selectedShow={selectedShow} open={openDialog} onClose={onClose}/>);
        expect(queryByText(selectedShow.movie.name)).toBeTruthy();
    });

    it('Should render poster by alt text', async () => {
        const { getByAltText } =  render(<PosterDialog selectedShow={selectedShow} open={openDialog} onClose={onClose}/>);
    
        const image = getByAltText('Poster');

        expect(image).toBeTruthy();

    });

    it('Should render poster by src', async () => {
        const { getByAltText } =  render(<PosterDialog selectedShow={selectedShow} open={openDialog} onClose={onClose}/>);
    
        const image = getByAltText('Poster');

        expect(image.getAttribute('src')).toContain("https://m.media-amazon.com/images/M/MV5BMTYyMjIyMjY4N15BMl5BanBnXkFtZTgwMzAxNTQ5MTE@._V1_.jpg");

    });


});