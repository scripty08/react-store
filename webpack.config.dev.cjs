const merge = require('webpack-merge');
const {HotModuleReplacementPlugin} = require('webpack');
const common = require('./webpack.config.cjs');
const WebpackShellPlugin = require('webpack-shell-plugin');

const config = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: [
        `webpack-hot-middleware/client?path=/__webpack_hmr`
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new WebpackShellPlugin({
            onBuildStart:['echo "Webpack Start"'],
            onBuildEnd:['echo Server listening on: http://localhost:3000']})
    ],
    watchOptions: {
        poll: 1000,
        ignored: ['node_modules', 'public/dist/']
    },
};

module.exports = merge(common, config);
