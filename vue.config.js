module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config.plugin('VuetifyLoaderPlugin').tap(args => [{
      progressiveImages: true
    }])
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessWatch: ['src/plugins/proxy.js', 'src/plugins/ak_data.js'],
      builderOptions: {
        "appId": "com.example.app",
        "productName": "FrostNova",
        "win": {
          'icon': 'build/icon.ico',
        },
      }
    }
  }
}