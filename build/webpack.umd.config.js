
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    externals: [{ vue: 'Vue' }],
    output: {
        library: 'client',
        libraryTarget: 'umd'
    },
    plugins: [
        new HtmlPlugin({
            template: './index.html',
            vendors: []
        }),
    ]
};