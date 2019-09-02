import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import routes from '../client/routes';

//(req, store) from express
export default (req, store, context) => {
    //this string html does not contain any JS code such as event handlers etc.
    const content = renderToString(
        //StaticRouter (for SSR) needs to be told what exactly the current path is explicitly through `req` and it requires mandatory prop `context` which is passed down as prop `staticContext` to all components inside (used for redirects and error handling)
        //renderRoutes() takes an array of route objects and turns them into normal route components (the entire purpose is to figure out what set of components are about to be rendered given some particular url)
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                <div>{renderRoutes(routes)}</div>
            </StaticRouter>
        </Provider>
    );

    //customize the <head> tag
    const helmet = Helmet.renderStatic();

    //wrapping our string component within a root element
    //use window.INITIAL_STATE to hydrate the redux state on the client side
    //using serialize() to escape characters and prevent XSS attacks
    return `
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.INITIAL_STATE = ${serialize(store.getState())}
                </script>
                <script src="bundle.js"></script>
            </body>
        </html>
    `;
};
