import React from 'react';

import { ToolHeader } from './ToolHeader';

interface ColorToolProps {
    colors: string[];
}

interface ColorToolState {
    color: string;
    colors: string[],
    [ x: string]: any; //Allows for the [e.target.name] call in the change() function
}

export class ColorTool extends React.Component<ColorToolProps,ColorToolState> {
    state = {
        color: '',
        colors: this.props.colors.slice(),
    }

    //class arrow functions, not valid JS but used for
    //proper binding of "this" for the event function.
    change = ({ target : { name, value, type }}: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [ name ]: type === 'number' ?  Number(value) : value,
        }, () => {
            console.log(this.state.color)
        });
    };

    addColor = () => {
        if(!this.state.color) return;
        this.setState({
            colors: this.state.colors.concat(this.state.color),
            color: ''
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

            <form>
                <div>
                    <label htmlFor="color-input">New Color:</label>
                    <input type="text" id="color-input" name="color" value={this.state.color} onChange={this.change}/>
                </div>
                <div>
                    <button type="button" onClick={this.addColor}>Add Color</button>
                </div>
            </form>
        </>
    }
}
