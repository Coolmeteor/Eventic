import ProfileLayout from "@/components/Layouts/ProfileLayout"
import RightContainer from "@/components/Profile/RightContainer";
import { useEffect, useState } from "react";
import { User, fetchProfile, fetchUpcomingOrders } from "@/utils/profile-api";
import { Ticket, Purchase } from "@/utils/tickest_purchases";
import OrderCard from "@/components/Profile/Order/OrderCard";

export default function UpcomingOrders(){
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [user, setUser] = useState<User>();

    useEffect(()=>{
        fetchProfile()
        .then((user) => {
            if(user && "user" in user){
                setUser(user.user);
            }
        });

        fetchUpcomingOrders()
        .then((data) => {
            if(data && "tickets" in data && "purchases" in data){
                setTickets(data.tickets);
                setPurchases(data.purchases);
            }
        });
    }, [])


    useEffect(() => {
        if(tickets && purchases)
            setIsLoading(false);
    }, [tickets, purchases]);



    if(isLoading || !user)
        return <h1>Loading...</h1>;



    return (
        <>
            <RightContainer pageName="Your Upcoming Tickets">
                <div className="order-container">
                    <h1 className="listLabel">Upcoming Tickets</h1>
                    { !isLoading && purchases.length==0? (
                        <h1 className="no-order-text">You have no upcoming tickets.</h1>
                    ) : (
                        <div className="order-list">
                            {tickets.map((ticket, index) => {
                                console.log("Event id: ", ticket.event_id);
                                return <OrderCard
                                    ticketData={ticket}
                                    purchaseData={purchases[index]}
                                />
                            })}
                        </div>
                    )}
                </div>
                
            </RightContainer>
            <style jsx>{`
                .order-container{
                    text-align: center;
                    
                    width: 90%;
                    min-height: 500px;
                    margin: 10px;
                }

                .no-order-text {
                    font-size: 3rem;
                    margin-top: 2rem;
                }
                    
                .order-list {
                    display: flex;
                    flex-direction: column;
                    padding: 0 2rem 0 2rem;
                    gap: 1em;
                    justify-content: left;
                    align-items: top;
                    width: 100%;
                }
            `}</style>
        </>
    );
}

UpcomingOrders.getLayout = function getLayout(page: React.ReactNode){
    return <ProfileLayout>{page}</ProfileLayout>
}