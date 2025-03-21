/**
 * Image to base64 string
 * @param blobUrl 
 * @returns 
 */
export async function blobToBase64(blobUrl: string): Promise<string> {
    const response = await fetch(blobUrl);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}