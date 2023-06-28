const path = require("path");
const Dotenv = require('dotenv-webpack');
module.exports = {
  entry: "./src/scripts/main.js",
  plugins: [
    new Dotenv()
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".*", ".js"],
    fallback: {
      crypto: false,
    },
  },
  output: {
    path: path.resolve(__dirname, "dist", "scripts"),
    publicPath: "/",
    filename: "main.js",
  },
  stats: {
    colors: true,
  },
  mode: "production",
  devtool: "source-map",
};
