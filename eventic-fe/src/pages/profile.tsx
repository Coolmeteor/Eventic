import { useState, useEffect } from "react";
import Split from "react-split"



import UProfileDashboard from "@/components/Profile/user/UProfileDashboard";
import UProfileIconList from "@/components/Profile/user/UProfileIconList";
import OProfileIconList from "@/components/Profile/organizer/OProfileIconList";
import OProfileDashboard from "@/components/Profile/organizer/OProfileDashboard";


export default function Profile(){
    const [username, setUsername] = useState<string>("defaultName");
    const isUser = false;

    
    return(
        <>  
            {
                isUser ? (
                    <Split className="flex" sizes={[30, 50]}>
                        {/* Left Component*/}
                        <div>

                            <UProfileDashboard></UProfileDashboard>
                        </div>

                        {/* Right Component*/}
                        <div>
                            <h1 className="greeting">Hello {username}!</h1>
                            <UProfileIconList></UProfileIconList>
                        </div>
                    </Split>
                ) : (
                    <Split className="flex" sizes={[30, 50]}>
                        {/* Left Component*/}
                        <div>
                            <OProfileDashboard></OProfileDashboard>
                        </div>

                        {/* Right Component*/}
                        <div>
                            <h1 className="greeting">Hello {username}!</h1>
                            <OProfileIconList></OProfileIconList>
                        </div>
                    </Split>
                )
            }
        </>
    )
}