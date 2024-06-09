import { createStore, applyMiddleware ,combineReducers } from 'redux';
import logger from 'redux-logger';
import {thunk} from 'redux-thunk';
import axios from 'axios';

// Middleware is a way to extend the functionality of the Redux store by providing a third-party
// extension point between dispatching an action and the moment it reaches the reducer.
// logger.default is written purposely to avoid error

// action name constants 
const init = 'account/init';
const inc = 'account/increment';
const dec = 'account/decrement';
const incByAmt = 'account/incrementByAmt';
const getAccUserFulfilled = 'account/getAccoutUserFulfilled'
const getAccUserRejected = 'account/getAccoutUserRejected'
const getAccUserPending = 'account/getAccoutUserPending'
const incBonus = 'bonus/incrementBonus'

// store
const store = createStore(
  combineReducers({
  account:accountReducer,
  bonus :bonusReducer,
  }),
  applyMiddleware(logger.default, thunk) // Correct usage of middleware
);

// reducer
function accountReducer(state = { amount: 1 }, action) {
  // previous state
  switch (action.type) {
    case getAccUserRejected:
      return { ...state , error: action.error,pending:false };
    case getAccUserFulfilled:
      return { amount: action.payload ,pending:false  };
    case getAccUserPending:
      return { ...state , pending:true };
    case inc:
      return { amount: state.amount + 1 };
    case dec:
      return { amount: state.amount - 1 };
    case incByAmt:
      return { amount: state.amount + action.payload };
    default:
      return state;
  }
}

function bonusReducer(state = { points: 0 }, action) {
  switch (action.type) {
    case incBonus:
      return { points: state.points + 1 };
    case incByAmt:
      if(action.payload>=100)
        return { points: state.points + action.payload }; 
    default:
      return state
  }
}

// global state check
// console.log(store.getState());

// Action creator for async action
function getUserAccount() {
  return async function (dispatch, getState) {
    try {
      dispatch(getAccountUserPending());
      const { data } = await axios.get('http://localhost:3000/accounts/1');
      dispatch(getAccountUserFulfilled(data.amount));
      
    } catch (error) {
      dispatch(getAccountUserRejected(error.message))
    }
  };
}

function getAccountUserFulfilled(value) {
  return { type: getAccUserFulfilled, payload:value };
}

function getAccountUserRejected(error) {
  return { type: getAccUserRejected, payload:error };
}
function getAccountUserPending(error) {
  return { type: getAccUserPending };
}


function initUser(value) {
  return { type: init, payload:value };
}

function increment() {
  return { type: inc };
}

function decrement() {
  return { type: dec };
}

function incrementByAmt(value) {
  return { type: incByAmt, payload: value };
}

function incrementBonus() {
  return { type: incBonus };
}

setTimeout(() => {
  store.dispatch(getUserAccount(200));
}, 2000);


