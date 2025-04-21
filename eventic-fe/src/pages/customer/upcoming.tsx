import ProfileLayout from "@/components/Layouts/ProfileLayout"
import RightContainer from "@/components/Profile/RightContainer";
import { useEffect, useState, useMemo } from "react";
import { User, fetchProfile, fetchUpcomingOrders } from "@/utils/profile-api";
import { Ticket, Purchase } from "@/utils/tickest_purchases";
import OrderCard from "@/components/Profile/Order/OrderCard";

export default function UpcomingOrders(){
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [user, setUser] = useState<User>();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTickets = tickets.slice(indexOfFirstItem, indexOfLastItem);
    const currentPurchases = purchases.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(tickets.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    
    const pageButtons = useMemo(() => {
        const maxVisibleButtons = 5;
        const buttons: (number | string)[] = [];

        const half = Math.floor(maxVisibleButtons / 2);
        let start = Math.max(currentPage - half, 1);
        let end = Math.min(start + maxVisibleButtons - 1, totalPages);

        if (end - start + 1 < maxVisibleButtons) {
            start = Math.max(end - maxVisibleButtons + 1, 1);
        }

        if (start > 1) {
            buttons.push(1);
            if (start > 2) buttons.push("...");
        }

        for (let i = start; i <= end; i++) {
            buttons.push(i);
        }

        if (end < totalPages) {
            if (end < totalPages - 1) buttons.push("...");
            buttons.push(totalPages);
        }
        
        return buttons;
    }, [currentPage, tickets.length]);



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
                        <>
                            <div className="pagination">
                                <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
                                    &laquo;
                                </button>
                                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                                    &lt;
                                </button>

                                {pageButtons.map((btn, index) => (
                                    typeof btn === "number" ? (
                                    <button
                                        key={index}
                                        className={currentPage === btn ? "active" : ""}
                                        onClick={() => setCurrentPage(btn)}
                                    >
                                        {btn}
                                    </button>
                                    ) : (
                                    <span key={index} className="ellipsis">...</span>
                                    )
                                ))}

                                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                                    &gt;
                                </button>
                                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>
                                    &raquo;
                                </button>
                            </div>
                            <div className="order-list">
                                {currentTickets.map((ticket, index) => {
                                    console.log("Event id: ", ticket.event_id);
                                    return <OrderCard
                                        key={ticket.id}
                                        ticketData={ticket}
                                        purchaseData={currentPurchases[index]}
                                    />
                                })}
                            </div>
                        </>
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

                .pagination {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin: 1rem;
                }

                .pagination button {
                    font-size: 1rem;
                    padding: 0.4rem 0.8rem;
                    border: none;
                    border-radius: 5px;
                    background-color: #ddd;
                    cursor: pointer;
                }

                .pagination button.active {
                    background-color: #0070f3;
                    color: white;
                }
                    
                .pagination button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </>
    );
}

UpcomingOrders.getLayout = function getLayout(page: React.ReactNode){
    return <ProfileLayout>{page}</ProfileLayout>
}