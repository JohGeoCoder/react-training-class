import React from 'react';
import ReactDOM from 'react-dom';

import { HelloWorld } from './components/HelloWorld';
import { CarTool } from './components/exercise-1/CarTool';
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
        <HelloWorld></HelloWorld>
        <CarTool cars={carList} />
        <ColorTool colors={colorList} />
    </>
    ,
    document.querySelector('#root')
);