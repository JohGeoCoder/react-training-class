import React from 'react';

import { Car } from '../models/Car';
import { ToolHeader } from './ToolHeader';
import { CarTable } from './CarTable';
import { CarForm } from './CarForm';

interface CarToolState {
    cars: Car[];
    carIdToEdit: number;

};

interface CarToolTypeProps {
    cars : Car[];
};

export class CarTool extends React.Component<CarToolTypeProps,CarToolState> {

    state = {
        cars: this.props.cars.concat(),
        carIdToEdit: 0,
    };

    addCar = (submittedCar: Car) => {
        var newId = 1;
        if(this.state.cars.length){
            newId = Math.max(...this.state.cars.map(car => car.id as number), 0) + 1;
        }

        submittedCar.id = newId;

        this.setState({
            cars: [ ...this.state.cars, submittedCar ]
        }, () => {
            console.log(this.state.cars)
        })
    };

    deleteCar = (carIdToDelete: number) => {
        if(!carIdToDelete) return;

        this.setState({
            cars: this.state.cars.filter(car => {
                return car.id !== carIdToDelete
            }),
            carIdToEdit: 0
        })
    }

    initializeCarEdit = (carId: number) => {
        this.setState({
            carIdToEdit: carId
        });
    };

    saveCar = (carToSave: Car) => {

        let carToEdit = this.state.cars.filter(car => car.id === carToSave.id)[0];

        carToEdit.make = carToSave.make;
        carToEdit.model = carToSave.model;
        carToEdit.year = carToSave.year;
        carToEdit.color = carToSave.color;
        carToEdit.price = carToSave.price;

        this.setState({
            cars: this.state.cars,
            carIdToEdit: 0
        })
    };

    cancelCarEdit = () => {
        this.setState({
            carIdToEdit: 0
        })
    };

    render() {
        return <>
            <ToolHeader headerText="Car Tool" />
            <CarTable cars={this.state.cars} 
                onDeleteCarHandler={this.deleteCar} 
                carIdToEdit={this.state.carIdToEdit}
                onInitializeCarEdit={this.initializeCarEdit}
                onSaveCarHandler={this.saveCar}
                onCancelEditHandler={this.cancelCarEdit} />
            <CarForm onSubmitCar={this.addCar} />
        </>
    };

};
