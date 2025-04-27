import { render, screen, fireEvent } from "@testing-library/react";
import ChangeFormBox from "@/components/Profile/EditComponents/ChangeFormBox";

describe("ChangeFormBox", () => {
    const mockSubmit = jest.fn();

    beforeEach(() => {
        mockSubmit.mockClear();
    });

    test("Renders with title and current value", () => {
        render(
            <ChangeFormBox
                currentValue="test@example.com"
                errorText=""
                onSubmit={mockSubmit}
                title="Email"
            >
                Update your email below.
            </ChangeFormBox>
        );

        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Update your email below.")).toBeInTheDocument();
        expect(screen.getByText(/Current email:/i)).toBeInTheDocument();
        expect(screen.getByText("test@example.com")).toBeInTheDocument();
    });

    test("Shows 'Not registered' if currentValue is empty", () => {
        render(
            <ChangeFormBox
                currentValue=""
                errorText=""
                onSubmit={mockSubmit}
                title="Username"
            />
        );

        expect(screen.getByText(/Current username:/i)).toBeInTheDocument();
        expect(screen.getByText("Not registered")).toBeInTheDocument();
    });

    test("Calls onSubmit with entered value", () => {
        render(
            <ChangeFormBox
                currentValue="oldname"
                errorText=""
                onSubmit={mockSubmit}
                title="Username"
            />
        );

        const input = screen.getByPlaceholderText("New Username");
        fireEvent.change(input, { target: { value: "newname" } });

        const form = input.closest("form")!;
        fireEvent.submit(form);

        expect(mockSubmit).toHaveBeenCalledWith("newname");
    });

    test("Clears input value after submit", () => {
        render(
            <ChangeFormBox
                currentValue="current"
                errorText=""
                onSubmit={mockSubmit}
                title="Username"
            />
        );

        const input = screen.getByPlaceholderText("New Username") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "clearme" } });

        fireEvent.submit(input.closest("form")!);
        expect(input.value).toBe("");
    });

    test("Displays error message", () => {
        render(
            <ChangeFormBox
                currentValue="current"
                errorText="Something went wrong"
                onSubmit={mockSubmit}
                title="Email"
            />
        );

        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
        expect(screen.getByText("Something went wrong")).toHaveStyle("color: red");
    });
});
