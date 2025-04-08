import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Section from "@/components/Section";
import { API, EventData, mockEvents } from "@/constants";
import { EventCard, EventCardLarge } from "@/components/EventCard";
import { HorizontalScroll, HorizontalScrollList } from "@/components/ScrollerLists/HorizontalScroll";
import { HorizontalEventList } from "@/components/ScrollerLists/HoritonalEventList";


export default function Checkout() {
    // data
    const [eventData, setEventData] = useState<{ qnty: number, event: EventData }[]>([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // payment
    const [processing, setProcessing] = useState(false);

    function submitPayment() {
        // Simulate payment processing
        return new Promise((resolve) => {
            setProcessing(true);
            setTimeout(() => {
                resolve(true);
                setProcessing(false);
            }, 2000);
        });
    }

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);

                // data from, api
                // console.log(`fetching event ${API}/events/${id}`)
                // const response = await fetch(`${API}/events/${id}`)
                // console.log(response)
                // if (!response.ok) throw new Error("Failed to fetch event")
                // const data: EventData = (await response.json())[0]
                // setEventData(data)

                // use mock data instead
                // deduplicate, and sum same events for quantity
                let result: { qnty: number, event: EventData }[] = []
                mockEvents.forEach((event) => {
                    if (result.find((e) => e.event.id === event.id)) {
                        result.find((e) => e.event.id === event.id)!.qnty++
                        return
                    } else {
                        result.push({ qnty: 1, event: event })
                    }
                })

                setEventData(result)

            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        };

        fetchEvent();
    }, []);

    const TAX_RATE = 0.13;
    return (
        <>
            <Section>
                {loading && <p>Loading...</p>}
                {error && <p>Error loading event: {error}</p>}

                {eventData != undefined && eventData != null &&
                    <div>
                        <div className="event-content">

                            <div className="event-detail">
                                <h1>RSVP Checkout</h1>
                                <p>Please confirm your order to proceed with the event checkout.</p>

                                <HorizontalScrollList>
                                    {eventData.map((event) => (
                                        <li className="scroll-list">
                                            <EventCard event={event.event} large={true} key={event.event.id} />
                                        </li>
                                    ))}
                                </HorizontalScrollList>


                                <div className="payment-container">

                                    <div className="payment-inner-container">
                                        <div><h2>Billing Information</h2>
                                            <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
                                                <input
                                                    type="text"
                                                    name="first name"
                                                    placeholder="First Name"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    name="last name"
                                                    placeholder="Last Name"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    name="address"
                                                    placeholder="Address"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    name="city"
                                                    placeholder="City"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    name="province"
                                                    placeholder="Province"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    name="country"
                                                    placeholder="Country"
                                                    required
                                                />



                                            </form>
                                        </div>

                                        <div>
                                            <div><h2>Card Details</h2>
                                                <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
                                                    <input
                                                        type="text"
                                                        name="carhodlername"
                                                        placeholder="Cardholder Name"
                                                        required
                                                    />
                                                    <input
                                                        type="text"
                                                        name="cardNumber"
                                                        placeholder="Card Number"
                                                        maxLength={16}
                                                        required
                                                    />
                                                    <input
                                                        type="text"
                                                        name="expiry"
                                                        placeholder="MM/YY"
                                                        required
                                                    />
                                                    <img
                                                        src="/accepted_cards.png"
                                                        alt="cards"
                                                        style={{ width: "220px", height: "auto", marginTop: "1rem" }}
                                                        className="organizer-icon" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="terms-conditions">
                                    <h2>Terms and Conditions</h2>
                                    <p>By using our platform, you agree to the following terms and conditions:</p>

                                    <ol>
                                        <li><strong>1. Event Information:</strong> All event details, including dates, pricing, and availability, are subject to change without prior notice.</li>
                                        <li><strong>2. Booking & Payment:</strong> Payments must be completed at checkout. Refunds are subject to the event organizer's policy.</li>
                                        <li><strong>3. Cancellations:</strong> If an event is canceled, you may be eligible for a refund based on the organizer’s refund policy.</li>
                                        <li><strong>4. User Responsibility:</strong> You are responsible for ensuring that the information you provide is accurate and up to date.</li>
                                        <li><strong>5. Privacy & Data:</strong> Your personal information will be handled in accordance with our <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</li>
                                        <li><strong>6. Prohibited Activities:</strong> Unauthorized reselling of tickets, fraudulent activity, or misuse of the platform may result in account suspension.</li>
                                    </ol>
                                </div>
                            </div>

                            <div className="rsb">
                                <div className="cart-detail">
                                    <h2>Your cart</h2>
                                    {eventData.map((event) => (
                                        <div className="summary-item" key={event.event.id}>
                                            <p>{event.event.name}</p>
                                            <p>{event.qnty} x ${event.event.pricing.toFixed(2)}</p>
                                        </div>
                                    ))}
                                    <hr />

                                    <div className="summary-item">
                                        <p>Subtotal</p>
                                        <p>${eventData.reduce((partialSum, a) => partialSum + a.event.pricing, 0).toFixed(2)}</p>
                                    </div>

                                    <div className="summary-item">
                                        <p>HST</p>
                                        <p>${(eventData.reduce((partialSum, a) => partialSum + a.event.pricing, 0) * TAX_RATE).toFixed(2)}</p>
                                    </div>

                                    <div className="summary-item">
                                        <p className="total">Total</p>
                                        <p className="total">${(eventData.reduce((partialSum, a) => partialSum + a.event.pricing, 0) * (1 + TAX_RATE)).toFixed(2)}</p>
                                    </div>

                                </div>

                                <button className="pay-btn" onClick={submitPayment} disabled={processing}>
                                    {processing ? "Processing..." : "Confirm Order"}
                                </button>

                                <div className="next-steps-list">
                                    <h2>Instructions</h2>
                                    <ol>
                                        <li><strong>1. Review Event Details:</strong> Double-check the event information before proceeding.</li>
                                        <li><strong>2. Input Payment Details:</strong> Then, click <strong>"Confirm Order"</strong> to finalize your booking.</li>
                                        <li><strong>3. Print Off Ticket:</strong> You will recieve a copy of your ticket under Profile --{">"} Ordered tickets.</li>
                                        <li><strong>4. Prepare for the Event:</strong> Follow any instructions from the organizer, such as venue guidelines or entry requirements.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>


                    </div>
                }

            </Section >

            <style jsx>{`
.spacer {
    height: 2em;
}
h1 {
    font-size: var(--font-size-header-S);
    margin-bottom: 1em;
    padding-top: 28px;
}

.event-content {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.rsb {
    padding-top: 150px;
    min-width: 400px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-background-mid);
}
@media (max-width: 1000px) {
    .rsb {
        min-width: 250px;
    }
}

.event-detail {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: top;
    width: 100%;
    // background-color: coral;
}

.event-detail-text {
    padding-left: 1em;
    padding-right: 2em;
    font-size: var(--font-size-body-L);
}

.event-detail h2, .cart-detail h2, .organizer-detail h2 {
    padding: 0.4em;
    padding-left: 0;
    font-size: var(--font-size-header-XS);
}


.gallery {
    padding: 1em;
}


.cart-detail {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: top;
    padding-left: 1em;
    // background-color: green
}

.summary-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.1em 1em;
    margin: 0.5em 0;
    border-bottom: 1px solid var(--color-background-light);
    font-size: var(--font-size-body-L);
}

.qty-indicator {
    width: 20px;
}

.total {
    font-weight: bold;
    font-size: var(--font-size-body-XXL);
    padding-left: 0em;
}

.organizer-detail {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: top;
    padding-left: 1em;
    // background-color: red;   
}


.organizer-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 1em;
    margin-top: 1em;
}

.next-steps-list {
    margin-top: 50px;
    padding: 15px;
    background: var(--color-background-light);
    border-left: 5px solid #ff3414;
}
.terms-conditions {
    margin-top: 30px;
    margin-bottom: 50px;
    padding: 15px;
    background: var(--color-background-light);
    border-left: 5px solid #007bff;
}

// payment
.payment-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1.5rem;
    border: 2px solid #cccccc;
    border-radius: 12px;
    margin: 2rem auto;
    font-family: sans-serif;
    background: var(--color-background-light);
    text-align: center;
    gap: 40px;
}

.payment-inner-container {
    display: flex;
    flex-direction: row;
    gap: 40px;
}

.payment-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 1rem;
}

.payment-form input {
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid #808080;
    font-size: 1rem;
    width: 200px;
}

.pay-btn {
margin: 0 2em;
    margin-top: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
    background-color: var(--color-onPrimary);
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.payment-form button:disabled {
    background-color: #999999;
    cursor: not-allowed;
}
// end payment


hr {
  border: none;
  height: 1px;
  background-color: #000000;
  margin: 1em 2em;
}

ul {
    padding-left: 20px;
}

h2 {
    font-size: var(--font-size-header-XS);
}

ul li {  
    margin-bottom: 10px;
}

a {
    color: #007bff;
    text-decoration: underline;
}
            `}</style>
        </>

    );
}
