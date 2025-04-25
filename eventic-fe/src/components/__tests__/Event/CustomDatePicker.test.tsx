import { render, screen } from "@testing-library/react";
import { CustomDatePicker } from "@/components/Event/CustomDatePicker";
import userEvent from "@testing-library/user-event";


describe("CustomDatePicker", () => {
    test("Render with initial start and end dates", () => {
        const initStart = new Date(2025, 4, 1, 10, 0);
        const initEnd = new Date(2025, 4, 1, 12, 0);

        render(<CustomDatePicker 
            initialStartDate={initStart.getTime()} 
            initialEndDate={initEnd.getTime()}
            setDate={jest.fn()} 
        />);

        const inputs = screen.getAllByPlaceholderText(/Choose/i);

        const toDisplayFormat = (date: Date) => {
            return date.getFullYear() + "/" + 
                String(date.getMonth() + 1).padStart(2, "0") + "/" +
                String(date.getDate()).padStart(2, "0") +  " " +
                String(date.getHours()).padStart(2, "0") + ":" +
                String(date.getMinutes()).padStart(2, "0");
        }

        expect(inputs[0]).toHaveValue(toDisplayFormat(new Date(initStart)));
        expect(inputs[1]).toHaveValue(toDisplayFormat(new Date(initEnd)));
    });

    test("Call setDate when valid start and end dates are selected", async () => {
        const user = userEvent.setup();
        const mockSetDate = jest.fn();

        render(<CustomDatePicker setDate={mockSetDate} />);

        const inputs = screen.getAllByPlaceholderText(/Choose/i);
        await user.click(inputs[0]);

        
        const fakeDate = new Date();
        fakeDate.setDate(fakeDate.getDate() + 8);

        mockSetDate([fakeDate.getTime(), 0]);

        expect(mockSetDate).toHaveBeenCalled();
    });

    test("Disable endDate before startDate", async () => {
        const mockSetDate = jest.fn();
        const user = userEvent.setup();

        render(<CustomDatePicker setDate={mockSetDate} />);
        
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10);
        const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 9);
        
        // Input start date
        const startInput = screen.getByPlaceholderText("Choose start date");
        await user.click(startInput);
        const startDayLabel = startDate.getDate().toString();
        const startDay = screen.getAllByText(startDayLabel).find(el => el.getAttribute("aria-disabled") !== "true");
        expect(startDay).toBeDefined();

        await user.click(startDay!);

        // Input end date
        const endInput = screen.getByPlaceholderText("Choose end date");
        await user.click(endInput);
        const endDayLabel = endDate.getDate().toString();
        const disabledDay = screen.getAllByText(endDayLabel).find(day => day.getAttribute("aria-disabled") === "true");
        expect(disabledDay).toBeDefined();
    });

    test("Disable startDate within 7 days from today", async () => {
        const mockSetDate = jest.fn();
        const user = userEvent.setup();

        render(<CustomDatePicker setDate={mockSetDate} />);

        const input = screen.getByPlaceholderText("Choose start date");

        await user.click(input);

        const now = new Date();
        const sixDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6);
        
        const dayLabel = sixDaysLater.getDate();
        const disabledDay = screen.getAllByText(dayLabel.toString()).find(day => day.getAttribute("aria-disabled") === "true");

        expect(disabledDay).toBeDefined();
    })
});
