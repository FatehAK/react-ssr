import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import clientStore from './clientStore';

//hydrate our app by attaching all event handlers etc.
//BrowserRouter looks at the address bar and figures out what the current path is
ReactDOM.hydrate(
    <Provider store={clientStore}>
        <BrowserRouter>
            <div>{renderRoutes(routes)}</div>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);
