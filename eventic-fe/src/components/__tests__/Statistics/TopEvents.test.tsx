import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import TopEvents from '@/components/Statistics/TopEvents';
import { EventStats } from '@/utils/statistics';


const mockStatsData: EventStats[] = [
    { 
        id: 1, 
        name: 'Event 1',
        sold_num: 10, 
        rem_num: 40,
        total_num: 50,
        date: new Date(2025, 5, 15).getTime(),
        sales: 500.00,
        profit: 450.00,
    },
    { 
        id: 2, 
        name: 'Event 2',
        sold_num: 20, 
        rem_num: 30,
        total_num: 50,
        date: new Date(2025, 6, 20).getTime(),
        sales: 800.00,
        profit: 720.00,
    },
    { 
        id: 3, 
        name: 'Event 3',
        sold_num: 5, 
        rem_num: 45,
        total_num: 50,
        date: new Date(2025, 4, 10).getTime(),
        sales: 300.00,
        profit: 270.00,
    },
    { 
        id: 4, 
        name: 'Event 4',
        sold_num: 15, 
        rem_num: 35,
        total_num: 50,
        date: new Date(2025, 7, 25).getTime(),
        sales: 600.00,
        profit: 540.00,
    },
];

// Mock fetch function
jest.mock('@/utils/statistics', () => ({
    ...jest.requireActual('@/utils/statistics'),
    FetchEventStats: jest.fn().mockResolvedValue({
        stats_data: [
            { 
                id: 3, 
                name: 'New Event',
                sold_num: 2, 
                rem_num: 48,
                total_num: 50,
                date: new Date(2025, 4, 10).getTime(),
                sales: 60.00,
                profit: 54.00,
            },
        ],
    }),
}));



describe('TopEvents', () => {
    beforeAll(() => {
        // Mock window.location
        Object.defineProperty(window, "location", {
            writable: true,
            value: {
                href: "",
            },
        });
    });

    it('Displays top 3 events sorted by sales', () => {
        render(<TopEvents statsData={mockStatsData} />);

        // 1. Event 2 -> 2. Event 4 -> 3. Event 3
        const listItems = screen.getAllByRole('listitem');
        expect(within(listItems[0]).getByText(/Event 2/i)).toBeInTheDocument();
        expect(within(listItems[1]).getByText(/Event 4/i)).toBeInTheDocument();
        expect(within(listItems[2]).getByText(/Event 1/i)).toBeInTheDocument();
    });

    it('Calls FetchEventStats and updates list on duration change', async () => {
        render(<TopEvents statsData={mockStatsData} />);

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'onemonth' } });

        await waitFor(() => {
            expect(screen.getByText(/New Event/i)).toBeInTheDocument();
        });
    });

    it('Navigates to event page on button click', () => {
        render(<TopEvents statsData={mockStatsData} />);

        const button = screen.getAllByRole('button', { name: /view event/i })[0];
        fireEvent.click(button);

        expect(window.location.href).toContain('/event/');
    });
});
