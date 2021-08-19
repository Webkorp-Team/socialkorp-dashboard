const path = require('path');

module.exports = {
  future: {
    webpack5: true,
  },
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
    }
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    // To test "npm link"ed packages with peer dependencies
    // config.resolve.alias['styled-components'] = path.resolve('./node_modules/styled-components');
    // config.resolve.alias['react'] = path.resolve('./node_modules/react');

    // Adding SVG support
    config.module.rules.push({
      test: [/\.svg$/, /\.woff$/],
      loader: 'file-loader',
      options: {
          name: '[name].[hash:8].[ext]',
          publicPath: `/_next/static/images/`, //specify the base path
          outputPath: 'static/images', //and output path
      }
    });

    return config;
  },
}
