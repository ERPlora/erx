import { Config } from '@stencil/core';
import { postcss } from '@stencil-community/postcss';
import { reactOutputTarget } from '@stencil/react-output-target';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export const config: Config = {
  namespace: 'erx',
  taskQueue: 'async',

  globalStyle: 'src/styles/global.css',
  globalScript: 'src/global.ts',

  outputTargets: [
    // Lazy-loaded dist (primary)
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    // Custom elements for direct import
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    // React wrapper components
    reactOutputTarget({
      outDir: './react/src',
    }),
    // Documentation
    {
      type: 'docs-readme',
      footer: '*Built with Stencil - ERPlora eXtensions*',
    },
    // Development server
    {
      type: 'www',
      serviceWorker: null,
    },
  ],

  plugins: [
    postcss({
      plugins: [
        tailwindcss('./tailwind.config.js'),
        autoprefixer(),
      ],
    }),
  ],

  devServer: {
    reloadStrategy: 'pageReload',
    port: 3333,
    openBrowser: false,
  },

  extras: {
    experimentalImportInjection: true,
  },

  testing: {
    browserHeadless: 'new',
  },
};
