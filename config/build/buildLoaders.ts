
import { BuildOptions } from "./types/config";
import webpack from "webpack";
import { buildCssLoaders } from "./loaders/buildCssLoaders";

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[]{

    const svgLoader = {
      test: /\.svg$/,
      use: ['@svgr/webpack']
    }

    const fileLoader = {
      test: /\.(png|jpe?g|gif|woff2|woff)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    }

    const babelLoader = {
      test: /\.(js|ts|jsx|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }

    const cssLoader = buildCssLoaders(isDev);

    //Если не используем тайпскрипт - нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }

    return [
        svgLoader,
        fileLoader,
        babelLoader,
        typescriptLoader,
        cssLoader
      ]
}