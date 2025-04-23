import DefaultLinkButton from '../DefaultLinkButton';
import { useRouter } from 'next/router';

type Props = {
    pageName: string;
    children: React.ReactNode;
}

export default function RightContainer({
    pageName,
    children
}: Props){
    // Page transition
    const router = useRouter();
    

    function goToProfileHome(){
        router.push('/profile');
    }

    return(
        <>
            <div className="container">
                <div className="topLink">
                    <DefaultLinkButton onClick={goToProfileHome} className="textLink">Profile</DefaultLinkButton>
                    {' -> '} {pageName}
                </div>
                <div className="children-container">
                    {children}
                </div>
            </div>
            

            <style jsx>{`
            .topLink {
                margin: 0.5rem;
                max-height: 10%;
            }
            .container {
                width: 100%;
                min-height: 500px;
                height: 100%;
                margin-bottom: 0.5rem;
            }

            .children-container {
                width: 100%;
                min-height: 90%;
                margin: 0;
                padding: 0;
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