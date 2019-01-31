import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from  'redux-devtools-extension';
import { calcReducer } from './reducers/calcReducer';

import { actionFromClassMiddleware } from './middleware/actionFromClass';

export const calcToolStore = createStore(calcReducer, composeWithDevTools(applyMiddleware(actionFromClassMiddleware)));