
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const AssetsWebpackPlugin = require('assets-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {VueLoaderPlugin } = require("vue-loader")

module.exports = {
  entry: {
    index: './index.ts'
  },
  mode: 'development',
  devtool: 'none',
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      // vue-loader15.x以后不需要配置VueLoaderPlugin，<style>标签的lang属性依据webpack的loader来定义，如lang="less"，在这里配置less-loader即可
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  resolve: {
    // 注意在ts中引入.vue文件需要定义vue的typings，在typings目录下定义了vue-shims.d.ts
    extensions: [ '.tsx', '.ts', '.js', '.vue'],
    alias: {
      // 运行时版本，不支持template选项，如果要使用template请使用vue.esm.js
      'vue$': 'vue/dist/vue.runtime.esm.js'
    }
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // 注意要引入VueLoaderPlugin才能对vue进行加载
    new VueLoaderPlugin(),
    // 构建前会先清除生成目录，指定删除的文件目录
    new CleanWebpackPlugin(['dist']),
    // 对webpack打包文件进行输出，文件名为webpack-assets.json，可通过filename来进行自定义
    new AssetsWebpackPlugin({
      prettyPrint: true,
      useCompilerPath: true
    }),
    // webpack4.x建议使用MiniCssExtractPlugin来输出引用的css文件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: './src/index.html'
    })
  ]
}