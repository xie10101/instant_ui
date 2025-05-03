import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 全局导入使用的样式文件
import "./styles/index.scss"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
