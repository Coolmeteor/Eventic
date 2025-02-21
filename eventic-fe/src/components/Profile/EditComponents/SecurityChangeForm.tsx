import DefaultInputForm from "@/components/DefaultInputForm";
import { useEffect, useState } from 'react';


type Props = {
    currentValue: string;
    errorText: string;
    onSubmit: (item: string, password: string)=>void;
    title: string;
    children?: React.ReactNode;
}

export default function SecurityChangeFormBox({
    currentValue,
    errorText,
    onSubmit,
    title,
    children=""
}: Props){
    const [inputValue, setInputValue] = useState<string>("");
    const [passInput, setPassInput] = useState<string>("");
    const [body, setBody] = useState<React.ReactNode>(<></>);
    const [type, setType] = useState<string>("");

    useEffect(() => {
        if(!currentValue){
            currentValue = "Not registered";
        }
        
        if(title=="Password"){
            setBody(<>Enter new password</>);
            setType("password");
        } else {
            setBody(
                <>
                    Current {title.toLowerCase()}: {" "}
                    <span style={{fontWeight: "bold"}}>{currentValue}</span>
                </>
            );
            setType("text");
        }
    }, [currentValue, title]);

    return (
        <>
            <div className="formBox">
                <h1>{title}</h1>
                <h2>{children}</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(e.target[0].value, e.target[1].value);

                    setInputValue("");
                    setPassInput("");
                }}>
                    <p>&bull; {body}</p>
                    <DefaultInputForm 
                        className="input" 
                        value={inputValue} 
                        onChange={(e) =>setInputValue(e.target.value)} 
                        id={title} type={type} 
                        placeholder={`New ${title}`}
                    />

                    <p>&bull; Enter password</p>
                    <DefaultInputForm 
                        className="input" 
                        value={passInput} 
                        onChange={(e) =>setPassInput(e.target.value)} 
                        id="password" 
                        type="password" 
                        placeholder={`Password`}
                    />

                    <p style={{color: "red"}}>{errorText}</p>
                    <p>
                        <button type="submit">Change {title.toLowerCase()}</button>
                    </p>
                </form>
            </div>

            <style jsx>{`                
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