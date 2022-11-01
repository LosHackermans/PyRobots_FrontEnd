import { render, screen } from "@testing-library/react";
import Simulation from './Simulation'
import 'jest-canvas-mock'

describe('Test of Simulation', () => {
    test('Form fields exist', () => {
        render(<Simulation/>)

        let input = screen.getByRole('spinbutton', {name: ''})
        expect(input).toBeInTheDocument();

        input = screen.getByRole('button', {name: 'Start simulation'})
        expect(input).toBeInTheDocument();

        let label = screen.getByTestId('rounds')
        expect(label).toBeInTheDocument();

        label = screen.getByTestId('robots')
        expect(label).toBeInTheDocument();

    });
});