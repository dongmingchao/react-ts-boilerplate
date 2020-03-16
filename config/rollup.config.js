import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import rollup_postcss from 'rollup-plugin-postcss';
// import postcssSplit from 'postcss-split-module';
import VuePlugin from 'rollup-plugin-vue';
// import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'config/vue.ts',
  output: {
    dir: 'dist',
    format: 'es',
    exports: 'named',
    sourcemap: true,
  },
  plugins: [
    typescript(),
    // peerDepsExternal(),
    rollup_postcss({
      plugins: [
        // postcssSplit(),
      ],
      modules: true,
      extract: 'dist/style.css',
    }),
    resolve(),
    commonjs({
      namedExports: {
        'react-dom': [ 'render' ]
      }
    }),
    VuePlugin(),
  ],
};
