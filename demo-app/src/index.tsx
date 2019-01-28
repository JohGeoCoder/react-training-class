import React from 'react';
import ReactDOM from 'react-dom';

import { HelloWorld } from './components/HelloWorld';
import { CarTool } from './components/exercise-1/CarTool';
import { ColorTool } from './components/ColorTool';

const colorList =  [ 'blue', 'green', 'purple', 'pink', 'brown' ];

ReactDOM.render(
    <>
        <HelloWorld></HelloWorld>
        <CarTool />
        <ColorTool colors={colorList} />
    </>
    ,
    document.querySelector('#root')
);