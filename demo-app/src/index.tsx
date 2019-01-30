import React from 'react';
import ReactDOM, { render } from 'react-dom';

export enum CalcActions {
  ADD = '[Calc] Add',
  SUBTRACT = '[Calc] Subtract',
  MULTIPLY = '[Calc] Multiply',
  DIVIDE = '[Calc] Divide,'
}
export interface Action<T = any> {
  type: T;
}

export interface AnyAction extends Action {
  [ x: string ]: any
}

export interface CalcAction extends Action<string> {
  payload: number;
}
//                        // type definition of the function
// const createAddAction: (p: number) => CalcAction<string> =
//   (payload: number) => ({ type: CalcActions.ADD, payload }); // implementation of the function

export class CalcAddAction implements CalcAction {
  type = CalcActions.ADD;
  constructor(public payload: number) { }
  // payload: number;
  // constructor(payload: number) {
  //   this.payload = payload;
  // }
}

export class CalcSubtractAction implements CalcAction {
  type = CalcActions.SUBTRACT;
  constructor(public payload: number) { }
}

export class CalcMultiplyAction implements CalcAction {
    type = CalcActions.MULTIPLY;
    constructor(public payload: number) {}
}

export class CalcDivideAction implements CalcAction {
    type = CalcActions.DIVIDE;
    constructor(public payload: number) {}
}

export type CalcActionsUnion = CalcAddAction | CalcSubtractAction;

export type State = any;

export interface CalcState extends State {
  result: number;
}

// export type Reducer = <S extends State, A extends Action>(s: S, a: A) => S; 
// export type Reducer = (s: CalcState, a: CalcAction) => CalcState; 
export type Reducer<S extends State> = (s: S, a: Action ) => S;

// export let carsReducer: Reducer<CarToolState>;

// carsReducer = (state: CarToolState, action: CalcAction) => state;

export const calcReducer: Reducer<CalcState> = ( state: CalcState = { result: 0 }, action: Action ) => {

  const calcAction = action as CalcAction;
  
  switch(action.type) {
    case CalcActions.ADD:
      return { result: state.result + calcAction.payload };
    case CalcActions.SUBTRACT:
      return { result: state.result - calcAction.payload };
    case CalcActions.MULTIPLY:
        return { result: state.result * calcAction.payload};
    case CalcActions.DIVIDE: {
        return {result: state.result / calcAction.payload};
    }
    default:
      return state;
  }
};

// console.log(calcReducer({ result: 0}, { type: CalcActions.ADD, payload: 1 }));

export interface Store<S extends State> {
  getState: () => S;
  dispatch: (a: Action) => void;
  subscribe: (cb: Subscribe) => void;
}

export type Subscribe = () => void;
export type Unsubscribe = () => void;

export type CreateStore = <S>(reducer: Reducer<S>) => Store<S>;

export const createStore: CreateStore = <S extends State>(reducer: Reducer<S>) => {

  let currentState: S;
  const subscribers: Subscribe[] = [];

  return {
    getState: () => currentState,
    dispatch: (action: Action) => {
      currentState = reducer(currentState, action);
      subscribers.forEach(cb => cb());
    },
    subscribe: (cb: Subscribe) => {
      subscribers.push(cb);
    },
  };

};

const store: Store<CalcState> = createStore(calcReducer);

export type ActionsMap = {
    [ actionKey: string ]: (...params: any[]) => AnyAction;
}

export type BoundActionsMap = {
    [ actionKey: string ]: (...params: any[]) => void;
}

export type Dispatch = (action: Action) => void;

const bindActionCreators = (actionsMap: ActionsMap, dispatch: Dispatch) => {
    return Object.keys(actionsMap).reduce( (boundActions: BoundActionsMap, actionKey: string) => {
        boundActions[actionKey] = (...params: any[]) => dispatch(actionsMap[actionKey](...params));
        return boundActions;
    }, {}) as BoundActionsMap;
}

const {add, subtract, multiply, divide} = bindActionCreators({
    add: (value:number) => new CalcAddAction(value),
    subtract: (value:number) => new CalcSubtractAction(value),
    multiply: (value: number) => new CalcMultiplyAction(value),
    divide: (value: number) => new CalcDivideAction(value),
}, store.dispatch)

interface CalcToolProps {
    result: number;
    onAdd: (value: number) => void;
    onSubtract: (value: number) => void;
    onMultiply: (value: number) => void;
    onDivide: (value: number) => void;
}

interface CalcToolState {
    newNumber: number;
    [ x: string]: any; //Allows for the [e.target.name] call in the change() function
}

export class CalcTool extends React.Component<CalcToolProps, CalcToolState> {

    state = {
        newNumber: 0
    }

    change = ({ target : { name, value, type }}: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [ name ]: type === 'number' ?  Number(value) : value,
        }, () => {
            console.log(this.state)
        });
    }

    render() {
        return <>
            <p>Result: {this.props.result}</p>
            <label>Input</label>
            <input type="number" value={this.state.newNumber} name="newNumber" onChange={this.change}/>
            <div>
                <button onClick={() => this.props.onAdd(this.state.newNumber)}>+</button>
                <button onClick={() => this.props.onSubtract(this.state.newNumber)}>-</button>
                <button onClick={() => this.props.onMultiply(this.state.newNumber)}>X</button>
                <button onClick={() => this.props.onDivide(this.state.newNumber)}>/</button>
            </div>
        </>
    }
}

interface ContainerComponentProps {
    store: Store<CalcState>;
}

const connect = (mapStateToPropsFn: Function, mapDispatchToPropsFn: Function) => {
    return (PresentationalComponent: any) => {
        return class ContainerComponent extends React.Component<ContainerComponentProps> {

            dispatchProps: any;

            constructor(props: ContainerComponentProps){
                super(props);

                this.dispatchProps = mapDispatchToPropsFn(this.props.store.dispatch);
            }

            componentDidMount(){
                //this.storeUnsubscribe()
                this.props.store.subscribe(() => {
                    this.forceUpdate();
                })
            }

            componentWillUnmount() {
                //unsubscribe logic
                //this.storeUnsubscribe()
            }

            render() {
                return <PresentationalComponent {...this.dispatchProps} {...mapStateToPropsFn(this.props.store.getState())} />;
            }
        }
    }
}

const createCalcToolContainer = connect(
    (state: CalcState) => ({result: state.result}), // map state to props
    (dispatch: Dispatch) => bindActionCreators({
        onAdd: (value:number) => new CalcAddAction(value),
        onSubtract: (value:number) => new CalcSubtractAction(value),
        onMultiply: (value: number) => new CalcMultiplyAction(value),
        onDivide: (value: number) => new CalcDivideAction(value),
    }, dispatch)// map dispatch to props
);
const CalcToolContainer = createCalcToolContainer(CalcTool);

store.subscribe(() => {
    ReactDOM.render(
        <>
            <CalcToolContainer store={store} />
        </>,
        document.querySelector('#root')
    )
})

add(0)