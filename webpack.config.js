const path = require("path");

module.exports = {
    entry: {
        index: path.resolve(__dirname, "src", "index.ts"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename:'[name].js',
        libraryTarget: 'umd',
        library: 'AlstradocsEventService',
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "awesome-typescript-loader"
            },
        ]
    },
};

