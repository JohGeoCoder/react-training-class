import React from 'react';

interface ToolHeaderProps {
    headerText: string;
}

export const ToolHeader = ({ headerText }: ToolHeaderProps ) => {
    return <header className="page-header">
        <h1 style={{color: 'blue', fontStyle: 'italic'}}>{headerText}</h1>
    </header>
}