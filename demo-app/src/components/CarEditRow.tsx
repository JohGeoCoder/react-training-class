import React from 'react';
import { Car } from '../models/Car';

interface CarEditRowProps {
    car: Car;
    onUpdateHandler: (savedCarData: Car) => void;
    onCancelHandler: (carId: number) => void;
}

interface CarEditRowState {
    make: string;
    model: string;
    year: number;
    color: string;
    price: number;
    [ x: string]: any; //Allows for the [e.target.name] call in the change() function
}

export class CarEditRow extends React.Component<CarEditRowProps, CarEditRowState> {
    state = {
        make: this.props.car.make,
        model: this.props.car.model,
        year: this.props.car.year,
        color: this.props.car.color,
        price: this.props.car.price,
    };

    change = ({ target : { name, value, type }}: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [ name ]: type === 'number' ?  Number(value) : value,
        }, () => {
            console.log(this.state)
        });
    };

    saveCar = () => {
        let carToSave: Car = {
            id: this.props.car.id,
            make: this.state.make,
            model: this.state.model,
            year: this.state.year,
            color: this.state.color,
            price: this.state.price
        };

        this.props.onUpdateHandler(carToSave);
    };

    render() {
        return <tr>
            <td>{this.props.car.id}</td>
            <td><input type="text" value={this.state.make} name="make" onChange={this.change} /></td>
            <td><input type="text" value={this.state.model} name="model" onChange={this.change} /></td>
            <td><input type="text" value={this.state.year} name="year" onChange={this.change} /></td>
            <td><input type="text" value={this.state.color} name="color" onChange={this.change} /></td>
            <td><input type="text" value={this.state.price} name="price" onChange={this.change} /></td>
            <td><button type="button" onClick={() => this.saveCar()}>Save</button></td>
            <td><button type="button" onClick={() => this.props.onCancelHandler(this.props.car.id as number)}>Cancel</button></td>
        </tr>
    };
};