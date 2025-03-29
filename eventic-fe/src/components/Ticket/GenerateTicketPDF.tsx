import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"
import { EventItemProps } from "@/utils/event";
import { API } from "@/constants";

// Format PDF
pdfMake.vfs = pdfFonts.vfs;

export type PrintProps = {
    ticketID: number;
    eventItemProps: EventItemProps;
}

export default function GenerateTicketPDF({
    ticketID,
    eventItemProps
} : PrintProps) {
    const [qrCode, setQrCode] = useState("");
    const [retryCount, setRetryCount] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        if(retryCount > 3) return;
        
        fetch(`${API}/ticket/get-qr/${ticketID}`, {
            method: "GET",
            "credentials": "include",
        })
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setQrCode(reader.result as string);
                setIsLoading(false);
            };
            reader.readAsDataURL(blob);
        })
        .catch((error) => {
            console.error("Error fetching QR code:", error);
            setTimeout(() => setRetryCount(retryCount + 1), 2000);
        });
    }, []);


    const id_text = "Ticket ID: " + ticketID;
    const handlePrintPDF = () => {
        const docDefinition = {
            content: [
                { text: eventItemProps.name, style: "header"},
                { text: "QR code", style: "QR"} as any,
                { image: qrCode, width: 150},
                { text: "You can download or print this document"},
                { text: id_text},
            ],
            styles: {
                header: {
                    margin: 24,
                    fontSize: 24
                },
                QR: {
                    marginLeft: 30,
                    fontSize: 18,
                    bold: true
                },
            },
        };

        pdfMake.createPdf(docDefinition).open();
    }

    return (
        <>
            <div className="print-container">
                <h1><a>&bull;</a>Print your ticket</h1>
                <div className="message-container">
                    <p>*Please print your ticket and present the QR code at the entrance.</p>
                </div>

                <div className="qr-container">
                    {qrCode ? <img src={qrCode} alt="QR Code"/> : <p>Loading QR code...</p>}
                </div>

                <button 
                    className="print-button" 
                    onClick={handlePrintPDF}
                    disabled={isLoading}
                >Download / Print Ticket</button>
            </div>
            <style jsx>{`
            .print-container {
                margin: 2rem 1rem 2rem 1rem;
                border: 5px solid var(--color-background-dark);
                border-radius: 2rem;
            }

            .print-container a {
                margin-right: 0.5rem;
                margin-left: 0.5rem;
            }

            .message-container {
                margin: 1rem;
            }

            .message-container p {
                margin-left: 2rem;
                font-size: var(--font-size-body-L);
            }

            .qr-container {
                display: flex;
                justify-content: center;
            }
            .qr-container img {
                width: 300px;
            }

            .print-button{
                display: block;
                justify-content: center;
                padding: 0.5rem;
                margin: 1rem auto 2rem auto;
                width: 20rem;
                height: 4rem;
                font-weight: bold;
                font-size: var(--font-size-body-XL);
                background-color: var(--color-primary);
                color: black;
                border: none;
                border-radius: 10px;
                transition: .1s;
            }

            .print-button:hover {
                background-color: var(--color-primary-dark);
            }

            h1 {
                font-size: var(--font-size-header-S);
                margin: 0rem;
                padding-top: 28px;
            }
            `}</style>
        </>
    )
}
