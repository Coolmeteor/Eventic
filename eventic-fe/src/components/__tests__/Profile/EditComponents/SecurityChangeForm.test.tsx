import { render, screen, fireEvent } from "@testing-library/react";
import SecurityChangeFormBox from "@/components/Profile/EditComponents/SecurityChangeForm";

describe("SecurityChangeFormBox", () => {
    const mockSubmit = jest.fn();

    beforeEach(() => mockSubmit.mockClear());

    test("Renders title and children", () => {
        render(
            <SecurityChangeFormBox
                currentValue="user@example.com"
                errorText=""
                onSubmit={mockSubmit}
                title="Email"
            >
                Update your email
            </SecurityChangeFormBox>
        );

        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Update your email")).toBeInTheDocument();
        expect(screen.getByText(/Current email:/i)).toBeInTheDocument();
        expect(screen.getByText("user@example.com")).toBeInTheDocument();
    });

    test("Displays password-specific body when title is Password", () => {
        render(
            <SecurityChangeFormBox
                currentValue=""
                errorText=""
                onSubmit={mockSubmit}
                title="Password"
            />
        );

        expect(screen.getByText(/Enter new password/i)).toBeInTheDocument();
    });

    test("Formats phone number input when title is Phone Number", () => {
        render(
            <SecurityChangeFormBox
                currentValue=""
                errorText=""
                onSubmit={mockSubmit}
                title="Phone Number"
            />
        );

        const phoneInput = screen.getByPlaceholderText("New Phone Number") as HTMLInputElement;
        fireEvent.change(phoneInput, { target: { value: "1234567890" } });

        expect(phoneInput.value).toMatch(/\(\d{3}\)\s?\d{3}-\d{4}/);
    });

    test("Calls onSubmit with input and password", () => {
        render(
            <SecurityChangeFormBox
                currentValue=""
                errorText=""
                onSubmit={mockSubmit}
                title="Email"
            />
        );

        const valueInput = screen.getByPlaceholderText("New Email");
        const passwordInput = screen.getByPlaceholderText("Password");

        fireEvent.change(valueInput, { target: { value: "new@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "securePass" } });

        fireEvent.submit(valueInput.closest("form")!);

        expect(mockSubmit).toHaveBeenCalledWith("new@example.com", "securePass");
    });

    test("Displays both custom and passed error text", () => {
        render(
            <SecurityChangeFormBox
                currentValue=""
                errorText="Server rejected input"
                onSubmit={mockSubmit}
                title="Phone Number"
            />
        );

        const errorMessage = screen.getByText(/Server rejected input/);
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveStyle("color: red");
    });
});
