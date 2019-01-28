import React from 'react';

import { Car } from '../../models/Car';

interface CarListTypeProps {
    cars : Car[];
}

export const CarTool = (props: CarListTypeProps) => {
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
                    props.cars.map(car => 
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
    </header>
};
