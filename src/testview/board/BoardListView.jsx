import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ApiClient from "../../service/ApiClient";
import DatailView from "./DetailView"

function BoardList() {
  const [articles, setArticles] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    ApiClient.getArticles()
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        console.log(data);
      });
  }, []);

  const handleClick = (id) => {
    navigate(`/viewarticle/${id}`);
  };

  const handleSubmit = (id) => {
    navigate(`/add`, { state: { userId: id } });
  };
  

  return (
    <div>
      <h2>게시글 목록</h2>
      <table>
        <thead>
          <tr>
            <th>글번호</th>
            <th>작성자</th>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.boardId}>
              <td>{a.boardId}</td>
              <td>{a.userId}</td>
              <td  onClick={() => handleClick(a.boardId)} style={{ cursor: 'pointer' }}>{a.title}</td>
              <td>{a.regDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleSubmit(userId)}>글 쓰기</button>
      
    </div>
  );
}

export default BoardList;