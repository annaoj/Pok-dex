const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const withOptimizedImages = require('next-optimized-images');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = withOptimizedImages(
  
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

         config.optimization.minimizer.push(
            new OptimizeCSSAssetsPlugin({})
         );

         return config
      }
   }
);