import { useState, useEffect } from 'react';
import DefaultLinkButton from '../DefaultLinkButton';
import { useRouter } from 'next/router';
import { User } from '../../utils/profile-api';

const API = 'http://127.0.0.1:5000'

type Props = {
    pageName: string;
    user: User;
    children: React.ReactNode;
}

export default function PersonalForm({pageName, user, children}: Props){
    // Page transition
    const router = useRouter();
    

    function goToProfileHome(){
        router.push('/profile');
    }

    return(
        <>
            
            {
                user ? (
                    <div className="changeForm">
                        <div className="topLink">
                            <DefaultLinkButton onClick={goToProfileHome} className="textLink">Profile</DefaultLinkButton>
                            {' -> '} {pageName}
                        </div>
                        {children}
                    </div>
                ) : (
                    <div className="changeForm" style={{fontSize: "3rem", margin: "4rem"}}>Loading...</div>
                )
            }
            

            <style jsx>{`
            .topLink {
                margin: 0.5rem;
            }
            .changeForm {
                width: 90%;
                min-height: 500px;
                margin-bottom: 0.5rem;
            }
            
            .formBox {
                margin: 1rem 1rem 1rem 5rem;
            }

            .formBox h1 {
                font-size: 2rem;
                margin: 0.5rem;
            }

            .formBox p {
                margin: 1rem;
            }
            
            .formBox span {
                font-weight: bold;
            }

            

            .formBox button {
                padding: 0.5rem;
                margin: 0.5rem 0.5rem 0.5rem 10rem;
                width: 10rem;
                background-color: var(--color-primary);
                color: black;
                border: none;
                border-radius: 10px;
                transition: .1s;
            }

            .formBox button:hover {
                background-color: var(--color-primary-dark);
            }

            .homeButton {
                background: var(--color-primary-green);
                border:2px solid #000;
                margin: 0 0 0 60%;
            }
            `}</style>
        </>
    )
}