# 上传方案

1. 前提确保从main分支进行publish，main分支保持最新代码;
2. pnpm run prepublish
3. https://www.npmjs.com/登录npm官网/或执行：npm login --registry https://registry.npmjs.org/
4. npm adduser -- 添加npm用户身份/邮箱验证
5. npm whoami --registry https://registry.npmjs.org/ 验证npm身份
6. npm publish --access public --//registry.npmjs.org/(2FA 安全策略需要access_token)

# 补充

GitHub Secret Scan 能识别的格式: npm\_ 开头的字符串、AWS Key、GitHub Token、Private Key 等上百种敏感信息模式。
