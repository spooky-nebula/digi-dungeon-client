var path = require('path');

module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader'
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules'
      }
    }
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  },
  {
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: [
      'file-loader',
      {
        loader: 'image-webpack-loader',
        options: {
          name: 'assets/[hash].[ext]',
          mozjpeg: {
            progressive: true
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: [0.8, 0.9],
            speed: 4
          },
          gifsicle: {
            interlaced: false
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75
          }
        }
      }
    ]
  },
  {
    test: /\.(ttf|eot|svg)$/,
    exclude: path.join(__dirname, '/src/assets/'),
    use: {
      loader: 'file-loader',
      options: {
        name: 'fonts/[hash].[ext]'
      }
    }
  },
  {
    test: /\.(woff|woff2)$/,
    use: {
      loader: 'url-loader',
      options: {
        name: 'fonts/[hash].[ext]',
        limit: 5000,
        mimetype: 'application/font-woff'
      }
    }
  },
  {
    test: /\.proto$/i,
    type: 'asset/resource',
    generator: {
      filename: 'proto/[base]'
    }
  }
];
