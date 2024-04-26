
import { BuildOptions } from "./types/config";
import webpack from "webpack";
import { buildCssLoaders } from "./loaders/buildCssLoaders";
import { buildBabelLoader } from "./loaders/buildBabelLoaders";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[]{
    const {
      isDev
    } = options;
    
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

    const codeBabelLoader = buildBabelLoader({...options, isTsx: false});
    const tsxCodeBabelLoader = buildBabelLoader({...options, isTsx: true});

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
        codeBabelLoader,
        tsxCodeBabelLoader,
        // typescriptLoader,
        cssLoader
      ]
}