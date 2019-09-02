import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../client/reducers';

const serverStore = (req) => {
    //server side axios needs the entire url since proxy is not used here
    //extract cookie from request and add it to headers
    //not all requests can have cookies so handle that case as well
    const axiosInstance = axios.create({
        baseURL: 'http://react-ssr-api.herokuapp.com',
        headers: { cookie: req.get('cookie') || '' }
    });
    const store = createStore(
        reducers,
        {},
        applyMiddleware(thunk.withExtraArgument(axiosInstance))
    );
    return store;
};

export default serverStore;
