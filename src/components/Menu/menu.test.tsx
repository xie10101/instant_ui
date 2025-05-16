// 对菜单基础功能添加测试：
import {fireEvent, render, cleanup} from "@testing-library/react";
import {RenderResult} from "@testing-library/react"; // 导入测试库的类型定义，用于定义渲染结果的类型。
import Menu ,{Props} from "./Menu";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
/**
 * describe 是一个测试套件，用于组织和分类测试用例。
 */

/**
 * it(description, testFunction, timeout) 
 * 
 */

// 设置多个测试Props ：
const defaultProps:Props = {
 activeIndex: "0",
 className:"test",
 onSelect: jest.fn(),
}
const verticalProps:Props = {
 activeIndex: "0",
 mode:"vertical",
  onSelect: jest.fn(),
}
// 设置一个集成后的Menu组件
const NiceMenu=(props:Props)=>{
 return (
    <Menu {...props} >
        <MenuItem >active</MenuItem>
        <MenuItem  disabled>disabled</MenuItem>
        <MenuItem >vertical</MenuItem>
        <SubMenu title="dropdown">
            <MenuItem>drop1</MenuItem>
        </SubMenu>
        {/* 以上li 没有被渲染  可以识别子组件并正确渲染 */}
    </Menu>
 )
} 
/**
 * 
 * 插入 css 文件的作用： 
 */
const createStyleFile = ()=>{
  const cssFile :string = `
  .sub-menu-ul{
    display:none;}
   .sub-menu-ul.open{
    display:block;} 
  `
  const style = document.createElement("style");
 //  style 标签的type属性本默认  style.type = "text/css";
  style.innerHTML = cssFile
return  style
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
      wrapper.container.append(createStyleFile()); //插入 css文件 
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
    // 检查类名实现     -- HtmlElement 类型  -- :scope 可以看做是 作用域中this ,指向顶层HTML元素   
    expect(menuElement.querySelectorAll(":scope>li").length).toEqual(4);// 此处 获取到的li- 实际为所有
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
        expect(defaultProps.onSelect).toHaveBeenCalledWith("2"); 
        fireEvent.click(disabledElement);
        // 禁止 的菜单项不添加类名和执行回调 
        expect(defaultProps.onSelect).not.toHaveBeenCalledWith("1");
        expect(disabledElement).not.toHaveClass("is-active");
    })

    it("设置垂直状态,菜单垂直实现", () => {
    cleanup(); 
    // 清理测试环境，防止测试之间的副作用干扰。
    const wrapper = render(<NiceMenu {...verticalProps} />);
    const menuElement = wrapper.getByTestId("menu-test");
    expect(menuElement).toHaveClass("menu menu-vertical");
    })
   it("悬停时展开折叠菜单并展示子菜单项",()=>{
    expect(wrapper.queryByText("drop1")).not.toBeVisible(); //如果报错也就是没有检测到display：nones 
    const dropdownElement = wrapper.getByText("dropdown"); //获取div元素？ 
    fireEvent.mouseEnter(dropdownElement); // 触发 div 点击元素 
    expect(wrapper.queryByText("drop1")).toBeVisible();
    
    // async  wait (()=>{ -- 实际等待 点击处理函数？ 
    //  expect(wrapper.queryByText("drop1")).toBeVisible(); // 异步等待 ： 等待 子菜单显示   
    //})

    /**
     * 与视频教程产生区别的部分: 
     * 1. 没有将open状态的转换放置于计时器中实现过渡  -而是使用 css 过渡
     * 2. 视频中 ： async wait 使用 
     */
fireEvent.click(wrapper.getByText("drop1"))
expect(defaultProps.onSelect).toHaveBeenCalledWith("3-0"); // 此处 3-0 是因为 子菜单的index 为 0 ， 父菜单的index 为 3 ， 所以为 3-0
fireEvent.mouseLeave(dropdownElement); // 触发 div 点击元素
expect(wrapper.queryByText("drop1")).not.toBeVisible();
   })
  //  手写 对于 垂直效果菜单组件的测试用例 ：
  it("vertical Submenu works fine",()=>{
    cleanup(); // 清理测试环境，防止测试之间的副作用干扰。 
    const wrapper = render(<NiceMenu {...verticalProps} />); // 渲染组件 ： 垂直菜单
     wrapper.container.append(createStyleFile()); //插入 css文件 
    const dropdownElement = wrapper.getByText("dropdown");
    // 点击显示 
    fireEvent.click(dropdownElement);
            // 执行 onSelect 回调函数

    expect(wrapper.queryByText("drop1")).toBeVisible();
    fireEvent.click(wrapper.getByText("drop1"))
    expect(verticalProps.onSelect).toHaveBeenCalledWith("3-0");

    // 点击隐藏
    fireEvent.click(dropdownElement);
    expect(wrapper.queryByText("drop1")).not.toBeVisible();

  })
})
/**
 * 使用以上逻辑因为 css没有添加 ？ 
 */


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