import './App.css';
import { Routes, Route } from 'react-router-dom';
import BoardListView from './testview/board/BoardListView'; //메인화면 컴포넌트
import DetailView from './testview/board/DetailView'; //게시글 상세보기 컴포넌트
import LoginView from './testview/login/LoginView';  //로그인 화면 컴포넌트
import AddArticle from './testview/board/AddArticle'
import EditArticle from './testview/board/EditArticle';

function App() {
  return (
    //<BoardListView/>
    <Routes>
      <Route path="/" element={<BoardListView />} /> {/* 메인 화면 */}
      <Route path="/add" element={<AddArticle />} /> {/* 새글 작성 */}
      <Route path="/viewarticle/:boardId" element={<DetailView />} /> {/* 게시글 상세보기 */}
      <Route path="/login" element={<LoginView />} /> {/* 메인 화면 */}
      <Route path="/editarticle/:boardId" element={<EditArticle/>}/>{/* 수정 화면 */} 
    </Routes>
  );
}


export default App;