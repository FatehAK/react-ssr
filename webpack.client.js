const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const clientConfig = {
    //specify entrypoint for our client app
    entry: './src/client/index.js',

    //tell webpack where to put the output file that is generated
    // __dirname points to our project root working directory
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    }
};

module.exports = merge(baseConfig, clientConfig);
