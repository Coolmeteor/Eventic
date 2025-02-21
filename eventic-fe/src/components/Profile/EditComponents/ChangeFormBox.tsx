import DefaultInputForm from "@/components/DefaultInputForm";
import { useState } from 'react';


type Props = {
    currentValue: string;
    errorText: string;
    onSubmit: (item: string)=>void;
    title: string;
    children?: React.ReactNode;
}

export default function ChangeFormBox({
    currentValue,
    errorText,
    onSubmit,
    title,
    children=""
}: Props){
    const [inputValue, setInputValue] = useState<string>("");
    if(!currentValue){
        currentValue = "Not registered";
    }

    return (
        <>
            <div className="formBox">
                <h1>{title}</h1>
                <h2>{children}</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(e.target[0].value);
                    setInputValue("");
                }}>
                    <p>&bull; Current {title.toLowerCase()}: <span>{currentValue}</span></p>
                    <DefaultInputForm className="input" value={inputValue} onChange={(e) =>setInputValue(e.target.value)} id="username" type="text" placeholder={`New ${title}`}/>
                    <p style={{color: "red"}}>{errorText}</p>
                    <p>
                        <button type="submit">Change {title.toLowerCase()}</button>
                    </p>
                </form>
            </div>

            <style jsx>{`
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
                    
                .formBox h2 {
                    font-size: 1rem;
                    margin-left: 1rem;
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