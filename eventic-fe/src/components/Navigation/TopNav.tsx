import React, { useEffect, useState } from 'react';
import DefaultButton from '../DefaultButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { isAuthenticated } from '@/utils/auth-api';
import { UserIcon } from './UserIcon';


type Props = {
    showProfile: Boolean;
}
export function TopNavbar({ showProfile }: Props) {

    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        async function checkAuth() {
            console.log("Check authorization");
            const isAuth = await isAuthenticated();
            setIsLogin(isAuth);
        }
        checkAuth();
    }, []);



    return (
        <>
            <header className="top-navbar">
                <div className="horiz">
                    {/* <img src="globe.svg" alt="Eventic Logo" width={28} /> */}
                    <h1><a href="/">Eventic</a></h1>

                    {/* <h1>SEARCH HERE</h1> */}
                </div>
                <div className='horiz'>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/event">Events</a>
                        <a href="/dashboard">Dashboard</a>
                        <a href="/checkout">Cart</a>
                    </nav>


                    <UserIcon isLogin={isLogin}/>

                    {/* {showProfile && !isLogin &&
                        <DefaultButton
                            bgColor={['000000', '000000','000000']}
                            onClick={() => window.location.href = "/login"}>
                            <p>Login</p>
                        </DefaultButton>
                    }

                    {showProfile && isLogin &&
                        <DefaultButton
                            bgColor={['000000', '000000','000000']}
                            onClick={() => window.location.href = "/profile"}>
                            <FontAwesomeIcon icon={faUser} />
                        </DefaultButton>
                    } */}
                </div>
            </header>


            <style jsx>{`
                .horiz {
                    display: flex;
                    flex-direction: row;   
                    align-items: center;     
                }
                .top-navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                    background-color: var(--color-onPrimary);
                    color: white;
                }

                .top-navbar h1 {
                    font-size: 1.5rem;
                    margin-left: 0.5rem;
                    margin-right: 0.5rem;
                }

                .top-navbar nav a {
                    margin-right: 1rem;
                    color: white;
                    text-decoration: none;
                }

                .top-navbar nav a:hover {
                    text-decoration: underline;
                }

                .top-navbar nav a:last-child {
                    margin-right: 0;
                }

                .top-navbar nav {
                    display: flex;
                }   

            `}</style>
        </>
    );
}