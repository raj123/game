var webpack = require('webpack');
var path = require('path');
var nodeEnv = process.env.NODE_ENV || 'development';
var isProd = nodeEnv === 'production';
var config = {
   entry: './main.js',	
   output: {
      path:__dirname,
      filename: 'gamebundle.js',
   },	
   devServer: {
      inline: true,
      port: 8082
   },	
   module: {	   
      loaders: [
         {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',				
            query: {
               presets: ['es2015', 'react'],
			   plugins: ['react-html-attrs'],
            }
         }
      ]      
   },
   plugins: [ new webpack.optimize.UglifyJsPlugin({
               compress: {
                 warnings: false
               },
               minimize: true
             })]
}

module.exports = config;