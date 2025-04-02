import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiClient from "../../services/ApiClient";

function ArticleDetail() {
  const { articleId } = useParams(); // URL에서 :id 값을 읽어옴
  const [article, setArticle] = useState(null);

  useEffect(() => {
    ApiClient.getArticleDetail(articleId)
    .then((data) => {
      console.log(data)
      setArticle(data)
    });
  }, [articleId]);

  if (!article) return <div>로딩 중...</div>;

  return (
    <div>
      <div>
        <h2>게시글 상세</h2>
        <p>
          <strong>글번호:</strong> {article.boardId}
        </p>
        <p>
          <strong>카테고리:</strong> {article.ctId}
        </p>
        <p>
          <strong>작성자:</strong> {article.userId}
        </p>
        <p>
          <strong>제목:</strong> {article.title}
        </p>
        <p>
          <strong>내용:</strong> {article.content}
        </p>
      </div>
      <div>
        <h2>댓글</h2>
      </div>
      <div>
        <Link to={"/"}>돌아가기</Link>
      </div>
    </div>
  );
}

export default ArticleDetail;
