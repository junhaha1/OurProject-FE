import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import ApiClient from '../service/ApiClient';
import CommentView from './CommentView';


function ArticleDetail() {
  const location = useLocation();
  const userId = location.state?.userId || "guest"; // 기본값 설정
  const { boardId } = useParams(); 
  const [article, setArticle] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    ApiClient.getArticle(boardId)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        console.log(data);
      });
  }, [boardId]);
  
  if (userId.trim() === "guest") return <div>로그인 유저만 가능한 서비스 입니다.</div>;
  if (!article) return <div>로딩 중...</div>;
  
  

  const handleEdit = (boardId) => {
    if (userId.trim() === article.userId.trim()) {
      navigate(`/editarticle/${boardId}`, { state: { userId: userId } });
    } else {
      alert("해당 게시물 작성자만 수정할 수 있습니다."); 
    }
  }; 
  
  const handleDelete = (boardId) => {
    if (userId.trim() === article.userId.trim()) {
      if (window.confirm("정말 삭제하시겠습니까?")) { 
          ApiClient.deleteArticle(boardId)
              .then(response => {
                  if (!response.ok) {
                      throw new Error(`서버 오류: ${response.status}`);
                  }
                  alert("게시글 삭제 완료!");
                  navigate('/', { state: { userId: userId } });
              })
              .catch(error => {
                  console.error("게시글 삭제 중 오류 발생:", error);
                  alert("게시글 삭제 중 오류가 발생했습니다.");
              });
      }
  } else {
      alert("해당 게시물 작성자만 삭제할 수 있습니다."); 
  }
  };
  
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">게시글 상세</h2>
          <p><strong>제목:</strong> {article.title}</p>
          <p><strong>작성자:</strong> {article.userId}</p>
          <p><strong>내용:</strong> {article.content}</p>
          {article.ctId === 1 && (
            <>
              <p><strong>코드내용:</strong> {article.codeContent}</p>
              <p><strong>에러내용:</strong> {article.errorContent}</p>
            </>
          )}
          <p className="text-muted">{article.regDate}</p>
          <p>❤ {article.likeCount}</p>
  
          <div className="mt-4">
            <CommentView boardId={boardId} userId={userId} ctId={article.ctId} />
          </div>
  
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button className="btn btn-warning" onClick={() => handleEdit(boardId)}>글 수정</button>
            <button className="btn btn-danger" onClick={() => handleDelete(boardId)}>글 삭제</button>
            <Link className="btn btn-secondary" to={'/'} state={{ userId: userId }}>돌아가기</Link>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default ArticleDetail;
