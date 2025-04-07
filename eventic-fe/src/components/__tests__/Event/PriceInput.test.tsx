import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PriceInput } from '@/components/Event/PriceInput'

describe('PriceInput Componente', () => {
    test('Show initial values', () => {
        const mockSetData = jest.fn();
        render(<PriceInput data={1500} setData={mockSetData} />);

        const input = screen.getByPlaceholderText('Enter ticket price') as HTMLInputElement;
        expect(input.value).toBe('1500');
    });

    test('If user enter value, setData will be called', async () => {
        const mockSetData = jest.fn();
        render(<PriceInput data={0} setData={mockSetData} />);

        const input = screen.getByPlaceholderText('Enter ticket price') as HTMLInputElement;

        await userEvent.clear(input);
        await userEvent.type(input, '2000');

        expect(mockSetData).toHaveBeenCalled();
        expect(mockSetData).toHaveBeenLastCalledWith(2000);
    });

    test('Pirce format testing', async () => {
        const mockSetData = jest.fn();
        render(<PriceInput data={undefined} setData={mockSetData} />);

        const input = screen.getByPlaceholderText('Enter ticket price') as HTMLInputElement;

        await userEvent.clear(input);
        await userEvent.type(input, '2,000.0505');

        expect(mockSetData).toHaveBeenCalled();
        expect(mockSetData).toHaveBeenLastCalledWith(2000.05);
    });

    const formatPrice = (input: string) => Number(input.replace(/[^\d.]/g, '')).toFixed(2);

    test.each([
        ['1000', '1000.00'],
        ['1,500.5', '1500.50'],
        ['$2,000.99', '2000.99'],
    ])('formatPrice("%s") → %s', (input, expected) => {
        expect(formatPrice(input)).toBe(expected);
    });
});