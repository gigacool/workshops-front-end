import App from "./App.tsx";
import {fireEvent, render, screen} from "@testing-library/react";


describe('Button', ()=>{

    beforeEach(()=> {
        render(<App/>)
    })
    it('should be in document', () => {
        const button = screen.getByTestId('count-btn');

        expect(button).toBeInTheDocument()
    })
    it('should be increased at click', () => {
        // Given
        const button = screen.getByTestId('count-btn');

        // When

        fireEvent.click(button)


        // Then
        expect(button).toHaveTextContent('count is 1')
    })

} )