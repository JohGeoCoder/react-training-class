import React from 'react'

import { Car } from '../models/Car';
import { CarViewRow } from './CarViewRow';

interface CarTableProps {
    cars: Car[];
}

interface CarTableState {
    make: string;
    model: string;
    year: number;
    color: string;
    price: number;
    [ x: string]: any; //Allows for the [e.target.name] call in the change() function

    cars: Car[];
};

export class CarTable extends React.Component<CarTableProps,CarTableState> {
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

    render() {
        return <>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Color</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.cars.map(car => 
                            <CarViewRow carId={car.id} make={car.make} model={car.model} year={car.year} color={car.color} price={car.price} />
                        )
                    }
                </tbody>
            </table>
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
}