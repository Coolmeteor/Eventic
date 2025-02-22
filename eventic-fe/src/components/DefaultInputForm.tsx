type Props = {
    width?: string;
    height?: string;
    background?: string;
    padding?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;



export default function DefaultInputForm({
    width="20rem",
    height="2.3rem",
    background="var(--color-background-mid)",
    padding="0.5rem",
    ...inputProps
}: Props){

    return (
        <>
            <input 
                {...inputProps}
                className = {`defaultStyle ${inputProps.className}`} 
            />
            <style jsx>
                {`
                .defaultStyle{
                    padding: ${padding};
                    width: ${width};
                    height: ${height};
                    background-color: ${background};
                }
                `}
            </style>
        </>
    )
}