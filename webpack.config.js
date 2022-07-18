const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: ['./product-service/handler.js', './product-service/handler-product.js'],
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
