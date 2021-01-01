const withSass = require("@zeit/next-sass")
require("dotenv").config()

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 2
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    }

    return config
  },
  webpack: config => {
    config.module.rules.forEach(rule => {
      if (rule.test && rule.test.toString().includes(".scss")) {
        rule.rules = rule.use.map(useRule => {
          if (typeof useRule === "string") {
            return { loader: useRule }
          }
          if (useRule.loader === "css-loader") {
            return {
              oneOf: [
                {
                  test: new RegExp(".global.scss$"),
                  loader: useRule.loader,
                  options: {}
                },
                {
                  loader: useRule.loader,
                  options: { modules: true }
                }
              ]
            }
          }
          return useRule
        })
        delete rule.use
      }
    })

    return config
  },
  env: {
    GITHUB_API:"https://api.github.com/search/users"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
})
