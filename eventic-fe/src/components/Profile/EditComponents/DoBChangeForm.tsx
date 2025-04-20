import { useState, useEffect } from 'react';
import { Gender, genderValues, isValidGender } from "@/utils/profile-api";



type Props = {
    currentValue: string;
    errorText: string;
    onSubmit: (item: string)=>void;
    title: string;
    children?: React.ReactNode;
}

export default function DoBChangeFormBox({
    currentValue,
    errorText,
    onSubmit,
    title,
    children=""
}: Props){
    const [text, setText] = useState("");
    const [birthdate, setBirthdate] = useState("");

    useEffect(() => {
        if(!currentValue){
            setText("Not registered");
        }
        else {
            setText(new Date(currentValue).toISOString().split("T")[0]);
            setBirthdate(currentValue);
        }
    }, [currentValue])
    

    return (
        <>
            <div className="formBox">
                <h1>{title}</h1>
                <h2>{children}</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    onSubmit(
                        (form.elements.namedItem("dob") as HTMLInputElement).value
                    );
                    console.log((form.elements.namedItem("dob") as HTMLInputElement).value);
                }}>
                    <p>&bull; Current {title.toLowerCase()}: <span>{text}</span></p>
                    <div className='calender-container'>
                        <label>
                            <input
                                type="date"
                                name="dob"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                            />
                        </label>
                    </div>
                    


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

                .calender-container {
                    margin: 2rem;
                    font-size: var(--font-size-body-L);s
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