import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

const mockedFunction = jest.fn();

beforeEach(() => {
    render(<SearchBar updateQuery={mockedFunction} />);
});

describe('input tests', () => {
    test('renders input element', async () => {
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
    });

    test('ability to type in the input element', async () => {
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'Cats' } });
        expect(inputElement.value).toBe('Cats');
    });
});

test('renders go button element', async () => {
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
});

