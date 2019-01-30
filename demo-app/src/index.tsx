
export enum CalcActions {
  ADD = '[Calc] Add',
  SUBTRACT = '[Calc] Subtract',
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

export type CalcActionsUnion = CalcAddAction | CalcSubtractAction;

export type State = any;

export interface CalcState extends State {
  result: number;
}

export interface CarToolState extends State {
  cars: object[];
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

store.subscribe(() => {
  console.log('new state', store.getState());
})

store.dispatch(new CalcAddAction(1));
store.dispatch(new CalcSubtractAction(2));

// export const actions = [
//   new CalcAddAction(1),
//   new CalcSubtractAction(2),
//   new CalcAddAction(3),
//   new CalcSubtractAction(4),
//   new CalcAddAction(5),
// ];
