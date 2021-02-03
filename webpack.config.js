const path = require("path");
const MyWebpackPlugin = require("./my-webpack-plugin");
const webpack = require("webpack");
const childProcess = require("child_process");
const { config } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 이것과 같음! 
// node_modules/.bin/webpack --mode development --entry ./src/app.js -o dist

module.exports = {
    mode: "development",
    entry: {
        main: "./src/app.js"
    },
    output: {
        path: path.resolve("./dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            // {
            //     // 처리 대상자
            //     test: /\.js$/,
            //     // 사용할 로더 명시
            //     use: [
            //         path.resolve("./my-webpack-loader.js")
            //     ]
            // }
            {
                test: /\.css$/,
                use: [
                    // process.env.NODE_ENV === "production"
                    //     ? MiniCssExtractPlugin.loader // 프로덕션 환경
                    //     : 
                        "style-loader", // 개발 환경
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    // publicPath: './dist/',
                    name: '[name].[ext]?[hash]',
                    limit: 20000, // 2kb 이상인 경우는 file-loader 가 실행됨.
                }
            }
        ]
    },
    plugins: [
        // new MyWebpackPlugin(),
        new webpack.BannerPlugin({
            banner: `
                Build Date : ${new Date().toLocaleString()}
                Commit Version : ${childProcess.execSync("git rev-parse --short HEAD")}
                Author : ${childProcess.execSync("git config user.name")}
            `
        }),
        new webpack.DefinePlugin({
            TWO: "1+1",
            TWO_STR: JSON.stringify("1+1"),
            'api.domain': JSON.stringify("https://github.com")
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            templateParameters: {
                env: process.env.NODE_ENV === "development" ? ("개발용") : ""
            },
            minify: process.env.NODE_ENV === "production" ? {
                collapseWhitespace: true,
                removeComments: true
            } : false
        }),
        new CleanWebpackPlugin(),
        // ...(process.env.NODE_ENV === "production"
        //     ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
        //     : []
        //     )
    ]
}

