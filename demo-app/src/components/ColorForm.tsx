import React, { useState, useEffect, useRef } from 'react'

interface ColorFormProps {
    onSubmitColor: (newColor: string) => void;
    buttonText?: string;
}

export const ColorForm = (props: ColorFormProps) => {

    const [ color, setColor ] = useState('');

    const colorInput = useRef<HTMLInputElement>(null); //React.createRef<HTMLInputElement>()

    //Manage side-effects. Runs after the render is complete.
    useEffect(() => {

        //Set the focus to the color input field.
        if(colorInput.current){
            colorInput.current.focus();
        }
    })

    const submitColor = () => {
        props.onSubmitColor(color);

        setColor('')
    };

    return <form>
        <div>
            <label htmlFor="color-input">New Color:</label>
            <input type="text" id="color-input" name="color" ref={colorInput} value={color} onChange={e => setColor(e.target.value)}/>
        </div>
        <div>
            <button type="button" onClick={submitColor}>{props.buttonText}</button>
        </div>
    </form>
}