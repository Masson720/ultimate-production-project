import webpack, { DefinePlugin, RuleSetRule } from "webpack";
import { BuildPaths } from '../build/types/config';
import path from "path";
import { buildCssLoaders } from "../build/loaders/buildCssLoaders";


export default ({ config }: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
        locales: '',
        buildLocales: ''
    }

    config!.resolve!.modules!.push(paths.src);
    config!.resolve?.extensions?.push('.ts', '.tsx');
    config!.resolve!.alias = {
        ...config!.resolve!.alias, 
        '@': paths.src
    }
    
    if(config!.module!.rules){
            config!.module!.rules = config.module?.rules?.map((rule: any) => {
        if(/svg/.test(rule.test)){
            return {...rule, exclude: /\.svg$/i}
        }
            return rule;
        })
    }
    config!.module!.rules!.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
    })

    config!.module!.rules!.push(buildCssLoaders(true));
    config!.plugins!.push(new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:8000'),
        __PROJECT__: JSON.stringify('storybook')
    }));

    return config
}