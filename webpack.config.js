const path = require("path");
const MyWebpackPlugin = require("./my-webpack-plugin");
const webpack = require("webpack");
const childProcess = require("child_process");

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
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    publicPath: './dist/',
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
                Build Date : ${new Date().toLocaleDateString()}
                Commit Version : ${childProcess.execSync("git -rev-parse --short HEAD")}
            `
        })
    ]
}

