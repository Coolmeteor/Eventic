import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { API, EventData } from '@/constants';
import { FetchOrgEvents } from '@/utils/statistics';
import { LoadingMessage } from '@/components/LoadingMessage';
import { fetchProfile } from '@/utils/profile-api';
import { Forbidden } from '@/components/Forbidden';
import { convertResponse } from '@/utils/auth-api';


export default function ScanPage(){
    const [message, SetMessage] = useState("");
    const eventIdRef = useRef<number>(-1);
    const [events, setEvents] = useState<EventData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState("");
    const [isOrg, setIsOrg] = useState(true);

    const validation_request = async (text: string, id: number) => {
        const response = await fetch(`${API}/ticket/validate?qr=${text}&event_id=${id}`);
        
        const data = await convertResponse(response);

        if(response.ok) {
            if(data && "quantity" in data)
            console.log("QR is valid");
            SetMessage(`Valid ticket for ${data.quantity} cutsomer(s).`);
        }
        else {
            console.error(response);
            SetMessage("This is INVALID ticket.");
        }
    }

    useEffect(() => {
        const loadData = async () => {
            const events = await FetchOrgEvents("upcoming");

            if(events && "events" in events){
                if (events.events.length == 0) {
                    setTimeout(() => window.location.href = "/profile", 2000);
                }
                setEvents(events.events);
            }
            else {
                setTimeout(() => window.location.href = "/profile", 2000);
            }

            
            setIsLoading(false);
        };

        loadData();
    }, []);

    useEffect(() => {
        if (!selected || eventIdRef.current === -1) return;

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
                validation_request(decodedText, eventIdRef.current);
            },
            (error) => {
                console.warn("Scanning error:", error);
            }
        );

        return () => {
            scanner.clear().catch(error => console.error("Failed to stop camera:", error));
        };
    }, [selected]);

    useEffect(() => {
        fetchProfile()
            .then((userData) => {
                if (userData && "user" in userData) {
                    setIsOrg(userData.user.is_org);
                    if (!userData.user.is_org) {
                        setTimeout(() => window.location.href = "/profile", 2000);
                    }
                }
                else {
                    window.location.href = '/';
                }
            });
    })

    if (!isLoading && !isOrg) {
        return (
            <div className="flex flex-col justify-center items-center">
                <Forbidden/>
                <LoadingMessage>
                    Redirecting to home
                </LoadingMessage>
            </div>
        )
    } 

    return (
        
        <div className='scan-container'>
            <h2 className="select-label">Select Event to Scan tickets</h2>
            {isLoading ? (
                <LoadingMessage>Loading</LoadingMessage>
            ) : events.length != 0 ? (
                <>
                    <select 
                        value={selected} 
                        onChange={(e) => {
                            const index = Number(e.target.value);
                            eventIdRef.current = events[index].id;
                            setSelected(e.target.value);
                        }}
                        className='select-box'
                    >
                        <option value="">Please select</option>
                        {events.map((event, index) => (
                        <option key={index} value={index.toString()}>
                            {event.name}
                        </option>
                        ))}
                    </select>
                </>
            ) : (
                <LoadingMessage>
                    You have no events to scan ticket. 
                    Redirecting to profile page
                </LoadingMessage>
            )}
            <div className="scan-box">
                <h1 className="text-xl font-bold mb-4">Scan QR</h1>
                <div id="qr-reader" style={{ width: "300px", height: "300px"}}></div>
                <p>{message}</p>
            </div>
            
            
            <style jsx>{`
            p {
                font-size: var(--font-size-body-L);
            }

            .scan-box {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 1rem;
            }

            .select-label {
                font-size: 2rem;
                margin: 1rem;
            }

            .select-box {
                font-size: 1.5rem;
                margin:0.5rem;
            }

            .scan-box p {
                font-size: 2rem;
                margin: 1rem;
            }

            .scan-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 1rem;
                font-size: 1rem;
            }

            `}</style>
        </div>
    
    );
}