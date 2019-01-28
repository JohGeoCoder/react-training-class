import React from 'react';

interface ToolHeaderProps {
    headerText: string;
}

export const ToolHeader = ({ headerText }: ToolHeaderProps ) => {
    return <header>
        <h1>{headerText}</h1>
    </header>
}