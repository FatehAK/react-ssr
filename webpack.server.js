const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');

const serverConfig = {
    //we inform webpack that we are building a bundle for node.js
    //rather than for the browser
    target: 'node',

    //specify entrypoint for our server app
    entry: './src/server/index.js',

    //tell webpack where to put the output file that is generated
    // __dirname points to our project root working directory
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    //this will tell webpack to not bundle any libraries into our output bundle on the server if that library exists inside the node_modules folder
    externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, serverConfig);
