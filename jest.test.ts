// 测试 macher

test("测试macher", () => {
  expect(1 + 1).toBe(2);
});

test("测试macher2", () => {
  expect(1 + 1).not.toBe(3);
});

// 测试对象值 ： -- toEqual - 比较每个字段 
test("测试对象值", () => {
    // expect - 断言 -   匹配器  toEqual 
  expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
});


/*
jest为通用测试工具- 用于测试一般的js代码 - 函数 类模块 - 不利于测试 React 组件


*/