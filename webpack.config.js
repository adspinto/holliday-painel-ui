const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
        }),


        // new BundleAnalyzerPlugin(),


    ],
    // mode: 'development',
    mode: 'production',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'), //cria pasta public
        filename: 'bundle.js'
    },

    resolve: {
        extensions: [' ', '.js', '.jsx'],
        alias: {
            modules: __dirname + '/node_modules'
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'style-loader',
            },
            {
                test: /\.css$/,
                use: "css-loader"

            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|png|jpg)$/,
                loader: 'url-loader?limit=100000'
            },
        ]
    },
    devtool: 'source-map'
    // devtool: 'eval'
}