export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss', // SCSS 支持
    'stylelint-order' // 属性排序
  ],
  plugins: ['stylelint-order'],
  rules: {
    'selector-class-pattern': null, // 允许任意类名
    'scss/at-rule-no-unknown': true, // 检查 SCSS 未知指令
    'order/properties-alphabetical-order': true // 属性按字母排序
  }
}