import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { API } from '@/constants';


export default function ExScanPage(){
    const [message, SetMessage] = useState("");
    const [exError, setExError] = useState("");
    const validation_request = async (text: string) => {
        try{
            const response = await fetch(`http://192.168.2.146:5000/test/ticket/validate?qr=${text}`);
            if(response.ok) {
                console.log("QR is valid");
                SetMessage("Valid ticket.");
            }
            else {
                console.error(response);
                SetMessage("This is INVALID ticket.");
            }
            setExError("Fetched!")
        }
        catch (err) {
            console.error("Fetch failed!", err);
            setExError("Fetch failed!" + err)
        }
        
    }

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "qr-reader", 
            {
                fps: 10,
                qrbox: 250
            },
            false
        );

        scanner.render(
            (decodedText) => {
            console.log("QR is read successfully", decodedText);
            validation_request(decodedText);
            SetMessage("Read QR");
            },
            (error) => {
            console.warn("Scanning error:", error);
            }
        );

        return () => {
            scanner.clear().catch(error => console.error("Failed to stop camera:", error));
        };
    }, []);

    return (
        <>
            <div className="flex flex-col items-center p-4">
                <h1 className="text-xl font-bold mb-4">Scan QR</h1>
                <div id="qr-reader" style={{ width: "300px" }}></div>
                <p>{message}</p>
                <p>{exError}</p>
            </div>

            <style jsx>{`
            p {
                font-size: var(--font-size-body-L);
            }

            `}</style>
        </>
    
    );
}