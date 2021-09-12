import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./reducers";
import thunk from "redux-thunk"
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

export const configureStore =(initialState)=>{
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return(
        createStore(
            allReducers,initialState,composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())) 
        )
    );
}