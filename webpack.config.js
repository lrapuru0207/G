const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let isProd = process.env.NODE_ENV === 'production';
let moduleOutFolder = path.resolve(__dirname, `extension/dist`);

module.exports = {
    entry: './src/app/index.js',
    output: {
        path: moduleOutFolder,
        filename: "app.js"
	},
	plugins: [
		new ExtractTextPlugin({
            filename:"app.css",
			allChunks: true
        })
	],
    devtool: isProd ? undefined : "eval-source-map",
    module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /(\.scss)|(\.css)/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{ loader: 'css-loader', options: { minimize: isProd }}, "sass-loader"]
				})
			}
		]
	},
}