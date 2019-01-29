import React from 'react'

import { Car } from '../models/Car';
import { CarViewRow } from './CarViewRow';
import { CarEditRow } from './CarEditRow';

interface CarTableProps {
    cars: Car[];
    carIdToEdit: number,
    onInitializeCarEdit: (carId: number) => void;
    onDeleteCarHandler: (carId: number) => void;
    onUpdateCarHandler: (car: Car) => void;
    onCancelUpdateHandler: () => void;
};

export const CarTable = (props: CarTableProps) => {

    return <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Color</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.cars.map(car => {

                        //If this car is flagged for editing, display the CarEditRow component.
                        //Otherwise, display the CarViewRow component.
                        if(car.id === props.carIdToEdit){
                            return <CarEditRow key={car.id} car={car} onUpdateHandler={props.onUpdateCarHandler} onCancelHandler={props.onCancelUpdateHandler} />
                        } else{
                            return <CarViewRow key={car.id} car={car} onDeleteCarHandler={props.onDeleteCarHandler} onEditHandler={props.onInitializeCarEdit} />
                        }
                        
                    })
                }
            </tbody>
        </table>
}