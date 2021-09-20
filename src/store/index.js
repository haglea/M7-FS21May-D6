import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk";
import likesReducer from "../reducers/likesReducer";
import jobsReducer from "../reducers/jobsReducer";

export const initialState = {
    likes: {
      elements: [],
    },
    jobs: {
      elements: [],
    },
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const mainReducer = combineReducers({
  likes: likesReducer,
  jobs: jobsReducer,
});

export default createStore(
    mainReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  )