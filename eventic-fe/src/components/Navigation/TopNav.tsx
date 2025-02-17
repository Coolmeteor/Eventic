import React, { useEffect, useState } from 'react';
import DefaultButton from '../DefaultButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


type Props = {
    showProfile: Boolean;
}
export function TopNavbar({ showProfile }: Props) {

    const [isLogin, setIsLogin] = useState<Boolean>(false);
    useEffect(() => {
        if (localStorage.getItem("authtoken") != null) {
            setIsLogin(true);
        }
    }, []);



    return (
        <>
            <header className="top-navbar">
                <div className="horiz">
                    {/* <img src="globe.svg" alt="Eventic Logo" width={28} /> */}
                    <h1><a href="/">Eventic</a></h1>

                    <h1>SEARCH HERE</h1>
                </div>
                <div className='horiz'>
                    <nav>
                        <a href="/">Home</a>
                        <a href="#about">About</a>
                        <a href="#services">Services</a>
                        <a href="#contact">Contact</a>
                    </nav>

                    {showProfile && !isLogin &&
                        <DefaultButton onClick={() => window.location.href = "/login"}>
                            <p>Login</p>
                        </DefaultButton>
                    }

                    {showProfile && isLogin &&
                        <DefaultButton
                            bgColor='000000'
                            onClick={() => window.location.href = "/profile"}>
                            <FontAwesomeIcon icon={faUser} />
                        </DefaultButton>
                    }
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