import React from 'react';

export const ColorTool = () => {

    const colors =  [ 'blue', 'green', 'purple', 'pink', 'brown' ];

    return <>
        <header>
            <h1>Color Tool</h1>
        </header>
        <ul>
            {
                colors.map(color => <li key={color}>{color}</li>)
            }
        </ul>
    </>
}