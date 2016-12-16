// Configuration
const IS_DEV = true;

let webpack = require("webpack");
let webcopy = require("copy-webpack-plugin");
let path    = require("path");
let clean   = require("clean-webpack-plugin");


let plugins = [
    new clean("./dist/public/**/*"),

    new webcopy([
        {from: "development/public/resources/", to: "resources"},
        {from: "./development/public/index.html"},
    ])
]

// If it's not development mode then compress
if (!IS_DEV) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: true}
    }));
}

module.exports = {
    context: __dirname,
    entry: "./development/public/src/main.ts",

    output: {
        path:     "./dist/public",
        filename: "bundle.js",
    },

    devtool: "source-map",
    plugins: plugins,

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },

    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },

    progress: true,
    colors: true,
    profile: true,
    debug: IS_DEV
};