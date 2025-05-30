import React from"react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import styles from "./DefaultIconButton.module.css"


type Props = {
    title: string,
    icons?: IconDefinition,
    iconSize?: string,
    onClick?: () => void,
    className?: string;
}

export default function DefaultIconButton({title, icons=faPaperclip, iconSize="35px", onClick, className}: Props){
    return (
        <>
            <button className={`defaultStyle ${className}`} onClick={onClick}>
                <span className="title">
                    <h1>{title}</h1>
                </span>
                <div className='icon'>
                    <FontAwesomeIcon icon={icons}/>
                </div>
            </button>
            <style jsx>{`
            .defaultStyle{
                width: 300px;
                height: 150px;

                min-width: 120px;
                min-height: 75px;

                border: 3px solid var(--color-onPrimary);
                border-radius: 15px;

                margin: 20px;
                padding: 10px;

                font-size:25px;
                
                transition: .4s;
            }

            .defaultStyle:hover{
                background: var(--color-icon-gray);
            }
            
            .icon{
                display: inline;
                align-item: center;
                font-size: ${iconSize};
            }

            .title{
                display: block;
                margin-bottom: 20px;
            }

            .small {
                width: 150px;
                height: 80px;

                min-width: 120px;
                min-height: 75px;

                border: 3px solid var(--color-onPrimary);
                border-radius: 15px;

                margin: 10px;
        
                padding: 10px;

                font-size:16px;
            }
            `}</style>
            
        </>
    )
}