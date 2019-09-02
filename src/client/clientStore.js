import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from './reducers';

//client side axios instance
const axiosInstance = axios.create({
    baseURL: '/api'
});

//hydrate the client side redux state with server side redux state using window.INITIAL_STATE
//thunk.withExtraArgument(axios) - to pass axios instance to redux thunk
const clientStore = createStore(
    reducers,
    window.INITIAL_STATE,
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

export default clientStore;
