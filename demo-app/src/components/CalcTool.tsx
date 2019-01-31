import React from 'react';

interface CalcToolProps {
    result: number;
    onAdd: (value: number) => void;
    onSubtract: (value: number) => void;
    onMultiply: (value: number) => void;
    onDivide: (value: number) => void;
  }
  
  interface CalcToolState {
    numInput: number;
  }
  
  export class CalcTool extends React.Component<CalcToolProps, CalcToolState> {
  
    state = {
      numInput: 0,
    }
  
    change = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>) =>
      this.setState({ numInput: Number(value )});
  
    render() {
      return <div>
        <div>Result: {this.props.result}</div>
        <div>Input: <input type="number" value={this.state.numInput} onChange={this.change} /></div>
        <button type="button" onClick={() => this.props.onAdd(this.state.numInput)}>+</button>
        <button type="button" onClick={() => this.props.onSubtract(this.state.numInput)}>-</button>
        <button type="button" onClick={() => this.props.onMultiply(this.state.numInput)}>*</button>
        <button type="button" onClick={() => this.props.onDivide(this.state.numInput)}>/</button>
      </div>
  
    }

}