import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';
import BoardListView from './clientview/board/BoardListView'; //메인화면 컴포넌트
import ArticleDetailView from './clientview/board/ArticleDetailView'; //게시글 상세보기 컴포넌트
import AddArticle from './clientview/board/AddArticle';
import LoginForm from './clientview/login/LoginForm';
import EditArticle from './clientview/board/EditArticle';



function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardListView />} /> {/* 메인 화면 */}
      <Route path="/login" element={<LoginForm />}/> {/* 로그인 화면*/}
      <Route path="/add" element={<AddArticle />}/> {/*글 쓰기 화면*/}
      <Route path="/detail/:articleId" element={<ArticleDetailView />} /> {/* 게시글 상세보기 */}
      <Route path="/editarticle/:boardId" element={<EditArticle/>}/>{/* 수정 화면 */} 
    </Routes>
  );
}


export default App;