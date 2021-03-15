const path = require('path');

// const isProduction = process.env.NODE_ENV === 'production';
const resolve = (...args) => path.resolve(__dirname, ...args);

const alias = {
  '@': path.join(__dirname, 'src'),
};
alias['@nextgis-misc'] = resolve('@nextgis-misc');

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts'],
      alias,
    },
  },

  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/core/style";',
        // ...(isProduction ? { implementation: require('node-sass') } : {}),
      },
    },
  },
  devServer: {
    host: 'localhost',
    // proxy: 'http://aeronet.staging.nextgis.com',
    proxy: 'http://localhost:8000',
    // }
  },

  chainWebpack: (config) => {
    // Disable Prefetch
    config.plugins.delete('prefetch');

    // Config svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
};
