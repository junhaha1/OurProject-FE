import './App.css';
import { Routes, Route } from 'react-router-dom';
import BoardListView from './testview/board/BoardListView'; //메인화면 컴포넌트
import DetailView from './testview/board/DetailView'; //게시글 상세보기 컴포넌트
import LoginView from './testview/login/LoginView';  //로그인 화면 컴포넌트

function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardListView />} /> {/* 메인 화면 */}
      <Route path="/login" element={<LoginView />}/> {/* 로그인 화면*/}
      <Route path="/viewarticle/:id" element={<DetailView />} /> {/* 게시글 상세보기 */}
    </Routes>
  );
}


export default App;