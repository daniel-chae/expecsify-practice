const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test'){
    require('dotenv').config({ path: '.env.test' })
} else {
    require('dotenv').config({ path: '.env.development' })
};

module.exports = (env) => {
    const isProduction = env === 'production';
    return {
    mode: isProduction ? "production": "development",
    devtool: isProduction ? "source-map": "inline-source-map",
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public','dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{loader: 'babel-loader'}],
            exclude: /node_modules/
        }, {
            test: /.s?css$/,
            use: [
                MiniCssExtractPlugin.loader, 
                "css-loader",
                "sass-loader"
            ]
        }
    ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.EnvironmentPlugin([
            'FIREBASE_API_KEY',
            'FIREBASE_AUTH_DOMAIN',
            'FIREBASE_DATABASE_URL',
            'FIREBASE_PROJECT_ID',
            'FIREBASE_STORAGE_BUCKET',
            'FIREBASE_MESSAGING_SENDER_ID'
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),  //where html is located
        historyApiFallback: true,
        publicPath: '/dist/' //where js is located
      }
}}