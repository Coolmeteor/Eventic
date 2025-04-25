import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardList from "@/components/Profile/DashboardList";

describe("DashboardList", () => {
    it("Renders all items in the list with bullets", () => {
        const mockList = [
        { text: "Edit Profile", onClick: jest.fn() },
        { text: "My Orders", onClick: jest.fn() },
        ];

        render(<DashboardList list={mockList} />);

        expect(screen.getByText("• Edit Profile")).toBeInTheDocument();
        expect(screen.getByText("• My Orders")).toBeInTheDocument();
    });

    it("Calls onClick handler when item is clicked", async () => {
        const mockClick1 = jest.fn();
        const mockClick2 = jest.fn();

        const mockList = [
        { text: "Edit Profile", onClick: mockClick1 },
        { text: "My Orders", onClick: mockClick2 },
        ];

        render(<DashboardList list={mockList} />);

        await userEvent.click(screen.getByText("• Edit Profile"));
        await userEvent.click(screen.getByText("• My Orders"));

        expect(mockClick1).toHaveBeenCalledTimes(1);
        expect(mockClick2).toHaveBeenCalledTimes(1);
    });
});
