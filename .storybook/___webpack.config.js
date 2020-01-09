const path = require('path');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          configFile: path.resolve(__dirname, '../src/tsconfig.json')
        }
      },
      // Optional
      // {
      //   loader: require.resolve('react-docgen-typescript-loader')
      // },
    ],
  });

  config.module.rules.push(
    {
        test: /.tsx?$/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015', 'react']
        }
    }
  )
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
