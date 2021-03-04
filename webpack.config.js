const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "front-end", "src", "index.js"),
  output: { path: path.resolve(__dirname, "build"), filename: "index.bundle.js" },
  mode: process.env.NODE_ENV || "development",
  resolve: { modules: [path.resolve(__dirname, "src"), "node_modules"] },
  // devServer: {  },
  devServer:{
            contentBase: path.join(__dirname, "/front-end/src/index.html"),
            publicPath: '/',
            proxy: {
              "/" : 'http://localhost:3000/'
            }},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react',{
               'plugins': [
                   ["@babel/plugin-proposal-class-properties", { "loose": true }]
              ]}]
          }
      }},
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.join(__dirname, "src", "index.html"),
  //   }),
  // ],
};
