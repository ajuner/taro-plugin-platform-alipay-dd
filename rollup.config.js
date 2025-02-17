const { join } = require('path')
const typescript = require('rollup-plugin-typescript2')
const cwd = __dirname

const base = {
  external: [
    '@tarojs/shared',
    '@tarojs/plugin-platform-alipay/dist/runtime-utils',
    '@tarojs/plugin-platform-alipay/dist/components-react'
  ],
  plugins: [typescript({
    useTsconfigDeclarationDir: true
  })]
}

// 供 CLI 编译时使用的 Taro 插件入口
const comileConfig = {
  input: join(cwd, 'src/index.ts'),
  output: {
    file: join(cwd, 'dist/index.js'),
    format: 'cjs',
    sourcemap: true,
    exports: 'named'
  },
  ...base
}

// 供 Loader 使用的运行时入口
const runtimeConfig = {
  input: join(cwd, 'src/runtime.ts'),
  output: {
    file: join(cwd, 'dist/runtime.js'),
    format: 'es',
    sourcemap: true
  },
  ...base
}

// React 下 webpack 会 alias @tarojs/components 为此文件
const otherConfig = {
  input: join(cwd, 'src/components-react.ts'),
  output: {
    file: join(cwd, 'dist/components-react.js'),
    format: 'es',
    sourcemap: true
  },
  ...base
}

module.exports = [comileConfig, runtimeConfig, otherConfig]
