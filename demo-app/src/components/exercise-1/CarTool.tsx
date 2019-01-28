import React from 'react';

import { Car } from '../../models/Car';

interface CarToolState {
    make: string;
    model: string;
    year: number;
    color: string;
    price: number;
    [ x: string]: any; //Allows for the [e.target.name] call in the change() function
};

interface CarToolTypeProps {
    cars : Car[];
}

export class CarTool extends React.Component<CarToolTypeProps,CarToolState> {

    change = ({ target : { name, value, type }}: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [ name ]: type === 'number' ?  Number(value) : value,
        }, () => {
            console.log(this.state)
        });
    }

    render() {
        return <header>
            <h1>Car Tool</h1>
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
                        this.props.cars.map(car => 
                            <tr key={car.id}>
                                <td>{car.id}</td>
                                <td>{car.make}</td>
                                <td>{car.model}</td>
                                <td>{car.year}</td>
                                <td>{car.color}</td>
                                <td>{car.price}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div>
                <h3>Add a new car</h3>
                <form>
                    <table>
                        <tr>
                            <td><label htmlFor="make">Make:</label></td>
                            <td><input type="text" name="make" onChange={this.change} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="model">Model:</label></td>
                            <td><input type="text" name="model" onChange={this.change} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="year">Year:</label></td>
                            <td><input type="number" name="year" onChange={this.change}  /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="color">Color:</label></td>
                            <td><input type="text" name="color" onChange={this.change}  /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="price">Price:</label></td>
                            <td><input type="number" name="price" onChange={this.change}  /></td>
                        </tr>
                    </table>                    
                </form>
            </div>
        </header>
    }

};
