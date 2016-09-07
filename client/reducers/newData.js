import { ADD_DATA } from '../actions/types';

// var data = {
//     name: "Daveo",
//     favoriteColor: "red"
// }
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
