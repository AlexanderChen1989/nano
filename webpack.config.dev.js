const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const node_modules = __dirname+'/node_modules'
const src = __dirname + '/src'
const dist = __dirname + '/dist'


const GLOBALS = {
  'process.env.NODE_ENV': '"development"',
  __DEV__: true
}

module.exports = {
	entry: [
		src+'/app.jsx',
		'webpack-hot-middleware/client?reload=true'
	],
	output: {
		path: dist,
		publicPath: '/',
		filename: 'js/app.js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/, 
				exclude: /node_modules/, 
				loader: 'babel', 
				query: {
					presets: ['es2015', 'react', 'stage-1'], 
					plugins: [
						["import", {"libraryName": "antd", "style": true}],
						["transform-react-jsx", { "pragma": "h" }],
						["transform-decorators-legacy"]
					]
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract(
					'css!sass?includePaths[]='+node_modules
				)
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract(
					'css!less'
				)
			},
			{
				test: /\.(html|co)$/,
				loader: 'file?name=[name].[ext]'
			},
			{
				test: /\.(ttf|eot|svg|woff|woff2)(\?[a-z0-9=&.]+)?$/,
				loader : 'file?name=./font/[hash].[ext]'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin(GLOBALS),
		new ExtractTextPlugin('css/app.css'),
		new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoErrorsPlugin()	
	],
	resolve: {
		extensions: ['', '.js', '.jsx', '.scss']
	}
}
