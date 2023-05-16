const path = require('path');

module.exports = {
  entry: {
    index: './src/scripts/index.ts',
    home: './src/scripts/home.ts',
    status: './src/scripts/settings/status.ts',
    cadastros: './src/scripts/home.cadastro.ts',
    filtros: './src/scripts/home.filters.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'src', 'public', 'dist'),
  },
};