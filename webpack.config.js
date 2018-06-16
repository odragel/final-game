const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
    entry: './src/app.js',
    output: {
        path: distPath,
        filename: '[name].[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './index.html'
        })
      ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            },
            { 
              type: 'javascript/auto',
              test: /\.json$/,
              loader: 'json-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
         /*   {
                test: /\.mp3$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
            }},*/
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                  loader: 'file-loader',
                  options: {
                    name: '[path][name].[ext]'
                  }
                }, {
                  loader: 'image-webpack-loader',
                  options: {
                    mozjpeg: {
                      progressive: true,
                      quality: 70
                    }
                  }
                },
                ],
              }
        ]
    },
    devServer: {
      contentBase: distPath,
      port: 9000,
      compress: true,
      open: true
    }
};


