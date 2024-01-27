const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  publicPath: process.env.NODE_ENV === 'production'
    ? '/timesheetDeploy/'  // Change this to your repository name
    : '/',

  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },

  configureWebpack: { // Move the resolve option within configureWebpack
    resolve: {
      fallback: {
        stream: require.resolve("stream-browserify"),
        path: require.resolve("path-browserify"),
        crypto: require.resolve("crypto-browserify")
      }
    }
  }
})
