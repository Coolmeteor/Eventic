import { render, screen, waitFor } from "@testing-library/react";
import ProfileLayout from "@/components/Layouts/ProfileLayout";
jest.mock("@/utils/profile-api", () => ({
    fetchProfile: jest.fn(),
}));
import {fetchProfile} from "@/utils/profile-api";

jest.mock("react-split", () => ({ children }: any) => <div>{children}</div>); // Split をmock
jest.mock("@/components/Profile/DashboardList", () => ({ list }: any) => <ul>{list.map((item: string) => <li key={item}>{item}</li>)}</ul>);

const mockNormalUser = { user: {
    id: 1,
    user_name: "test",
    email: "email",
    phone: "1111111111",
    date_of_birth: "2000-01-01",
    sex: "Male",
    is_org: false,
    avator: "http://example.com/example.png"
}};

const mockOrganizer = { user: {
    id: 1,
    user_name: "test",
    email: "email",
    phone: "1111111111",
    date_of_birth: "2000-01-01",
    sex: "Male",
    is_org: true,
    avator: "http://example.com/example.png"
}};

jest.mock("react-split", () => ({ children }: any) => <div>{children}</div>);
jest.mock("@/components/Profile/DashboardList", () => ({
    list
}: any) => (
    <ul>{list.map((item: any, index: number) => <li key={index}>{item.text}</li>)}</ul>
));

describe("ProfileLayout", () => {
    // Override window.location
    beforeEach(() => {
        (fetchProfile as jest.Mock).mockReset();
        global.fetch = jest.fn(() =>
            Promise.resolve({
                headers: {
                    get: (key: string) => {
                        if (key === "Content-Type") return "application/json";
                        return null;
                    },
                },
                json: () => Promise.resolve({ user: { is_org: false } }),
            })
        ) as jest.Mock;
        Object.defineProperty(window, "location", {
            writable: true,
            value: {
                href: "",
            },
        });
    });

    test("Shows LoadingMessage before user is loaded", () => {
        (fetchProfile as jest.Mock).mockImplementation(() => new Promise(() => {}));
        render(<ProfileLayout><div>Test Child</div></ProfileLayout>);
        expect(screen.getByText("Loading")).toBeInTheDocument();
    });

    test("Renders non-organizer layout correctly", async () => {
        (fetchProfile as jest.Mock).mockResolvedValue(mockNormalUser);
        render(<ProfileLayout><div>Test Child</div></ProfileLayout>);

        await waitFor(() => {
            expect(screen.getByText("Personal Information")).toBeInTheDocument();
            expect(screen.getByText("Tickets")).toBeInTheDocument();
        });
    });

    test("Renders organizer layout correctly", async () => {
        (fetchProfile as jest.Mock).mockResolvedValue(mockOrganizer);
        render(<ProfileLayout><div>Test Child</div></ProfileLayout>);

        await waitFor(() => {
            expect(screen.getByText("Event Management")).toBeInTheDocument();
            expect(screen.getByText("Your orders")).toBeInTheDocument();
        });
    });

    test("Redirects if profile data is invalid", async () => {
        (fetchProfile as jest.Mock).mockResolvedValue({});

        render(<ProfileLayout><div>Test Child</div></ProfileLayout>);

        await waitFor(() => {
            expect(window.location.href).toBe("/");
        });
    });

    test("Renders children inside right-container", async () => {
        (fetchProfile as jest.Mock).mockResolvedValue(mockNormalUser);
        render(<ProfileLayout><p>Right Side</p></ProfileLayout>);

        await waitFor(() => {
            expect(screen.getByText("Right Side")).toBeInTheDocument();
        });
    });
});
