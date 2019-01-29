import React from 'react';

import { Car } from '../models/Car';

interface CarFormProps {
    onSubmitCar: (newCar: Car) => void;
}

interface CarFormState {
    make: string;
    model: string;
    year: number;
    color: string;
    price: number;
    [ x: string]: any; //Allows for the [e.target.name] call in the change() function
}

export class CarForm extends React.Component<CarFormProps, CarFormState> {
    state = {
        make: '',
        model: '',
        year: 0,
        color: '',
        price: 0,
    }

    change = ({ target : { name, value, type }}: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [ name ]: type === 'number' ?  Number(value) : value,
        }, () => {
            console.log(this.state)
        });
    }

    submitCar = () => {

        let submittedCar: Car = {
            make: this.state.make,
            model: this.state.model,
            year: this.state.year,
            color: this.state.color,
            price: this.state.price
        }

        this.props.onSubmitCar(submittedCar);

        this.setState({
            make: '',
            model: '',
            year: 0,
            color: '',
            price: 0,
        })
    }

    render() {
        return <>
            <h3>Add a new car</h3>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="make">Make:</label></td>
                            <td><input type="text" name="make" value={this.state.make} onChange={this.change} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="model">Model:</label></td>
                            <td><input type="text" name="model" value={this.state.model} onChange={this.change} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="year">Year:</label></td>
                            <td><input type="number" name="year" value={this.state.year} onChange={this.change}  /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="color">Color:</label></td>
                            <td><input type="text" name="color" value={this.state.color} onChange={this.change}  /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="price">Price:</label></td>
                            <td><input type="number" name="price" value={this.state.price} onChange={this.change}  /></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button type="button" onClick={this.submitCar}>Add Car</button>
                </div>                 
            </form>
        </>
    }
}