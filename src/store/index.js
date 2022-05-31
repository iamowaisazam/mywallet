import { createStore } from 'redux'

const INITIAL_STATE = {
      loading:true,
      light_color:'#ef4fa6',
      primary_color: '#ee0290',
      contrast_color:'white'
  };

function Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'theme':{
        return {
            ...state, 
            primary_color: action.payload.primary_color,
           }
    }case 'loading':{
            return {
                ...state, 
                loading: action.payload.loading,
             }
    }default:
      return state
  }
}

export default store = createStore(Reducer);


// store.subscribe(() => console.log(store.getState()))
// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
// store.dispatch({ type: 'counter/incremented' })
// {value: 1}
// store.dispatch({ type: 'counter/incremented' })
// {value: 2}
// store.dispatch({ type: 'counter/decremented' })
// {value: 1}