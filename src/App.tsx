
// 声明的命名空间 
import { JSX } from 'react'
import Button from './components/Button/Button' 
// 使用时引入枚举量进行引用使用 
import { ButtonSize,ButtonType } from './components/Button/Button'
import "./App.css"
import Menu from "./components/Menu/Menu"
import MenuItem from "./components/Menu/MenuItem"
import SubMenu from './components/Menu/SubMenu'

function App (): JSX.Element {
  return (
    <>

       <Menu style={{width:"200px",height:"300px"}} onSelect={()=>{}} mode={"vertical"}>
        <MenuItem>cool link</MenuItem>
        <MenuItem>cool link</MenuItem>
        <SubMenu title='cool link'>
          <MenuItem>inner-link1</MenuItem>
          <MenuItem>inner-link2 </MenuItem>
          <MenuItem>inne-link3</MenuItem>
        </SubMenu>
        <MenuItem>cool link </MenuItem>
      </Menu>
  
      <Menu style={{width:"500px",height:"40px"}}  mode={'horizontal'}>
        <MenuItem>cool link</MenuItem>
        <MenuItem>cool link</MenuItem>
        <SubMenu title='sub_menu'>
          <MenuItem>inner-link1</MenuItem>
          <MenuItem>inner-link2 </MenuItem>
          <MenuItem>inne-link3</MenuItem>
        </SubMenu>
        <MenuItem>cool link</MenuItem>
      </Menu>

      {/* <Button className='btn-test' id='btn-test' onClick={()=>{alert("123s")}}>Hello</Button>
      <Button size={ButtonSize.Large}  onClick={() => {alert("123")}}>Large</Button>
      <Button disabled={true}>disabled</Button>
      <Button type={ButtonType.Primary}>Primary</Button>
      <Button type={ButtonType.Danger} size={ButtonSize.Large}>Danger</Button>
      <Button href='https://www.baidu.com' type={ButtonType.Link}>Link</Button>
      <Button href='https://www.baidu.com' disabled={true} target='ssd' type={ButtonType.Link}>Link</Button> */}
    </>
  )
}

export default App
