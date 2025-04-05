import { useEffect, useState } from "react";
import { Container, Table, Card, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import ApiClient from "../../services/ApiClient";

function BoardList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const handleClick = (articleId) => {
    navigate(`/detail/${articleId}`);
  };

  const moveAddForm = () => {
    navigate('/add');
  }

  useEffect(() => {
    ApiClient.getArticleList().then((data) => {
      setArticles(data);
    });
  }, []);

  return (
    <>
      <Container className="mt-4">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="fw-bold text-dark" style={{ cursor: 'pointer' }}>
            ourproject
          </h1>
        </Link>
        <Link to="/login">
          <Button variant="secondary" className="mt-2">로그인</Button>
        </Link>
      </Container>
      <Container className="mt-5">
        <Card className="shadow-sm rounded-4">
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center rounded-top-4">
            <h5 className="mb-0">📋 게시판</h5>
            <Button variant="light" className="fw-bold px-4 py-1 rounded-pill" onClick={moveAddForm}>
              글쓰기
            </Button>
          </Card.Header>

          <Card.Body>
            <Table hover responsive className="align-middle text-center">
              <thead className="table-light">
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
                    <td
                      onClick={() => handleClick(a.boardId)}
                      style={{ cursor: "pointer" }}
                    >
                      {a.title}
                    </td>
                    <td>
                      {a.regDate[0] + "-" + a.regDate[1] + "-" + a.regDate[2]}
                    </td>
                    <td>{a.likeCount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default BoardList;
