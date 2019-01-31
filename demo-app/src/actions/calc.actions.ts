import { Action } from 'redux';

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