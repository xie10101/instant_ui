// 测试 button组件
// 存在 jsx的语法 ：
import {render} from "@testing-library/react";
import Button from "./Button";

test("Button 组件", () => { 
    const wrapper = render(<Button>测试</Button>);
    const element = wrapper.queryByText("测试");
    expect(element).toBeTruthy();
});