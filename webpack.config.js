const path = require('path');

module.exports = {
  entry: {
    home: './src/scripts/home.ts',
    boletim: './src/scripts/home.boletim.ts',
    aluno: './src/scripts/home.aluno.ts',
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