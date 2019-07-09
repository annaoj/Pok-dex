const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const withOptimizedImages = require('next-optimized-images');
const webpack = require('webpack');
const withCss = require('@zeit/next-css');
module.exports = withOptimizedImages(withCss(
  
    {
      handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],

      webpack: (config, {dev, isServer}) => {

         if (isServer) {
            return config;
         }

         var isProduction = config.mode === 'production';
         if (!isProduction) {
            return config;
         }
         config.plugins.push(
            new webpack.optimize.LimitChunkCountPlugin({
               maxChunks: 1,
            }),
            new SWPrecacheWebpackPlugin({
              minify: true,
              staticFileGlobsIgnorePatterns: [/\.next\//],
              runtimeCaching: [
                {
                  handler: "networkFirst",
                  urlPattern: /^https?.*/
                }
              ]
            })
         );
         return config
      }
   }
));