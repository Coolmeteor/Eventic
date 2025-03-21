/**
 * Image to base64 string
 * @param blobUrl 
 * @returns 
 */
export async function blobToBase64(blobUrl: string): Promise<string> {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    console.log("Blob: ", blobUrl);
    console.log("Blob type: ", blob.type);
    console.log("Blob size: ", blob.size);
    console.log("Blob URL: ", response);
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

