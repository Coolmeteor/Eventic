import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCalendarAlt, faMapLocation
} from '@fortawesome/free-solid-svg-icons';
import { EventItemProps } from '@/utils/event';






/**
 * EventCard component
 * isSimple makes the card have only the event name and thumbnail
 */
export function EventItem({
    name,
    thumbnail,
    date,
    location,
    id,
    isSimple=false
}: EventItemProps){
    /**
     *  Convert string into image as React.FC.
     *  Currently this assumes the input string is a url.
     * @param param0 
     * @returns 
     */
    const ImageFromString: React.FC<{ imageStr: string }> = ({ imageStr }) => {
        const link = "/event/" + id;
        return (
            <button onClick={() => window.location.href = link}>
                <div className="thumbnail">
                    {
                        imageStr ? 
                        <img className="image" src={imageStr} alt="Thumbnail"/>
                        :
                        <div className="image">Loading...</div>
                    }

                    <style jsx>{`

                    .thumbnail {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 400px;
                        height: 250px;
                        overflow: hidden;
                        border-radius: 1rem;
                        border: 3px solid var(--color-background-dark);
                  
                    }

                    .image {
                        // width: 75%;
                        object-fit: cover;
                    
                    }

                    `}</style>
                </div>
            </button>
        )
    };
    
    

    const iconStyle: React.CSSProperties = {margin: "0 0.3rem 0 0"};
    
    return(
        <>
            { isSimple ? (
                <div className="card">
                    <p className="title">{name}</p>
                    <ImageFromString imageStr={thumbnail}/>
                </div>
            ) : (
                <div className="card">
                    <p className="title">{name}</p>
                    <ImageFromString imageStr={thumbnail}/>
                    <p className="detail">
                        <FontAwesomeIcon style={iconStyle} icon={faCalendarAlt}/>
                        <a>{new Date(date).toDateString()}</a>
                    </p>
                    <p className="detail">
                        <FontAwesomeIcon style={iconStyle} icon={faMapLocation}/>
                        <a>{location}</a>
                    </p>
                </div>
            )}
        
            <style jsx>{`
            
            .card{
                width: 450px;
                padding: 0 2rem 0 2rem;
                overflow:hidden;
                white-space:nowrap;
            }

            .title {
            display:block;
                font-size: 2rem;
                margin: 1rem;
                margin-right: 0.2em;
     
                // max-width: 300px;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .icon-style {
                margin: 0.5rem;
                font-size: 1rem;
            }

            .detail {
                margin: 0.5rem;
                font-size: 1.5rem;
            }
            
            `}</style>
        </>
    )
}