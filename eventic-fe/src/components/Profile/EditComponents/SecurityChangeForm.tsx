import DefaultInputForm from "@/components/DefaultInputForm";
import { ChangeEvent, useEffect, useState } from 'react';
import { formatPhoneNumber } from "@/utils/format"


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
    const [inputErrorText, setInputErrorText] = useState<string>("");
    const [inputMode, setInputMode] = useState<React.InputHTMLAttributes<HTMLInputElement>["inputMode"]>(undefined);

    const onInvalid = () =>{
        if(title=="Email")
            setInputErrorText("Email is invalid");
        else if (title=="Phone Number")
            setInputErrorText("Phone number is invalid");
        else
            setInputErrorText("Input is invalid");
    }

    // Assign intial value for each variables
    useEffect(() => {
        if(!currentValue){
            currentValue = "Not registered";
        }

        if(title=="Password"){
            setBody(<>Enter new password</>);
            setType("password");
        } else {
            if(title=="Email"){
                setType("email")
            } else if (title=="Phone Number") {
                setType("tel");
                setInputMode("numeric");
                
            } else {
                setType("text");
            }
        }
        
    }, []);
    useEffect(() => {
        if (title == "Phone Number" && currentValue != "Not registered"){
            currentValue = formatPhoneNumber(currentValue);
        }
        if(title!="Password"){
            setBody(
                <>
                    Current {title.toLowerCase()}: {" "}
                    <span style={{fontWeight: "bold"}}>{currentValue}</span>
                </>
            );
        }
    }, [currentValue, title]);

    const handleChange = title=="Phone Number" ? (
        (e: ChangeEvent<HTMLInputElement>) => {
            const formattedPhone = formatPhoneNumber(e.target.value || "");
            setInputValue(formattedPhone);
        }
    ) : (
        (e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value || ""); // Avoid undefined input
        }
    )

    return (
        <>
            <div className="formBox">
                <h1>{title}</h1>
                <h2>{children}</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const value = (form.elements.namedItem("value") as HTMLInputElement).value;
                    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

                    onSubmit(value, password);
                    
                    setInputValue("");
                    setPassInput("");
                    setInputErrorText("");
                }}>
                    <p>&bull; {body}</p>
                    <DefaultInputForm 
                        className="input" 
                        value={inputValue} 
                        onChange={handleChange} 
                        onInvalid={onInvalid}
                        id="value" 
                        name="value"
                        type={type}
                        inputMode={inputMode}
                        placeholder={`New ${title}`}
                    />

                    <p>&bull; Enter password</p>
                    <DefaultInputForm 
                        className="input" 
                        value={passInput} 
                        onChange={(e) =>setPassInput(e.target.value)} 
                        id="password" 
                        name="password"
                        type="password" 
                        placeholder={`Password`}
                    />

                    <p style={{color: "red"}}>{inputErrorText}{errorText}</p>
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