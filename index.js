const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combinedReducers = redux.combineReducers;

const applyMiddleWare = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"
const ICECREAM_ORDERED = "ICECREAM_ORDERED"
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED"

function orderCake(){
  return {
    type: CAKE_ORDERED,
    payload: 1,
  }
}

function cakeRestocked(quantity=1){
  return {
    type: CAKE_RESTOCKED,
    payload: quantity,
  }
}

function orderIceCream(){
  return {
    type: ICECREAM_ORDERED,
    payload: 1,
  }
}

function iceCreamRestocked(quantity=1){
  return {
    type: ICECREAM_RESTOCKED,
    payload: quantity,
  }
}

const initialCakeState = {
  numOfCakes: 10,
}
const initialIceCreamState = {
  numOfIceCream: 20,
}

const cakeReducer = (state = initialCakeState, action) => {
  switch(action.type) {
    case 'CAKE_ORDERED':
      return {
        ...state, numOfCakes: state.numOfCakes-1
      }
    case 'CAKE_RESTOCKED':
      return {
        ...state, numOfCakes: state.numOfCakes+action.payload
      }
    default:
      return state;
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch(action.type) {
    case 'ICECREAM_ORDERED':
      return {
        ...state, numOfIceCream: state.numOfIceCream-1
      }
    case 'ICECREAM_RESTOCKED':
      return {
        ...state, numOfIceCream: state.numOfIceCream+action.payload
      }
    default:
      return state;
  }
}

const rootReducer = combinedReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleWare(logger));
console.log("intial state", store.getState());

const unsubscribe = store.subscribe(() => console.log("update state", store.getState()))

const actions = redux.bindActionCreators( { orderCake, cakeRestocked, orderIceCream, iceCreamRestocked }, store.dispatch);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.cakeRestocked(3);
actions.orderIceCream();
actions.orderIceCream();
actions.iceCreamRestocked(2);
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(cakeRestocked(3))

unsubscribe();
