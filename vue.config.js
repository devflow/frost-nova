module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config.plugin('VuetifyLoaderPlugin').tap(_args => [{
      progressiveImages: true
    }])
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessWatch: [
        'src/plugins/proxy.js',
        'src/plugins/ak_data.js'
      ],
      builderOptions: {
        appId: 'kr.devflow.frostnova',
        productName: 'FrostNova',
        win: {
          icon: 'build/icon.ico'
        }
      }
    },
    i18n: {
      locale: 'ko',
      fallbackLocale: 'ko',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
