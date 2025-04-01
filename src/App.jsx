import './App.css';
import { Routes, Route } from 'react-router-dom';
import BoardList from './testview/board/BoardList';
import AddArticle from './testview/board/AddArticle';
import ArticleDetail from './testview/board/ArticleDetail'; // ✨ 상세 페이지 컴포넌트

function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardList />} />
      <Route path="/add" element={<AddArticle />} />
      <Route path="/view/:id" element={<ArticleDetail />} /> {/* ✨ 동적 라우팅 */}
    </Routes>
  );
}


export default App;