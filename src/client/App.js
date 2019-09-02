import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { fetchCurrentUser } from './actions';

//App has routes props passed to it
//use it to render the corresponding routed components using renderRoutes()
const App = ({ route }) => {
    return (
        <div>
            <Header />
            {renderRoutes(route.routes)}
        </div>
    );
};

const loadData = (store) => {
    //manually dispatch the action creator
    //returns a promise with which we can check if data is obtained
    return store.dispatch(fetchCurrentUser());
};

export default {
    component: App,
    loadData
};
