
type Props = {
    icon: string;
    text: string;
}
export function MiniCard({ icon, text }: Props) {
    return (
        <>
            <div className="mini-card">
                <img src={icon} alt={text} className="mini-card-icon" />
                <p>{text}</p>
            </div>


            <style jsx>{`
                .mini-card {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 8px;
                    margin: 0 1rem;
                    border-radius: 1rem;
                    
                    background-color: var(--color-primary);
                    width: 15rem;
                }

                .mini-card-icon {
                    border-radius: 50%;
                    width: 4rem;
                    height: 4rem;
                    padding: 0.5rem;
                }

                .mini-card p {
                    padding: 0 1rem;
                    margin-top: 0.5rem;
                    font-size: 1rem;
                    font-weight: 500;
                }
            `}
            </style>

        </>
    );
}



export function MicroCard({ icon, text }: Props) {
    return (
        <>
            <div className="mini-card">
                <img src={icon} alt={text} className="mini-card-icon" />
                <p>{text}</p>
            </div>


            <style jsx>{`
                .mini-card {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 4px;
                    margin: 0 0.5rem;
                    border-radius: 1rem;
                    background-color: var(--color-primary);
                    width: 10rem;
                }

                .mini-card-icon {
                    border-radius: 50%;
                    width: 2.5rem;
                    height: 2.5rem;
                    padding: 0.2rem;
                }

                .mini-card p {
                    padding: 0 1rem;
                    margin-top: 0.5rem;
                    font-size: var(--font-size-body-S);
                    font-weight: 500;
                }
            `}
            </style>

        </>
    );
}