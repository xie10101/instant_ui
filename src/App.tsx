import { useState } from 'react'
// 声明的命名空间 
import { JSX } from 'react'
import Button from './components/Button/Button' 
// 使用时引入枚举量进行引用使用 
import { ButtonSize,ButtonType } from './components/Button/Button'
import "./App.css"

function App (): JSX.Element {
  const [count, setCount] = useState(0)
  return (
    <>
      <Button className='btn-test' id='btn-test' onClick={()=>{alert("123s")}}>Hello</Button>
      <Button size={ButtonSize.Large}  onClick={() => {alert("123")}}>Large</Button>
      <Button disabled={true}>disabled</Button>
      <Button type={ButtonType.Primary}>Primary</Button>
      <Button type={ButtonType.Danger} size={ButtonSize.Large}>Danger</Button>
      <Button href='https://www.baidu.com' type={ButtonType.Link}>Link</Button>
      <Button href='https://www.baidu.com' disabled={true} target='ssd' type={ButtonType.Link}>Link</Button>
     
      <h1 >123</h1>
      <h2>123</h2>
      <h3>213</h3>
      <div>
        <a href="https://vite.dev" target="_blank">
        123
        </a>
        <a href="https://react.dev" target="_blank">
        123
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div style={{ width: '100px', height: '100px',backgroundColor:"red ",textAlign:"center" }}>
        <span>12331</span>
      </div>
      <div>
        

      </div>
    </>
  )
}

export default App
