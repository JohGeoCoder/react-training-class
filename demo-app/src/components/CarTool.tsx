import React from 'react';

import { Car } from '../models/Car';
import { ToolHeader } from './ToolHeader';
import { CarTable } from './CarTable';

interface CarToolState {
    make: string;
    model: string;
    year: number;
    color: string;
    price: number;
    [ x: string]: any; //Allows for the [e.target.name] call in the change() function

    cars: Car[];
};

interface CarToolTypeProps {
    cars : Car[];
}

export class CarTool extends React.Component<CarToolTypeProps,CarToolState> {

    state = {
        make: '',
        model: '',
        year: 0,
        color: '',
        price: 0,
        cars: this.props.cars.concat(),
    }

    change = ({ target : { name, value, type }}: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [ name ]: type === 'number' ?  Number(value) : value,
        }, () => {
            console.log(this.state)
        });
    }

    addCar = () => {

        var newId = 1;
        if(this.state.cars.length){
            newId = Math.max(...this.state.cars.map(car => car.id), 0) + 1;
        }

        var newCar = {
            id: newId,
            make: this.state.make,
            model: this.state.model,
            year: this.state.year,
            color: this.state.color,
            price: this.state.price
        }

        this.setState({
            make: '',
            model: '',
            year: 0,
            color: '',
            price: 0,
            cars: [ ...this.state.cars, newCar ]
        }, () => {
            console.log(this.state.cars)
        })
    }

    deleteCar = (carToDelete: number) => {
        this.setState({
            cars: this.state.cars.filter(car => {
                return car.id !== carToDelete
            })
        })
    }

    render() {
        return <>
            <ToolHeader headerText="Car Tool" />
            <CarTable cars={this.state.cars} deleteCarHandler={this.deleteCar} />

            <div>
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
                        <button type="button" onClick={this.addCar}>Add Car</button>
                    </div>                 
                </form>
            </div>
        </>
    }

};
