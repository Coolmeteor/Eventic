import { render, screen } from "@testing-library/react";
import RightContainer from "@/components/Profile/RightContainer";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";

// Override useRouter by mock function
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

describe("RightContainer", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
        });
        mockPush.mockClear();
    });

    test("Renders pageName and children correctly", () => {
        render(
        <RightContainer pageName="Edit Info">
            <div>Child Content</div>
        </RightContainer>
        );

        expect(screen.getByText("Profile")).toBeInTheDocument();
        expect(screen.getByText(/->/)).toBeInTheDocument();
        expect(screen.getByText(/Edit Info/)).toBeInTheDocument();
        expect(screen.getByText("Child Content")).toBeInTheDocument();
    });

    test("Navigates to /profile when Profile link is clicked", async () => {
        render(
        <RightContainer pageName="Dashboard">
            <p>Test</p>
        </RightContainer>
        );

        const link = screen.getByText("Profile");
        await userEvent.click(link);

        expect(mockPush).toHaveBeenCalledWith("/profile");
    });
});
