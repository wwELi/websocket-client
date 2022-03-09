
const Webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const fs = require('fs');

const needVendor = true;

const root = path.resolve(__dirname, '../')

function getVendorFilePath() {
    const vendors = fs.readdirSync(path.join(__dirname, '../vendor', 'vendor'))
    return needVendor ? vendors.map(filenPath => `vendor/${filenPath}`) : []
}

module.exports = {
    // externals: ['vue', 'vuex'],
    plugins: [
        // new Webpack.DllReferencePlugin({
        //     context: root,
        //     manifest: require('../vendor/vendor-manifest.json')
        // }),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../vendor', '*.js'),
        //         to: path.resolve(__dirname, '../dist')
        //     }
        // ]),
        new HtmlPlugin({
            template: './index.html',
            vendors: []
        }),
        // new BundleAnalyzerPlugin()
    ]
};