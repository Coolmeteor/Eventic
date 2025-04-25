import { render, screen, fireEvent } from "@testing-library/react";
import SexChangeFormBox from "@/components/Profile/EditComponents/SexChangeForm";
import { genderValues } from "@/utils/profile-api";

describe("SexChangeFormBox", () => {
    const mockSubmit = jest.fn();

    beforeEach(() => mockSubmit.mockClear());

    it("renders with title and current value", () => {
        render(
            <SexChangeFormBox
                currentValue="Male"
                errorText=""
                onSubmit={mockSubmit}
                title="Gender"
            >
                Please select your gender.
            </SexChangeFormBox>
        );

        expect(screen.getByText("Gender")).toBeInTheDocument();
        expect(screen.getByText("Please select your gender.")).toBeInTheDocument();
        expect(screen.getByText(/Current gender:/)).toBeInTheDocument();
        // Avoid read 'Male' in radio button by limiting the tag
        expect(screen.getByText((content, element) =>
            element?.tagName.toLowerCase() === "span" && content === "Male"
        )).toBeInTheDocument();
    });

    it("shows 'Not registered' if currentValue is invalid", () => {
        render(
            <SexChangeFormBox
                currentValue=""
                errorText=""
                onSubmit={mockSubmit}
                title="Gender"
            />
        );

        expect(screen.getByText("Not registered")).toBeInTheDocument();
    });

    it("renders all gender radio options", () => {
        render(
            <SexChangeFormBox
                currentValue=""
                errorText=""
                onSubmit={mockSubmit}
                title="Gender"
            />
        );

        genderValues.forEach((gender) => {
            expect(screen.getByLabelText(gender)).toBeInTheDocument();
        });
    });

    it("updates selectedGender when an option is selected", () => {
        render(
            <SexChangeFormBox
                currentValue=""
                errorText=""
                onSubmit={mockSubmit}
                title="Gender"
            />
        );

        const femaleOption = screen.getByLabelText("Female") as HTMLInputElement;
        fireEvent.click(femaleOption);
        expect(femaleOption.checked).toBe(true);
    });

    it("calls onSubmit with selected gender", () => {
        render(
            <SexChangeFormBox
                currentValue=""
                errorText=""
                onSubmit={mockSubmit}
                title="Gender"
            />
        );

        const femaleOption = screen.getByLabelText("Female");
        fireEvent.click(femaleOption);

        fireEvent.submit(femaleOption.closest("form")!);
        expect(mockSubmit).toHaveBeenCalledWith("Female");
    });

    it("displays error message", () => {
        render(
            <SexChangeFormBox
                currentValue=""
                errorText="Gender selection required"
                onSubmit={mockSubmit}
                title="Gender"
            />
        );

        expect(screen.getByText("Gender selection required")).toBeInTheDocument();
        expect(screen.getByText("Gender selection required")).toHaveStyle("color: red");
    });
});
