type Props = {
    width?: string;
    height?: string;
    background?: string;
    value?: string;
    onChange?: (item: any) => void;
    type?: string;
    className?: string;
    id?: string;
    placeholder?: string;
    padding?: string;
}

export default function DefaultInputForm({
    width="20rem",
    height="2.3rem",
    background="var(--color-background-mid)",
    value="",
    onChange,
    type="text",
    className="",
    id="",
    placeholder="",
    padding="0.5rem"
}: Props){

    return (
        <>
            <input className = {`defaultStyle ${className}`} id={id} value={value} onChange={onChange} type={type} placeholder={placeholder}/>
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