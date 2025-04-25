import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventTable from '@/components/Statistics/EventTable';
import { EventStats, FetchEventStats } from '@/utils/statistics';

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

const mockTotalStats: EventStats = {
    id: 0, 
    name: 'Total',
    sold_num: 50,
    rem_num: 150,
    total_num: 200,
    date: 0,
    sales: 2200.00,
    profit: 1980.00,
};

jest.mock('@/utils/statistics', () => ({
    ...jest.requireActual('@/utils/statistics'),
    FetchEventStats: jest.fn(),
}));

describe('EventTable', () => {
    beforeEach(() => {
        (FetchEventStats as jest.Mock).mockResolvedValue({
            stats_data: mockStatsData,
            total_stats: mockTotalStats,
        });
    });

    it('Renders the table headers and event data', async () => {
        render(<EventTable statsData={mockStatsData} totalStats={mockTotalStats} />);
        expect(await screen.findByText('Event name')).toBeInTheDocument();
        expect(await screen.findByText('Sold#')).toBeInTheDocument();
        expect(await screen.findByText('Event 1')).toBeInTheDocument();
    });

    it('Changes sorting when a sort button is clicked', async () => {
        render(<EventTable statsData={mockStatsData} totalStats={mockTotalStats} />);
        const sortButton = screen.getAllByRole('button')[0];
        fireEvent.click(sortButton);

        // 並び順が変わっていることを確認
        // ここはちゃんと確認するにはちょっと工夫が必要
    });

    it('Changes duration and fetches new data', async () => {
        render(<EventTable statsData={mockStatsData} totalStats={mockTotalStats} />);
        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'oneyear' } });

        await waitFor(() => {
            expect(FetchEventStats).toHaveBeenCalledWith('oneyear');
        });
    });

    it('Displays loading message while fetching', async () => {
        (FetchEventStats as jest.Mock).mockResolvedValue({
            stats_data: mockStatsData,
            total_stats: mockTotalStats,
        });

        render(<EventTable statsData={mockStatsData} totalStats={mockTotalStats} />);

        expect(screen.getByText("Event name")).toBeInTheDocument();

        const durationSelect = screen.getByRole('combobox', { name: /change duration/i });
        fireEvent.change(durationSelect, { target: { value: "onemonth" } });

        await waitFor(() => {
            expect(screen.getByText(/loading event stats/i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText("Event name")).toBeInTheDocument();
        });
    });
});
