import { render, screen, fireEvent } from "@testing-library/react";
import DoBChangeFormBox from "@/components/Profile/EditComponents/DoBChangeForm";

describe("DoBChangeFormBox", () => {
    const mockSubmit = jest.fn();

    test("Renders correctly with a registered date", () => {
        render(
            <DoBChangeFormBox
                currentValue="2000-01-01"
                errorText=""
                onSubmit={mockSubmit}
                title="Date of Birth"
            >
                Optional Description
            </DoBChangeFormBox>
        );

        expect(screen.getByText("Date of Birth")).toBeInTheDocument();
        expect(screen.getByText("Optional Description")).toBeInTheDocument();
        expect(screen.getByText(/Current date of birth:/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue("2000-01-01")).toBeInTheDocument();
    });

    test("Shows 'Not registered' if no current value is provided", () => {
        render(
            <DoBChangeFormBox
                currentValue=""
                errorText=""
                onSubmit={mockSubmit}
                title="Date of Birth"
            />
        );

        expect(screen.getByText("Not registered")).toBeInTheDocument();
    });

    test("Calls onSubmit with selected date on form submit", () => {
        render(
            <DoBChangeFormBox
                currentValue="2000-01-01"
                errorText=""
                onSubmit={mockSubmit}
                title="Date of Birth"
            />
        );

        const input = screen.getByLabelText(/date of birth/i);
        fireEvent.change(input, { target: { value: "2001-12-31" } });

        const form = input.closest("form")!;
        fireEvent.submit(form);
        expect(mockSubmit).toHaveBeenCalledWith("2001-12-31");
    });

    test("Displays error message when provided 'Invalid date'", () => {
        render(
            <DoBChangeFormBox
                currentValue="2000-01-01"
                errorText="Invalid date"
                onSubmit={mockSubmit}
                title="Date of Birth"
            />
        );

        expect(screen.getByText("Invalid date")).toBeInTheDocument();
        expect(screen.getByText("Invalid date")).toHaveStyle("color: red");
    });
});
