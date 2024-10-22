const redux = require("redux");
const createStore = redux.createStore;
const produce = require("immer").produce;

const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

function updateAddress(street="123") {
  return {
    type: UPDATE_ADDRESS,
    payload: street,
  }
}

const initilState = {
  city: "LA",
  address: {
    door: 1,
    street: '426 lucifer street',
    landmark: 'lux building'
  }
}

const reducer = (state = initilState, action) => {
  switch(action.type) {
    case 'UPDATE_ADDRESS':
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      })
      // {
      //   ...state,
      //   address: {
      //     ...state.address, 
      //     street: action.payload,
      //   }
      // }
    default:
      return state;
  }
}

const store = createStore(reducer);
console.log("state", store.getState());

const unsubscribe = store.subscribe(() => console.log("updated state", store.getState()));

store.dispatch(updateAddress("999 ajith street"));

unsubscribe();
