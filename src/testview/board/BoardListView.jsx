import { useEffect, useState } from "react";
import { useNavigate,useLocation, Link } from "react-router-dom";
import ApiClient from "../service/ApiClient";

function BoardList() {
  const [articles, setArticles] = useState([]);
  const [like, setLike] = useState([]);

  const navigate = useNavigate(); 
  const location = useLocation();
  const userId = location.state?.userId || "guest"; // 기본값 설정
  console.log("userId" + userId);
  // const name = location.state?.name || "guset";
  // console.log("userName: " + name);

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
    <div className="container mt-5">
      <div className="card p-3">
        <div className="d-flex justify-content-between">          
          <div>
            <Link className="btn btn-outline-primary me-2" to={'/login'}>로그인</Link>
            <button className="btn btn-outline-danger">로그아웃</button>
          </div>
        </div>
  
        <h2 className="mt-3">📋 게시글 목록</h2>
        <h4>{userId}님 환영합니다</h4>
        <table className="table table-striped">
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
                <td style={{ cursor: 'pointer' }} onClick={() => handleClick(a.boardId)}>{a.title}</td>
                <td>{a.regDate}</td>
                <td style={{ cursor: 'pointer' }} onClick={() => handleCount(a.boardId)}>{a.likeCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-end">
          <button className="btn btn-primary" onClick={() => handleSubmit(userId)}>글 쓰기</button>
        </div>
      </div>
    </div>
  );
  
}

export default BoardList;