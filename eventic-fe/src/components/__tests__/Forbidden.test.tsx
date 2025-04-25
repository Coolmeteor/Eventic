import { render, screen } from "@testing-library/react";
import { Forbidden } from "../Forbidden";

describe("Forbidden", () => {
    test("displays the default 403 message", () => {
        render(<Forbidden />);
        expect(screen.getByText("403 - Forbidden")).toBeInTheDocument();
        expect(screen.getByText("You do not have permission to access this page.")).toBeInTheDocument();
    });

    test("renders children content", () => {
        render(
            <Forbidden>
            <button>***Test Children***</button>
            </Forbidden>
        );
        expect(screen.getByRole("button", { name: "***Test Children***" })).toBeInTheDocument();
    });
});