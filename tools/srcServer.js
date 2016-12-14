// require the module as normal
const bs = require("browser-sync").create()
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware') 
const webpackHotMiddleware  = require('webpack-hot-middleware')
const config  = require('../webpack.config.dev')

const bundler = webpack(config)

// .init starts the server
bs.init({
    middleware: [
		webpackDevMiddleware(bundler, {
			publicPath: config.output.publicPath,
			stats: { colors: true }
		  }),
		webpackHotMiddleware(bundler)
	]
})
