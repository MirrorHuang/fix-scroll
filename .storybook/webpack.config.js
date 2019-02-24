const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
    defaultConfig.module.rules.push({
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
    });
    return defaultConfig;
};