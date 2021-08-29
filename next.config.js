const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
      '/dashboard': { page: '/dashboard' },
      '/admin/users': { page: '/admin/users' },
      '/admin/users/edit': { page: '/admin/users/edit' },
      '/admin/users/add': { page: '/admin/users/add' },
      '/admin/users/delete': { page: '/admin/users/delete' },
      '/website': { page: '/website', query:{} },
      '/database': { page: '/database', query:{} },
      '/database/view': { page: '/database/view', query:{} },
      '/database/insert': { page: '/database/insert', query:{} },
      '/database/delete': { page: '/database/delete', query:{} },
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
