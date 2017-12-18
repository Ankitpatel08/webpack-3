
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const extractSass = new ExtractTextPlugin('[name].css');
const fs = require('fs-extra');

/**
 * [COPY_ARRAY description]
 * @type {Array}
 */
const COPY_ARRAY = []

/**
 * [apps description]
 * @type {[type]}
 */
var apps = process.env.APPS ? process.env.APPS : process.env.npm_config_APPS;

if (typeof apps == 'string') {
    apps = apps.split(',');
}

/**
 * [CONFIG description]
 * @type {Object}
 */
const CONFIG = {
    entry: {},
    devtool: 'source-map',
    devServer: {
        contentBase: './dist'
    }
}

/**
 * [for description]
 * @param  {[type]} var i             in apps [description]
 * @return {[type]}     [description]
 */
for (var i in apps) {
    CONFIG.entry[apps[i] + '/js/' + apps[i]] = './src/' + apps[i] + '/js/' + apps[i] + '.js';

    /**
     * [from description]
     * @type {[type]}
     */
    COPY_ARRAY.push({
        from: path.resolve('./src/' + apps[i] + '/img'),
        to: path.resolve('./dist/' + apps[i] + '/img')
    });

    COPY_ARRAY.push({
        from: path.resolve('./src/' + apps[i] + '/index.html'),
        to: path.resolve('./dist/' + apps[i] + '/index.html')
    });
}

/**
 * [output description]
 * @type {Object}
 */
CONFIG.output = {
    path: path.resolve('./dist/'),
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[name].js'
};

/**
 * [module description]
 * @type {Object}
 */
CONFIG.module = {
    rules: [
            {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                path.resolve('./node-modules/')
                            ]
                        }
                    }
                ]
            })
        }
    ]
};

/**
 * [plugins description]
 * @type {Array}
 */
CONFIG.plugins = [
    function() {
        this.plugin('done', function(stats) {
            if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
                console.log(stats.compilation.errors);
                process.exit(1); // or throw new Error('webpack build failed.');
            }
        });
    },
    extractSass,
    function() {
        // copy css file into css/main.css
        this.plugin('done', function(statsData) {
            for (var i in apps) {
                console.log('APP: ', apps[i]);

                var generatedPath = path.join('./dist/' + apps[i]);
                var dir = path.join('./dist/' + apps[i] + '/css');

                var mainCssPath = path.join('js', apps[i]) + '.css';
                var mainCssOutputPath = 'main.css';

                // create css directory
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }

                // copy to main.css
                fs.copy(path.join(generatedPath, mainCssPath), path.join(dir, mainCssOutputPath));
            }
        })
    }
]

/**
 * @property {object} CONFIG.plugins
 */
CONFIG.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

/**
 * @property {object}  CONFIG.plugins
 */
CONFIG.plugins.push(new CopyWebpackPlugin(COPY_ARRAY));

module.exports = CONFIG;
