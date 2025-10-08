import * as path from "node:path";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { VueLoaderPlugin } from "vue-loader";
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
    port: 3002,
    historyApiFallback: true,
    hot: true,
    open: false,
    watchFiles: [path.resolve(__dirname, "src")],
  },

  output: {
    // You need to set a unique value that is not equal to other applications
    uniqueName: "vue_app",
    path: path.resolve(__dirname, "dist"),
    // publicPath must be configured if using manifest
    publicPath: "http://localhost:3002/",
  },

  experiments: {
    css: true,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css",
      },
      {
        test: /\.svg$/,
        type: "asset",
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
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    new ModuleFederationPlugin(mfConfig),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true), // keep Options API
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // disable devtools in prod
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
    })
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
