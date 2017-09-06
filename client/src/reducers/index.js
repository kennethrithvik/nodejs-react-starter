import { combineReducers } from 'redux';
import client from '../store/configureApollo';
// import all reducers here.
import SampleReducer from './sampleReducer';

const rootReducer = combineReducers({
  // use the imported reducers here.
  sampleReducer: SampleReducer,
  apollo: client.reducer()
});

export default rootReducer;