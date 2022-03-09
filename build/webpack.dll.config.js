const path = require('path');
const Webpack = require('webpack');

const root = path.resolve(__dirname, '../')

module.exports = {
    mode: 'production',
    entry: {
        vendor: ['vue', 'vuex']
    },
    output: {
        path: path.join(root, 'vendor'),
        filename: '[name].dll.js',
        library: '[name]_library',
        libraryTarget: 'umd',
        // libraryExport: ['vuex']
    },
    plugins: [
        new Webpack.DllPlugin({
            context: root,
            name: '[name]_library',
            path: path.join(root, 'vendor', '[name]-manifest.json')
        })
    ]
}