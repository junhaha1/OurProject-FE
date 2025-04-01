import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function BoardList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("http://localhost:8080/boardAPI/list")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  const handleClick = (id) => {
    navigate(`/view/${id}`);
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
            <tr key={a.id}>
            <td>{a.id}</td>
            <td>{a.author}</td>
            <td  onClick={() => handleClick(a.id)} style={{ cursor: 'pointer' }}>{a.title}</td>
            <td>{a.regDate}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <Link to={'/add'}>글 쓰기</Link>
    </div>
  );
}

export default BoardList;