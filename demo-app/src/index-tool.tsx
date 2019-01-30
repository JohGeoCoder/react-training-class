import React from 'react';
import ReactDOM from 'react-dom';

import { CarTool } from './components/CarTool';
import { ColorTool } from './components/ColorTool';

import { Car } from './models/Car';

const colorList =  [ 'blue', 'green', 'purple', 'pink', 'brown' ];

const carList : Car[] = [ {
    id: 12,
    make: "Buick",
    model: "Century",
    year: 1991,
    color: "Blue",
    price: 10000
},
{
    id: 17,
    make: "Honda",
    model: "Civic",
    year: 2014,
    color: "Silver",
    price: 19999
}];

ReactDOM.render(
    <>
        <CarTool cars={carList} />
        <ColorTool colors={colorList} />
    </>
    ,
    document.querySelector('#root')
);