import { useEffect, useState } from "react";
import { useNavigate,useLocation, Link } from "react-router-dom";
import ApiClient from "../../service/ApiClient";

function BoardList() {
  const [articles, setArticles] = useState([]);
  const [like, setLike] = useState([]);

  const navigate = useNavigate(); 
  const location = useLocation();
  const userId = location.state?.userId || "guest"; // 기본값 설정
  const name = location.state?.name || "guset";

  useEffect(() => {
    ApiClient.getArticles()
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        console.log(data);
      });
  }, []);

  const handleClick = (boardId) => {
    navigate(`/viewarticle/${boardId}`, {state: { userId: userId }});
  };

  const handleCount = (boardId) => {
    //좋아요 수 늘리기 
    ApiClient.sendArticleGood(boardId, userId)
    .then((res) => {
      if(!res.ok){
        throw new Error(`서버 오류: ${res.status}`);
      }
      res.json();
    }).then((data) => {
        setLike(data);
        console.log(data);
      });
  };

  

  const handleSubmit = (userId) => {
    navigate(`/add`, { state: { userId: userId } });
  };
  

  return (
    <div>
      <tr>
          <td align="right"></td>
          <td>
          <Link to={'/login'}>로그인</Link>
          <a href='#'>로그아웃</a>
          </td>
      </tr>
      <tr>
          <td align="right"></td>
          <td>
          <h3>{name}님 환영합니다. </h3>
          </td>
      </tr>

      <h2>게시글 목록</h2>
      <table>
        <thead>
          <tr>
            <th>글번호</th>
            <th>작성자</th>
            <th>제목</th>
            <th>작성일</th>
            <th>❤</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.boardId}>
              <td>{a.boardId}</td>
              <td>{a.userId}</td>
              <td  onClick={() => handleClick(a.boardId)} style={{ cursor: 'pointer' }}>{a.title}</td>
              <td>{a.regDate}</td>
              <td onClick={() => handleCount(a.boardId)} style={{ cursor: 'pointer' }}>{a.likeCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleSubmit(userId)}>글 쓰기</button>
      
    </div>
  );
}

export default BoardList;