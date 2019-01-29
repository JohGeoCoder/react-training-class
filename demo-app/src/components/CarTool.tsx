import React from 'react';

import { Car } from '../models/Car';
import { ToolHeader } from './ToolHeader';
import { CarTable } from './CarTable';
import { CarForm } from './CarForm';

interface CarToolState {
    cars: Car[];
    carIdToUpdate: number;
};

interface CarToolTypeProps {
    cars : Car[];
};

export class CarTool extends React.Component<CarToolTypeProps,CarToolState> {

    state = {
        cars: this.props.cars.concat(),
        carIdToUpdate: 0,
    };

    //Add this new car to the collection of cars.
    addCar = (submittedCar: Car) => {
        var newId = 1;
        if(this.state.cars.length){
            newId = Math.max(...this.state.cars.map(car => car.id as number), 0) + 1;
        }

        submittedCar.id = newId;

        this.setState({
            cars: [ ...this.state.cars, submittedCar ],
            carIdToUpdate: 0
        }, () => {
            console.log(this.state.cars)
        })
    };

    //Delete the selected car
    deleteCar = (carIdToDelete: number) => {
        if(!carIdToDelete) return;

        this.setState({
            cars: this.state.cars.filter(car => {
                return car.id !== carIdToDelete
            }),
            carIdToUpdate: 0
        })
    }

    //Switch the selected Car to edit mode
    initializeCarUpdate = (carId: number) => {
        this.setState({
            carIdToUpdate: carId
        });
    };

    //Update the target car with new information
    updateCar = (newCarInformation: Car) => {

        let newCarArray = this.state.cars.slice();
        let carIndexToUpdate = newCarArray.findIndex(car => car.id === this.state.carIdToUpdate)

        newCarArray[carIndexToUpdate] = newCarInformation;

        //Set the state
        this.setState({
            cars: newCarArray,
            carIdToUpdate: 0
        })
    };

    //Cancel the car update
    cancelCarUpdate = () => {
        this.setState({
            carIdToUpdate: 0
        })
    };

    render() {
        return <>
            <ToolHeader headerText="Car Tool" />

            <CarTable cars={this.state.cars} 
                onDeleteCarHandler={this.deleteCar} 
                carIdToEdit={this.state.carIdToUpdate}
                onInitializeCarEdit={this.initializeCarUpdate}
                onUpdateCarHandler={this.updateCar}
                onCancelUpdateHandler={this.cancelCarUpdate} />

            <CarForm onSubmitCar={this.addCar} />
        </>
    };

};
