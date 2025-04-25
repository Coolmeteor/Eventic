import { render, screen, act } from "@testing-library/react";
import { LoadingMessage } from "../LoadingMessage";

jest.useFakeTimers();

describe("LoadingMessage", () => {
    test("Renders initial message with no dots", () => {
        render(<LoadingMessage>Loading</LoadingMessage>);
        expect(screen.getByText("Loading")).toBeInTheDocument();
    });

    test("Adds dots up to maxDotNum and cycles back", () => {
        render(<LoadingMessage>Loading</LoadingMessage>);

        expect(screen.getByText("Loading")).toBeInTheDocument();

        act(() => {
        jest.advanceTimersByTime(500);
        });
        expect(screen.getByText("Loading.")).toBeInTheDocument();

        act(() => {
        jest.advanceTimersByTime(500);
        });
        expect(screen.getByText("Loading..")).toBeInTheDocument();

        act(() => {
        jest.advanceTimersByTime(500);
        });
        expect(screen.getByText("Loading...")).toBeInTheDocument();

        act(() => {
        jest.advanceTimersByTime(500);
        });
        expect(screen.getByText("Loading.")).toBeInTheDocument();
    });

    test("Respects custom maxDotNum", () => {
        render(<LoadingMessage maxDotNum={5}>Please wait</LoadingMessage>);

        act(() => {
        jest.advanceTimersByTime(5 * 500);
        });
        expect(screen.getByText("Please wait.....")).toBeInTheDocument();
    });

    test("Clears interval on unmount", () => {
        const clearIntervalSpy = jest.spyOn(global, "clearInterval");

        const { unmount } = render(<LoadingMessage>Hold on</LoadingMessage>);
        unmount();
        expect(clearInterval).toHaveBeenCalled();

        clearIntervalSpy.mockRestore();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });
});
