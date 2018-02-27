import path from 'path';
import { LoaderOptionsPlugin } from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import KoutoSwiss from 'kouto-swiss';

module.exports = {
    entry: ['babel-polyfill', path.resolve(__dirname, './app/index.js')],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: './public'
    },

    devServer: {
        // publicPath: path.join(__dirname, '/public/'),

        publicPath: './public',
        contentBase: './public',

        historyApiFallback: true,

        // contentBase: './public',
        // path: '/public'
        // compress: true,
        port: 9090
        // progress: true  // invalid
    },

    devtool: '#source-map',

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['lib', 'node_modules']
    },

    plugins: [
        new CleanWebpackPlugin(['public'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new WriteFilePlugin(),
        new LoaderOptionsPlugin({
            options: {
                postcss: {},
                stylus: {
                    use: [KoutoSwiss()]
                }
            }
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'index.html')
        }])
    ],

    module: {
        rules: [
        //     {
        //     enforce: 'pre',
        //     test: /\.js[x]?$/,
        //     loader: 'eslint-loader',
        //     exclude: /node_modules/
        // },
            {
                test: /\.js[x]?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }, {
                test: /\.json?$/,
                use: ['json-loader']
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }, {
                test: /\.styl$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
            }, {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: '10000',
                        name: '[name].[ext]?[hash]',
                        publicPath: './',
                        outputPath: 'images/'
                    }
                }]
            }]
    }
};
