const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");

// [hash]
// [chunkhash]
// [name]
// [id]
// [query]
// [contenthash]
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
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, options: {
                            publicPath: path.resolve(__dirname,"dist/")
                    } },
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: {
                        ident: 'postcss',
                        plugins: () => [
                            postcssImport(),
                            postcssPresetEnv({
                                browsers: 'last 2 versions',
                                stage: 1,
                                features: {
                                    'color-mod-function': {
                                        unresolved: 'warn'
                                    },
                                    'custom-properties': {
                                        preserve: false
                                    },
                                    'nesting-rules': true
                                }
                            })
                        ]
                    } },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    devServer: {
        port: 8000,
        contentBase: "dist",
        stats: "minimal",
        open: true,
        // compress: true,
        // host: "0.0.0.0"
    },
}
