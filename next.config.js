const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      ...defaultPathMap,
      '/admin/settings': { page: '/database', query:{table:'settings'} },
      '/admin/settings/view': { page: '/database/view', query:{table:'settings'} },
      '/admin/settings/insert': { page: '/database/insert', query:{table:'settings'} },
      '/admin/settings/delete': { page: '/database/delete', query:{table:'settings'} },
    }
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    // To test "npm link"ed packages with peer dependencies
    // config.resolve.alias['styled-components'] = path.resolve('./node_modules/styled-components');
    // config.resolve.alias['react'] = path.resolve('./node_modules/react');

    // Workaround for bug in Next 11. See https://github.com/vercel/next.js/issues/26130
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'))
    fileLoaderRule.exclude = /\.svg$/

    // Adding SVG support
    config.module.rules.push({
      test: [/\.svg$/, /\.woff$/],
      loader: require.resolve('file-loader'),
      options: {
          name: '[name].[hash:8].[ext]',
          publicPath: `/_next/static/images/`, //specify the base path
          outputPath: 'static/images', //and output path
      }
    });

    
    config.optimization.minimizer = [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: { evaluate: false }
        },
      }),
    ];

    return config;
  },
}
