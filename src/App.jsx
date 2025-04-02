import './App.css';
import { Routes, Route } from 'react-router-dom';
import BoardListView from './clientview/board/BoardListView'; //메인화면 컴포넌트
import ArticleDetailView from './clientview/board/ArticleDetailView'; //게시글 상세보기 컴포넌트
import LoginView from './clientview/login/LoginView';  //로그인 화면 컴포넌트

function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardListView />} /> {/* 메인 화면 */}
      <Route path="/login" element={<LoginView />}/> {/* 로그인 화면*/}
      <Route path="/detail/:articleId" element={<ArticleDetailView />} /> {/* 게시글 상세보기 */}
    </Routes>
  );
}


export default App;