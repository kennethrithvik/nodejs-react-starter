import * as types from '../actions/actionTypes';

export default function sampleReducer(state = {}, action) {
  switch (action.type) {
    case types.SAMPLE_ACTION:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}