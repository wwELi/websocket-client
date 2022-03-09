const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    externals: [{ vue: 'Vue' }],
    plugins: [
        new HtmlPlugin({
            template: './index.html',
            vendors: []
        }),
    ]
}