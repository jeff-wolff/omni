const devMode = process.env.NODE_ENV !== 'production';
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// [hash], [chunkhash], [name], [id], [query], [contenthash]

module.exports = {
    mode: "development",
    entry: {
        main: "./src/js/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.css$/,
            exclude: /node_modules/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: path.resolve(__dirname, "dist/")
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        // modules: true
                    }
                },
                {
                    loader: 'postcss-loader',
                },
            ],
        }, ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '../build/[name].[hash].css'
        })
    ],
    devServer: {
        port: 8001,
        contentBase: "dist",
        stats: "minimal",
        open: true,
        // compress: true,
        // host: "0.0.0.0"
    },
}
