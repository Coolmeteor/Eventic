import { useState } from 'react';

type Props = {
    title: string;
    currentUrl: string | null;
    previewUrl: string | null;
    uploadStatus: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void;
    onClick: ()=>void;
}
export default function ChangeAvatorBox({
    title,
    currentUrl,
    previewUrl,
    uploadStatus,
    onChange,
    onClick
}: Props){
    return (
        <>
            <div className="formBox">
                <h1>{title}</h1>
                <div className="previewer">
                    <input type="file" accept="image/*" onChange={onChange} />
                    {currentUrl && <img className="imageViewer" src={currentUrl} alt="Preview" width="150"/>}
                    {previewUrl && <img className="imageViewer" src={previewUrl} alt="Preview" width="150"/>}
                </div>
                <p>{uploadStatus}</p>
                <p><button onClick={onClick}>Upload {title}</button></p>
            </div>
            <style jsx>{`
                .formBox {
                    margin: 1rem 1rem 1rem 5rem;
                }
                    
                .previewer {
                    width: auto;
                    margin: 1rem 1rem 1rem 2rem;
                    font-size: 1rem;
                }
                .imageViewer {
                    margin: 1rem 0rem 1rem 0rem;
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