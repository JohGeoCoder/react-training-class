import { CalcActions, CalcActionsUnion } from '../actions/calc.actions';
import { CalcState } from '../models/CalcState';


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