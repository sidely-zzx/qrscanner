import typescript from 'rollup-plugin-typescript';
import { terser } from "rollup-plugin-terser";
import resolve from 'rollup-plugin-node-resolve'
export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/qrscanner.js',
    format: 'esm',
    name: 'qrscanner'
  },
  plugins:[
    typescript({target: "es2020"}),
    resolve(),
    terser()
  ]
}