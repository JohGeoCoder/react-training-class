
import { bindActionCreators, Dispatch} from 'redux';
import { connect } from 'react-redux';

import { CalcTool } from '../components/CalcTool';
import { CalcAddAction, CalcSubtractAction, CalcMultiplyAction, CalcDivideAction } from '../actions/calc.actions';
import { CalcState } from '../models/CalcState';


const createCalcToolContainer = connect(
    (state: CalcState) => ({ result: state.result }), // map state to props
    (dispatch: Dispatch) => bindActionCreators({
      onAdd: (value: number) => new CalcAddAction(value),
      onSubtract: (value: number) => new CalcSubtractAction(value),
      onMultiply: (value: number) => new CalcMultiplyAction(value),
      onDivide: (value: number) => new CalcDivideAction(value),
    }, dispatch), // map dispatch to props
  );
  
  export const CalcToolContainer = createCalcToolContainer(CalcTool);