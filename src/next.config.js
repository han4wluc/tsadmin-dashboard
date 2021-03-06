/* eslint-disable */
const withCss = require('@zeit/next-css');
const path = require('path');

module.exports = withCss({
  exportTrailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['~'] = path.join(path.resolve(__dirname));


    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];
    }
    return config;
  },
});
