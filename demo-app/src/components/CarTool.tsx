import React from 'react';

import { Car } from '../models/Car';
import { ToolHeader } from './ToolHeader';
import { CarTable } from './CarTable';
import { CarForm } from './CarForm';

interface CarToolState {
    cars: Car[];
};

interface CarToolTypeProps {
    cars : Car[];
}

export class CarTool extends React.Component<CarToolTypeProps,CarToolState> {

    state = {
        cars: this.props.cars.concat(),
    }

    addCar = (submittedCar: Car) => {
        this.setState({
            cars: [ ...this.state.cars, submittedCar ]
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

    getNewId = () => {
        var newId = 1;
        if(this.state.cars.length){
            newId = Math.max(...this.state.cars.map(car => car.id), 0) + 1;
        }

        return newId;
    }

    render() {
        return <>
            <ToolHeader headerText="Car Tool" />
            <CarTable cars={this.state.cars} onDeleteCarHandler={this.deleteCar} />
            <CarForm onSubmitCar={this.addCar} onGetId={this.getNewId} />
        </>
    }

};
