import { combineReducers, createStore } from "redux";
import ProductReducer from "../Reducers/ProductReducer";
import CategoryReducer from "../Reducers/CategoryReducer";
import AccountReducer from "../Reducers/AccountReducer";
import ConfigReducer from "../Reducers/ConfigReducer";

const reducers=combineReducers({
    product:ProductReducer,
    category:CategoryReducer,
    account:AccountReducer,
    config:ConfigReducer
});

const rootReducer=(state,action)=>{
    if(action.type==="reset")
    {
        state=undefined;
    }
    return reducers(state, action)
}
const MainStore=createStore(rootReducer);

export default MainStore;