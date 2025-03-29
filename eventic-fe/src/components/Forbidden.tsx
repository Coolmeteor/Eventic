/*
    Forbidden component
*/
import React from 'react';

type ForbiddenProps = {
    children?: React.ReactNode;
}
export const Forbidden = ({children}: ForbiddenProps) => {
    return (
    <div style={{ padding: '2rem', textAlign: 'center', fontSize: "2rem"}}>
        <div style={{margin: '2rem'}}>
            <h1 style={{fontWeight: 'bold'}}>403 - Forbidden</h1>
            <p>You do not have permission to access this page.</p>
        </div>
        {children}
    </div>
    );
};