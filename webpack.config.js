const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const { ENVIRONMENT } = process.env;

console.log({ ENVIRONMENT });

module.exports = {
    entry: './src/index.js',
    devtool: ENVIRONMENT === 'production' ? undefined : 'eval-source-map',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './build')
    },
    plugins: [
        new EnvironmentPlugin({
            ENVIRONMENT
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    to: 'public'
                }
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
            }
        }),
        new Dotenv(),
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|webm|mp4)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    optimization: {
        // Separate runtime code into a runtime chunk
        runtimeChunk: 'single',
        // Separate dependencies into a vendors chunk
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        overlay: true,
        stats: 'minimal',
        host: '0.0.0.0',
        disableHostCheck: true
    }
};
