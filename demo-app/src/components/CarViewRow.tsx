import React from 'react'

import { Car } from '../models/Car';

interface CarViewRowProps {
    carId: number;
    make: string;
    model: string;
    year: number;
    color: string;
    price: number;
}

export const CarViewRow = (props: CarViewRowProps) => {
    return <tr key={props.carId}>
    <td>{props.carId}</td>
    <td>{props.make}</td>
    <td>{props.model}</td>
    <td>{props.year}</td>
    <td>{props.color}</td>
    <td>{props.price}</td>
</tr>
}