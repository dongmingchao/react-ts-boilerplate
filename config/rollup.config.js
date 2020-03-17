import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';
import rollup_postcss from 'rollup-plugin-postcss';
// import postcssSplit from 'postcss-split-module';
// import VuePlugin from 'rollup-plugin-vue';
// import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import generatePackageJson from 'rollup-plugin-generate-package-json';
// import ignoreImport from 'rollup-plugin-ignore-import';

const vueExport = (name) => ({
  input: `src/pages/${name}/${name}.vue.js`,
  output: {
    file: `dist/vue/${name}/${name}.js`,
    format: 'es',
    exports: 'named',
    sourcemap: true,
  },
  external: ['react', 'react-dom', 'vue/dist/vue.esm'],
  plugins: [
    // ignoreImport({
    //   extensions: ['.less', '.css'],
    // }),
    typescript({module: "esnext"}),
    rollup_postcss({
      extract: `dist/vue/${name}/${name}.css`,
    }),
    commonjs({
      namedExports: {
        'react-dom': [ 'render' ]
      }
    }),
    // VuePlugin(),
  ],
});

const reactExport = {
  input: 'config/react.ts',
  output: {
    file: 'dist/react/index.js',
    format: 'es',
    exports: 'named',
    sourcemap: true,
  },
  external: ['react', 'react-dom'],
  plugins: [
    typescript({module: "esnext"}),
    // peerDepsExternal(),
    rollup_postcss({
      extract: 'dist/style.css',
    }),
    // resolve(),
    commonjs({
      namedExports: {
        'react-dom': [ 'render' ]
      }
    }),
    generatePackageJson({
      outputFolder: 'dist',
      baseContents: (pkg) => ({
        name: pkg.name,
        version: pkg.version,
        private: true,
      }),
      additionalDependencies: {
        "react-dom": "^16.13.0",
      }
    }),
  ],
};

export default ['Home'].map(vueExport).concat(reactExport);
