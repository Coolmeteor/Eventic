import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { API } from '@/constants';


export default function ScanPage(){
    const [message, SetMessage] = useState("");

    const validation_request = async (text: string) => {
        const response = await fetch(`${API}/test/ticket/validate?qr=${text}`);
        if(response.ok) {
            console.log("QR is valid");
            SetMessage("This is a valid ticket.");
        }
        else {
            SetMessage("This is invalid ticket.")
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
            </div>

            <style jsx>{`
            p {
                font-size: var(--font-size-body-L);
            }

            `}</style>
        </>
    
    );
}