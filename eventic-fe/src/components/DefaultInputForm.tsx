type Props = {
    width?: string,
    height?: string,
    background?: string,
    type?: string,
    className?: string,
    id?: string,
    placeholder?: string,
}

export default function DefaultInputForm({
    width="20rem",
    height="2.3rem",
    background="var(--color-background-mid)",
    type="text",
    className="",
    id="",
    placeholder=""
}: Props){

    return (
        <>
            <input className = {`defaultStyle ${className}`}id={id} type={type} placeholder={placeholder}/>
            <style jsx>
                {`
                .defaultStyle{
                    padding: 0.5rem;
                    margin: 0 0 0 1.5rem;
                    width: ${width};
                    height: ${height};
                    background-color: ${background};
                }
                `}
            </style>
        </>
        
    )
}