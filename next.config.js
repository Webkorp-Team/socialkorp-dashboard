const path = require('path');

module.exports = {
  future: {
    webpack5: true,
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
      '/dashboard': { page: '/dashboard' },
      '/users': { page: '/users' },
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
