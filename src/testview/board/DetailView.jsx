import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";


function ArticleDetail() {
  const { id } = useParams(); // URL에서 :id 값을 읽어옴
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/boardAPI/view/${id}`) // 예: /boardAPI/view/3
      .then(res => res.json())
      .then(data => setArticle(data));
  }, [id]);

  if (!article) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>게시글 상세</h2>
      <p><strong>제목:</strong> {article.title}</p>
      <p><strong>작성자:</strong> {article.author}</p>
      <p><strong>내용:</strong> {article.content}</p>
      <div>
        <Link to={'/'}>돌아가기</Link>
      </div>
    </div>
  );
}

export default ArticleDetail;
