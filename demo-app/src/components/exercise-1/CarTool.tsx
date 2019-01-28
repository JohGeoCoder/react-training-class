import React from 'react';

export const CarTool = () => {

    const cars = [ {
        id: 12,
        make: "Buick",
        model: "Century",
        year: "1991",
        color: "Blue",
        price: "10000"
    },
    {
        id: 17,
        make: "Honda",
        model: "Civic",
        year: "2014",
        color: "Silver",
        price: "19999"
    }]

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
                    cars.map(car => 
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
