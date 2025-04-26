import { blobToBase64 } from "@/utils/helpers";


// Mock fetch and FileReader
global.fetch = jest.fn();
const originalFileReader = global.FileReader;


beforeEach(() => {
    jest.clearAllMocks();
});

afterEach(() => {
    global.FileReader = originalFileReader;
});


global.FileReader = class {
    result: string | ArrayBuffer | null = "data:mockBase64String";
    onloadend: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null = null;

    readAsDataURL(_blob: Blob) {
        (this.onloadend as any)?.();
    }
} as any;

describe("blobToBase64", () => {
    it("should convert blob URL to base64 string", async () => {
        const mockBlob = new Blob(["test"], { type: "text/plain" });

        (fetch as jest.Mock).mockResolvedValueOnce({
        blob: async () => mockBlob,
        });

        global.FileReader = class {
        onloadend: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null = null;
        onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null = null;
        result: string | ArrayBuffer | null = "data:mockBase64String";

        readAsDataURL(_blob: Blob) {
            (this.onloadend as any)?.();
        }
        } as any;

        const result = await blobToBase64("http://example.com/image.png");

        expect(result).toBe("data:mockBase64String");

        expect(fetch).toHaveBeenCalledWith("http://example.com/image.png");
    });
});
