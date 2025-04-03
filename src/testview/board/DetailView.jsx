import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {Link, useLocation} from "react-router-dom";
import ApiClient from '../../service/ApiClient';
import CommentView from './CommentView';


function ArticleDetail() {
  const location = useLocation();
  const userId = location.state?.userId || "guest"; // 기본값 설정
  const { id } = useParams(); // URL에서 :id 값을 읽어옴
  const [article, setArticle] = useState(null);

  useEffect(() => {
    ApiClient.getArticle(id)
      .then(res => res.json())
      .then(data => {
        setArticle(data)
        console.log(data);
      });
  }, [id]);

  if (!article) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>게시글 상세</h2>
      <p><strong>제목:</strong> {article.title}</p>
      <p><strong>작성자:</strong> {article.userId}</p>
      <p><strong>내용:</strong> {article.content}</p>
      <p><strong>코드내용:</strong> {article.codeContent}</p>
      <p><strong>에러내용:</strong> {article.errorContent}</p>
      <p>{article.regDate}</p>
      <p>{article.likeCout}</p>
    
      <div>
        <CommentView boardId={id} userId={userId}/>
      </div>
      <div>
        <Link to={'/'}>돌아가기</Link>
      </div>
    </div>
  );
}

export default ArticleDetail;
