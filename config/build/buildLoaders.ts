import webpack from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options;

  const tsxCodeBabelLoader = buildBabelLoader();
  const cssLoader = buildCssLoader(isDev);

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff|ico)$/i,
    type: 'asset/resource',
  };

  return [fileLoader, svgLoader, tsxCodeBabelLoader, cssLoader];
}
