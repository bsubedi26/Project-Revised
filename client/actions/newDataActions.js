import { ADD_DATA } from './types';

export function addNewData(dataPassed) {
  return {
    type: ADD_DATA,
    dataPassed
  }
}
