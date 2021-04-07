import typescript from 'rollup-plugin-typescript';
import { terser } from "rollup-plugin-terser";
// const banner = `/*!
//  * qrscanner v${pkg.version}
//  * (c) ${new Date().getFullYear()} sidely-zzx
//  * @license MIT
//  */`

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/qrscanner.js',
    format: 'esm',
    name: 'qrscanner'
  },
  plugins:[
    typescript({target: "es2020"}),
    terser()
  ]
}