const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/app.js',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
};
