// 声明的命名空间
import { JSX } from 'react';
// 使用时引入枚举量进行引用使用
import './App.css';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';
import Input from './components/Input/Input';
import Icon from './components/Icon/Icon';
// import axios  from 'axios'; 

import Progress from './components/Progress/Progress';
function App(): JSX.Element {
  // axios.get("https://jsonplaceholder.typicode.com/posts",{
  //    headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   responseType: 'json',
  // }).then((res) => {
  //   console.log(res);
  // })
  return (
    <>
    <Progress  percent={28} showText={false}></Progress>

      <Menu
        style={{ width: '200px', height: '300px' }}
        id={'menu-test'}
        onSelect={(index) => {
          console.log(index);
        }}
        defaultOpenSubMenus={['2']}
        mode={'vertical'}
      >
        <MenuItem>cool link</MenuItem>
        <MenuItem>cool link</MenuItem>
        <SubMenu title="cool link">
          <MenuItem>inner-link1</MenuItem>
          <MenuItem>inner-link2 </MenuItem>
          <MenuItem>inne-link3</MenuItem>
        </SubMenu>
        <MenuItem>cool link </MenuItem>
      </Menu>

      <Menu style={{ width: '500px', height: '40px' }} mode={'horizontal'}>
        <MenuItem>cool link</MenuItem>
        <MenuItem>cool link</MenuItem>
        <SubMenu title="sub_menu">
          <MenuItem>inner-link1</MenuItem>
          <MenuItem>inner-link2 </MenuItem>
          <MenuItem>inne-link3</MenuItem>
        </SubMenu>
        <MenuItem>cool link</MenuItem>
      </Menu>
      <Input placeholder='xxxx'size='large' ></Input>
      <Input placeholder='xxxx'size='middle' ></Input>
      <Input placeholder='xxxx'size='small' ></Input>
      <Input placeholder='xxxx'disabled ></Input>
     <Input  icon="search" ></Input>
     {/* 前缀和后缀添加  */}
     <Input prepend={<div>前缀</div>}  ></Input>
     <Input append={<div>后缀</div>} ></Input>

     <hr />
     <div style={{color:'red'}}>
      <Icon icon='ghost'></Icon>
     </div>
      <Icon icon='ghost' theme='primary'></Icon>    

         
      {/* <Button className='btn-test' id='btn-test' onClick={()=>{alert("123s")}}>Hello</Button>
      <Button size={ButtonSize.Large}  onClick={() => {alert("123")}}>Large</Button>
      <Button disabled={true}>disabled</Button>
      <Button type={ButtonType.Primary}>Primary</Button>
      <Button type={ButtonType.Danger} size={ButtonSize.Large}>Danger</Button>
      <Button href='https://www.baidu.com' type={ButtonType.Link}>Link</Button>
      <Button href='https://www.baidu.com' disabled={true} target='ssd' type={ButtonType.Link}>Link</Button> */}
    </>
  );
}

export default App;
