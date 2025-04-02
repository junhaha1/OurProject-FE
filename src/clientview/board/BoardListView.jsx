import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ApiClient from '../../services/ApiClient'; 

function BoardList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate(); 

  const handleClick = (articleId) => {
    navigate(`/detail/${articleId}`);
  };

  useEffect(() => {
    ApiClient.getArticleList()
    .then((data) => {
      console.log(data);
      setArticles(data)
    });
  }, []);

  return (
    <div>
      <h2>게시글 목록</h2>
      <table>
        <thead>
          <tr>
            <th>글번호</th>
            <th>카테고리</th>
            <th>작성자</th>
            <th>제목</th>
            <th>작성일</th>
            <th>좋아요 수</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.boardId}>
            <td>{a.boardId}</td>
            <td>{a.ctId}</td>
            <td>{a.userId}</td>
            <td  onClick={() => handleClick(a.boardId)} style={{ cursor: 'pointer' }}>{a.title}</td>
            <td>{a.regDate[0] + '-' + a.regDate[1] + '-' + a.regDate[2]}</td>
            <td>{a.likeCount}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <Link to={'/add'}>글 쓰기</Link>
    </div>
  );
}

export default BoardList;