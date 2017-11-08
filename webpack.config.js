var path = require('path');
//var webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './dev/index.js'],
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'bundle.min.js'/*,
        publicPath: '/src/'*/
    },
    module: {
        loaders: [
            {
                test: /(\.js|.jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ["es2015", "stage-2", "react"],
                    plugins: [
                        "transform-decorators-legacy",
                        'transform-regenerator',
                        "transform-do-expressions"
                    ]
                }
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
            },
            { 
                test: /(\.css|\.scss)$/,
                exclude: /flexboxgrid/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] 
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                /*exclude: /node_modules/,*/
                loader: 'file-loader?name=public/fonts/[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                loader: 'file-loader?name=[name].[ext]',
                /*exclude: /node_modules/*/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules',
                include: /flexboxgrid/
            }
        ]
    },
    devServer: {
        host: 'localhost',
        port: 8000,
        inline: true,
        publicPath: "/",
        contentBase: './src',
        historyApiFallback: true
    }
}

/*
si no esta haciendo bien el watcher (EN LINUX), puede ser porque se superaron el numero de watchers en el SO,
para superrar esta limitante entrar en una terminal como su y tipear:
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf ; sudo sysctl -p
*/
