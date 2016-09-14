import { ADD_DATA } from '../actions/types';

export default (state = [], action = {}) => {
  
  switch (action.type) {
    
    case ADD_DATA:
     return [
        ...state,
        action.dataPassed
      ];

    default: 
     return state;
  }
}
