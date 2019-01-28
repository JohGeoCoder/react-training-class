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

    render() {
        return <>
            <ToolHeader headerText="Car Tool" />
            <CarTable cars={this.state.cars} />
        </>
    }

};
