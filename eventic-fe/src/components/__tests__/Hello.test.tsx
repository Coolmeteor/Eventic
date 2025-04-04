import { render, screen } from '@testing-library/react';
import Hello from '../Hello';

describe('Hello component for unit testing', () => {
    test('Name shown', () => {
        render(<Hello name="Shoei" />);
        expect(screen.getByText('Hello, Shoei!')).toBeInTheDocument();
    });

    test('Works with no name input', () => {
        render(<Hello name="" />);
        expect(screen.getByText('Hello, !')).toBeInTheDocument();
    });
});

