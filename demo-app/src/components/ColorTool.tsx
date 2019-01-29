import React from 'react';

import { ToolHeader } from './ToolHeader';
import { ColorForm } from './ColorForm';

interface ColorToolProps {
    colors: string[];
}

interface ColorToolState {
    colors: string[]
}

export class ColorTool extends React.Component<ColorToolProps,ColorToolState> {
    state = {
        colors: this.props.colors.slice(),
    }

    

    addColor = (color: string) => {
        if(!color) return;
        this.setState({
            colors: this.state.colors.concat(color),
        });
    }

    render () {
        return <>
            <ToolHeader headerText="Color Tool" />
            <ul>
                {
                    this.state.colors.map(color => 
                        <li key={color}>{color}</li>
                    )
                }
            </ul>

            <ColorForm onSubmitColor={this.addColor} />
        </>
    }
}
