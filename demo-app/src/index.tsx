import React from 'react';
import ReactDOM from 'react-dom';

import { HelloWorld } from './components/HelloWorld';
import { CarTool } from './components/exercise-1/CarTool';
import { ColorTool } from './components/ColorTool';

ReactDOM.render(
    <>
        <HelloWorld></HelloWorld>
        <CarTool />
        <ColorTool />
    </>
    ,
    document.querySelector('#root')
);