import React from 'react';

import './ToolHeader.css';

interface ToolHeaderProps {
    headerText: string;
}

export const ToolHeader = React.memo(({ headerText }: ToolHeaderProps ) => {
    return <header className="tool-header page-header">
        <h1 style={{color: 'blue', fontStyle: 'italic'}}>{headerText}</h1>
    </header>
});