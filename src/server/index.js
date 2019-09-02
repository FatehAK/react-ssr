import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import routes from '../client/routes';
import renderer from './renderer';
import serverStore from './serverStore';

const app = express();

//make our api requests go through our proxied render server
//`opts` to help redirect back to localhost after `login` completed
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3000';
        return opts;
    }
}));

//point to static assests (i.e the client bundle.js)
app.use(express.static('public'));

app.get('*', (req, res) => {
    //initialize the store before passing it to renderer
    //passing `req` to serverStore to extract the cookie
    const store = serverStore(req);

    //matchRoutes() looks at the list of routes and the user request, matches it and returns an array of components about to be rendered
    //so now we know given a url which component must be rendered
    //now we need to able to load data from redux without actually having to render the application again (using loadData())
    const promises = matchRoutes(routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null;
    }).map((promise) => {
        //handle rejection of Promise.all by making it always resolve no matter what by return returning resolved promises
        if (promise) {
            return new Promise((resolve, reject) => {
                promise.then(resolve).catch(resolve);
            });
        }
    });

    //take the array of promises and wait for all of them to resolve
    Promise.all(promises).then(() => {
        //and now render the app (since data fetching is complete)

        //use `context` obj to specify 404 errors and redirects
        const context = {};

        //pass in the `req` obj for the StaticRouter
        const content = renderer(req, store, context);

        if (context.url) {
            return res.redirect(302, context.url);
        }

        if (context.notFound) {
            res.status(404);
        }

        //send the rendered string component to browser
        res.send(content);
    }).catch(() => {
        res.send('Something went wrong');
    });
});

app.listen(3000, () => {
    console.log('Server is listening');
});
