// 对菜单基础功能添加测试：
import {fireEvent, render, cleanup} from "@testing-library/react";
import {RenderResult} from "@testing-library/react"; // 导入测试库的类型定义，用于定义渲染结果的类型。
import Menu ,{MenuProps} from "./Menu";
import MenuItem from "./MenuItem";
/**
 * describe 是一个测试套件，用于组织和分类测试用例。
 */

/**
 * it(description, testFunction, timeout) 
 * 
 */

// 设置多个测试Props ：
const defaultProps:MenuProps = {
 activeIndex: 0,
 className:"test",
 onSelect: jest.fn(),
}
const verticalProps:MenuProps = {
 activeIndex: 0,
 mode:"vertical"
}
// 设置一个集成后的Menu组件
const NiceMenu=(props:MenuProps)=>{
 return (
    <Menu {...props}>
        <MenuItem >active</MenuItem>
        <MenuItem  disabled>disabled</MenuItem>
        <MenuItem >vertical</MenuItem>
        {/* 以上li 没有被渲染  可以识别子组件并正确渲染 */}
    </Menu>
 )
} 



//将渲染组件 获取组件的过程 进行简化操作 设置全局变量 ，将渲染获取操作放到beforeEach钩子函数中 
let wrapper:RenderResult ,menuElement:HTMLElement, activeElement:HTMLElement, disabledElement:HTMLElement;
describe("测试 Menu 组件", () => {
    /**
     * beforeEach 是一个钩子函数，在每个测试用例执行前都会执行一次。
     */
    // wrapper 的类型 ： RenderResult 作用 ？ 
    beforeEach(() => {
      wrapper =  render(<NiceMenu {...defaultProps} />)
    //  获取组件
      menuElement = wrapper.getByTestId("menu-test");
      activeElement = wrapper.getByText("active"); // 高亮菜单项 ： active
      disabledElement = wrapper.getByText("disabled"); 

      /**
       * 获取Menu标签元素的方法： 设置 唯一id ， 
       * react -test-library 测试库存在一个方法论： 
       */
    })

    it("渲染出默认Menu 组件", () => {
      expect(menuElement).toBeInTheDocument();
    // 检查是否存在于文档中 
    expect(menuElement).toHaveClass("menu test"); 
    // 检查类名实现    
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
     //测试结构 数据 
     expect(activeElement).toHaveClass("menu-item is-active"); 
     // 高亮菜单项 ： active
     expect(disabledElement).toHaveClass("menu-item is-disabled");
     // 禁用菜单项 ： disabled
    })
    
     it("点击菜单,实现高亮回调正确执行", () => {
        const thirdItem = wrapper.getByText("vertical");
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass("is-active");
        expect(activeElement).not.toHaveClass("is-active");
        // toHaveBeenCalledWith 检测 存在 onSelect 函数()参数为 2 时的调用 
        expect(defaultProps.onSelect).toHaveBeenCalledWith(2); 
        fireEvent.click(disabledElement);
        // 禁止 的菜单项不添加类名和执行回调 
        expect(defaultProps.onSelect).not.toHaveBeenCalledWith(1);
        expect(disabledElement).not.toHaveClass("is-active");
    })

    it("设置垂直状态,菜单垂直实现", () => {
    cleanup(); 
    // 清理测试环境，防止测试之间的副作用干扰。
    const wrapper = render(<NiceMenu {...verticalProps} />);
    const menuElement = wrapper.getByTestId("menu-test");
    expect(menuElement).toHaveClass("menu menu-vertical");
    })

})


 /**
  * 每个测试用例执行时都会执行eachBefore钩子函数那多次的钩子函数为何不会导致 重复data-test
  * 在每个例子之间自动执行清除操作
  * cleanup 函数的使用 ：手动主动将前者数据进行清除
  */
 
 /**
  * 1. 编写可能要使用到的props数据 
2. 导入需要用到的组件和类型声明 -props
3. 将多组件进行一个集成-设置成单组件进行渲染
4.依次编写 测试用例 

  */