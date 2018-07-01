let path = require('path');
let webpack = require('webpack');
let serverHost = "localhost";
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/dist/',
        filename: "bundle.js"
    },
    //加载器
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.html$/,
                loader: "raw-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=images/[hash].[ext]'
            }
        ]
    },
    vue: {
        loaders: {
            scss: ['vue-style-loader', 'css', 'sass'].join('!')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:"test3",
            filename:"./dist/index.html",//输出html文件，打包时插入js,不用自己手动引入
            inject: 'body',  //js插入的位置，true/'head'/'body'/false
            hash: true
        }),
    ],
    //使用webpack-dev-server
    devServer: {
        contentBase: './',
        host: serverHost,
        port: 9090, //默认9090
        inline: true, //可以监控js变化
        hot: true//热启动
    },
    //使用vue2.x的一个配置
    resolve: {
        alias: {vue: 'vue/dist/vue.js'}
    }
};
