import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <BrowserRouter> 
        <App/>
    </BrowserRouter>
) // BrowserRouter로 App을 감싸야 App이하의 컴포넌트들에 모두 적용