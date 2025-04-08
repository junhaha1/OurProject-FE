import { useEffect, useState } from "react";
import { Container, Table, Card, Button } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ApiClient from "../../services/ApiClient";
import BoardHeader from "./BoardHeader";

function BoardList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  //유저 로그인 정보 유지
  const location = useLocation();
  const userId = location.state?.userId || "guest"; // 기본값 설정

  //글 상세보기 => userId 넘겨주기
  const handleClick = (articleId) => {
    navigate(`/detail/${articleId}`, { state: { userId: userId } });
  };

  //글 추가하기 => userId
  const moveAddForm = (userId) => {
    navigate(`/add`, { state: { userId: userId } });
  };

  useEffect(() => {
    ApiClient.getArticleList().then((data) => {
      setArticles(data);
    });
  }, []);

  return (
    <>
      <BoardHeader state={{userId: userId}}/>
      <Container className="mt-5">
        <Card className="shadow-sm rounded-4">
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center rounded-top-4">
            <h5 className="mb-0">📋 게시판</h5>
            <Button variant="light" className="fw-bold px-4 py-1 rounded-pill" onClick={() => moveAddForm(userId)}>
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
