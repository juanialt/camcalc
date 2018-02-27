import path from 'path';

import webpack, { DefinePlugin, LoaderOptionsPlugin } from 'webpack';
import WriteFilePlugin from 'write-file-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import Autoprefixer from 'autoprefixer';
import CssWring from 'csswring';
import KoutoSwiss from 'kouto-swiss';

import { assign } from 'lodash/fp';
import config from './webpack.config.babel';

export default assign(config, {
    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new CleanWebpackPlugin(['public'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new WriteFilePlugin(),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'index.html')
        }]),
        new LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                postcss: [
                    Autoprefixer({}),
                    CssWring({})
                ],

                stylus: {
                    use: [KoutoSwiss()]
                },

                imageWebpackLoader: {
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    },
                    svgo: {
                        plugins: [{
                            removeViewBox: false
                        }, {
                            removeEmptyAttrs: false
                        }]
                    }
                }
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            minify: true,
            mangle: true,
            sourceMap: false,
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
});
