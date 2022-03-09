
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Webpack = require('webpack');
const path = require('path');
const os = require('os');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require('webpack-merge');

function getIPAdress() {
    var interfaces = os.networkInterfaces();
    
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

const IP = JSON.stringify(getIPAdress());

module.exports = (env, argv) => {

    const isProd = argv.mode === 'production';
    const conf = argv.conf || 'production'

    const common = {
        entry: {
            app: path.resolve(__dirname, './index.js')
        },
        devtool: 'eval-source-map',
        output: {
            filename: '[name].build.js',
            chunkFilename: '[name].chunk.js'
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.jpg$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1002
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                      'vue-style-loader',
                      'style-loader',
                      'css-loader',
                      'postcss-loader'
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        isProd
                        ? {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it use publicPath in webpackOptions.output
                                //   publicPath: '../'
                            }
                          }
                         : "style-loader",
                        'css-loader',
                        'postcss-loader',
                        'less-loader',
                ]
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                    }
                }
            ]
        },
        externals: {
            // vue: 'vue'
        },
        optimization: {
            splitChunks: {
                chunks: 'initial',
                cacheGroups: {
                    // common: {
                    //     name: 'vandor',
                    //     test: (module) => {
                    //         return /[\\/]node_modules[\\/]/.test(module.context)
                    //     },
                    //     chunks: 'initial',
                    //     minChunks: 1
                    // },
                    component: {
                        name: 'component',
                        test(module){
                            // console.log(module, /[\\/]components/.test(module.context));
                            return /[\\/]components/.test(module.context)
                        },
                        chunks: 'all',
                        minChunks: 2,
                        minSize: 300
                    },
                    // default: false
                }
            }
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
              }),
            new VueLoaderPlugin(),
            new Webpack.DefinePlugin({ IP })
        ]
    }

    const confMapping = {
        'production': () => require('./build/webpack.prod.config'),
        'delevement': () => require('./build/webpack.devconfig'),
        'umd': () => require('./build/webpack.umd.config')
    }

    confMapping[conf]
    
    const config = typeof confMapping[conf] === 'function' ? confMapping[conf](env, argv) : confMapping[conf];

    console.log(config);

    return merge(common, config);
    
}