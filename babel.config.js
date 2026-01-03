module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@entities': './src/entities',
            '@features': './src/features',
            '@widgets': './src/widgets',
            '@shared': './src/shared',
            '@pages': './src/pages',
            '@app': './src/core',
            '@processes': './src/processes',
          },
        },
      ],
    ],
  };
};
