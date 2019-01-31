import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators, Action, Dispatch, applyMiddleware} from 'redux';
import { connect, Provider } from 'react-redux';
import { composeWithDevTools } from  'redux-devtools-extension';

import { actionFromClassMiddleware } from './middleware/actionFromClass';
import { CalcTool } from './components/CalcTool';

export enum CalcActions {
  ADD = '[Calc] Add',
  SUBTRACT = '[Calc] Subtract',
  MULTIPLY = '[Calc] Multiply',
  DIVIDE = '[Calc] Divide',
}
//                        // type definition of the function
// const createAddAction: (p: number) => CalcAction<string> =
//   (payload: number) => ({ type: CalcActions.ADD, payload }); // implementation of the function

export class CalcAddAction implements Action<string> {
  type = CalcActions.ADD;
  constructor(public payload: number) { }
  // payload: number;
  // constructor(payload: number) {
  //   this.payload = payload;
  // }
}

export class CalcSubtractAction implements Action<string> {
  type = CalcActions.SUBTRACT;
  constructor(public payload: number) { }
}

export class CalcMultiplyAction implements Action<string> {
  type = CalcActions.MULTIPLY;
  constructor(public payload: number) { }
}

export class CalcDivideAction implements Action<string> {
  type = CalcActions.DIVIDE;
  constructor(public payload: number) { }
}

export type CalcActionsUnion = CalcAddAction | CalcSubtractAction | CalcMultiplyAction | CalcDivideAction;

export type State = any;

export interface CalcState {
  result: number;
}

// export type Reducer<S extends State> = (s: S, a: Action ) => S;

export const calcReducer = ( state: CalcState = { result: 0 }, action: CalcActionsUnion ) => {
  
  switch(action.type) {
    case CalcActions.ADD:
      return { result: state.result + action.payload };
    case CalcActions.SUBTRACT:
      return { result: state.result - action.payload };
    case CalcActions.MULTIPLY:
      return { result: state.result * action.payload };
    case CalcActions.DIVIDE:
      return { result: state.result / action.payload };
    default:
      return state;
  }
};

const store = createStore(calcReducer, composeWithDevTools(applyMiddleware(actionFromClassMiddleware)));

const createCalcToolContainer = connect(
  (state: CalcState) => ({ result: state.result }), // map state to props
  (dispatch: Dispatch) => bindActionCreators({
    onAdd: (value: number) => new CalcAddAction(value),
    onSubtract: (value: number) => new CalcSubtractAction(value),
    onMultiply: (value: number) => new CalcMultiplyAction(value),
    onDivide: (value: number) => new CalcDivideAction(value),
  }, dispatch), // map dispatch to props
);

const CalcToolContainer = createCalcToolContainer(CalcTool);


ReactDOM.render(
    <Provider store={store}>
        <CalcToolContainer />
    </Provider>
    , document.querySelector('#root')
);
