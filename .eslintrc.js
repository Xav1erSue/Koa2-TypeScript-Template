module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser' // 解析一些最新的 es 语法
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    Nullable: true
  },
  rules: {
    'no-debugger': 'error', // 单引号
    semi: ['error', 'always'], // 代码需要以分号结尾
  }
}
