import React from 'react'

interface ColorFormProps {
    onSubmitColor: (newColor: string) => void;
    buttonText?: string;
}

interface ColorFormState {
    color: string;
    [ x: string ]: any;
}

export class ColorForm extends React.Component<ColorFormProps, ColorFormState> {
    static defaultProps = { buttonText : 'Submit Color' }

    state = {
        color: '',
        buttonText: this.props.buttonText
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

    submitColor = () => {
        this.props.onSubmitColor(this.state.color);

        this.setState({
            color: ''
        })
    };


    render() {
        return <form>
            <div>
                <label htmlFor="color-input">New Color:</label>
                <input type="text" id="color-input" name="color" value={this.state.color} onChange={this.change}/>
            </div>
            <div>
                <button type="button" onClick={this.submitColor}>{this.state.buttonText}</button>
            </div>
        </form>
    }
}