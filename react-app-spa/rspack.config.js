import * as path from "node:path";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import ReactRefreshRspackPlugin from "@rspack/plugin-react-refresh";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { fileURLToPath } from "url";


import { mfConfig } from "./module-federation.config.js";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  context: __dirname,
  entry: {
    main: "./src/index.js",
  },
  resolve: {
    extensions: ["...", ".js", ".jsx"],
  },

  devServer: {
    port: 3001,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, "src")],
    hot: true,
    open: false,
  },
  output: {
    // You need to set a unique value that is not equal to other applications
    uniqueName: "react_app",
    path: path.resolve(__dirname, "dist"),
    // publicPath must be configured if using manifest
    publicPath: "http://localhost:3001/",
  },

  experiments: {
    css: false,
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.css$/i,
        type: "javascript/auto",
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ],
      },
      {
        test: /\.(js?|jsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "ecmascript",
                  jsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),

    new ModuleFederationPlugin(mfConfig),

    isDev ? new ReactRefreshRspackPlugin() : null,
  ].filter(Boolean),

  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
});
