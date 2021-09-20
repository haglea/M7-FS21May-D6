import { initialState } from '../store'

export default function likesReducer(
    state = initialState.likes,
    action
    ) {
        console.log(action, state);
        const { type, payload } = action;

    switch (type) {      
        case 'ADD_TO_FAV':
            return {          
                ...state,
                elements: [...state.elements, payload]
            }
        case 'REMOVE_FROM_FAV':
            return {          
                ...state,
                elements: state.elements.filter(company => company !== payload)
            }
      default:
        console.log('I fell into default!')
        return state 
    }
  }