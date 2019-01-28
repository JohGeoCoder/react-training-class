import React from 'react';

interface ColorToolProps {
    colors: string[];
}

export const ColorTool = (props: ColorToolProps) => {
    return <>
        <header>
            <h1>Color Tool</h1>
        </header>
        <ul>
            {
                props.colors.map(color => 
                    <li key={color}>{color}</li>
                )
            }
        </ul>
    </>
}