import { useState, useEffect } from 'react';
import { Gender, genderValues, isValidGender } from "@/utils/profile-api";



type Props = {
    currentValue: string;
    errorText: string;
    onSubmit: (item: string)=>void;
    title: string;
    children?: React.ReactNode;
}

export default function SexChangeFormBox({
    currentValue,
    errorText,
    onSubmit,
    title,
    children=""
}: Props){
    const [text, setText] = useState("");
    const [selectedGender, setSelectedGender] = useState<Gender | "">("");

    useEffect(() => {
        if(!currentValue || !isValidGender(currentValue)){
            setText("Not registered");
        }
        else {
            setText(currentValue);
            setSelectedGender(currentValue as Gender);
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
                        selectedGender
                    );
                }}>
                    <p>&bull; Current {title.toLowerCase()}: <span>{text}</span></p>
                    <div className='radio-container'>
                        {genderValues.map((gender) => (
                            <label key={gender} className="radio-label">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    checked={selectedGender === gender}
                                    onChange={() => setSelectedGender(gender)}
                                    className="radio-input"
                                />
                                {gender}
                            </label>
                        ))}
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

                .radio-container {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;

                    margin: 0 0 0 1rem;
                }

                .radio-label {
                    display: flex;
                    margin: 0.2rem 1rem 0.2rem 1rem;
                    gap: 8px;
                    font-size: var(--font-size-body-M);
                }

                .radio-input {
                
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