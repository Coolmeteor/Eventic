import { useEffect, useState } from "react";

type Props = {
    children: React.ReactNode;
    maxDotNum?: number;
    intervalLen?: number;
}
export function LoadingMessage({
    children,
    maxDotNum=3,
    intervalLen=500,
}: Props){
    const [dotCount, setDotCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDotCount((prev) => (prev % (maxDotNum)) + 1);
        }, intervalLen);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <p>{children}{".".repeat(dotCount)}</p>
        </>
    );
}