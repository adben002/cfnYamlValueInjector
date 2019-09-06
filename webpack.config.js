'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


/* helper function to get into build directory */
function libPath(name) {
  if (undefined === name) {
    return 'dist';
  }
  return path.join(name);
}

const outputFilename = libPath('index.js');

console.log(outputFilename);
/* helper to clean leftovers */
function outputCleanup(dir) {
  if (false === fs.existsSync(libPath())) {
    return;
  }

  const list = fs.readdirSync(dir);
  for (let i = 0; i < list.length; i += 1) {
    const filename = path.join(dir, list[i]);
    const stat = fs.statSync(filename);

    if ((filename !== '.') && (filename !== '..')) {
      if (stat.isDirectory()) {
        // outputCleanup recursively
        outputCleanup(filename, false);
      } else {
        // rm fiilename
        fs.unlinkSync(filename);
      }
    }
  }
  fs.rmdirSync(dir);
}

/* precentage handler is used to hook build start and ending */
function percentageHandler(percentage) {
  if (0 === percentage) {
    /* Build Started */
    outputCleanup(libPath());
    console.log('Build started... Good luck!');
  }
}


module.exports = {
  entry: './src/main/index.ts',
  target: 'node',
  output: {
    filename: outputFilename,
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      'node_modules',
      'src',
    ]
  },
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: [{
        loader: 'tslint-loader'
      }]
    }, {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [{
        loader: 'ts-loader'
      }]
    }]
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    }),
    new webpack.ProgressPlugin(percentageHandler),
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true
    })
  ]
}
