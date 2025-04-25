import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DefaultInputForm from "../DefaultInputForm";

describe("DefaultInputForm", () => {
    test("Shows the input value", async () => {
        render(<DefaultInputForm data-testid="input" placeholder="Type here"/>);

        const user = userEvent.setup();
        const input = screen.getByPlaceholderText("Type here") as HTMLInputElement;

        await userEvent.type(input, "ABcd12#$");

        expect(input.value).toBe("ABcd12#$");
    });


    test("Renders with default styles", () => {
        render(<DefaultInputForm data-testid="input" />);
        const input = screen.getByTestId("input");

        expect(input).toHaveClass("defaultStyle");
    });

    test("Passes other input props correctly", () => {
        render(
            <DefaultInputForm
                type="email"
                placeholder="Enter email"
                value="test@example.com"
                onChange={() => {}}
            />
        );

    const input = screen.getByPlaceholderText("Enter email") as HTMLInputElement;
        expect(input.type).toBe("email");
        expect(input.value).toBe("test@example.com");
    });

    test("Merges custom className with defaultStyle", () => {
        render(<DefaultInputForm className="custom-class" data-testid="input" />);
        const input = screen.getByTestId("input");
        expect(input.className).toContain("defaultStyle");
        expect(input.className).toContain("custom-class");
    });
});
