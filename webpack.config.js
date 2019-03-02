const path = require("path");

module.exports = {
    entry: path.join(__dirname, './src/FixScroll/index.jsx'),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'fix-scroll.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        },
        {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    cacheDirectory: true
                }
            },
        }]
    }
};