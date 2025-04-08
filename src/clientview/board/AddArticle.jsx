import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import ApiClient from "../../services/ApiClient";
import BoardHeader from "./BoardHeader";

function AddArticle() {
  const [title, setTitle] = useState("");
  const [ctId, setCtId] = useState(1);
  const [content, setContent] = useState("");
  const [codeContent, setCodeContent] = useState("");
  const [errorContent, setErrorContent] = useState("");
  const [regDate, setRegDate] = useState("2025-04-03");
  const navigate = useNavigate();

  const location = useLocation();
  const userId = location.state?.userId || "guest"; // 기본값 설정

  const handleSubmit = () => {
    const article_data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, title, ctId, content, codeContent, errorContent, regDate }),
    };

    ApiClient.sendArticle(userId, article_data)
      .then(() => {
        alert("게시글 등록 완료!");
        navigate('/');
      });
  };

  return (
    <>
      <BoardHeader state={{userId: userId}}/>
      <Container className="mt-5">
        <Card className="shadow-sm rounded-4">
          <Card.Header className="bg-primary text-white rounded-top-4">
            <h5 className="mb-0">📝 새 글 작성</h5>
          </Card.Header>
          {userId === "guest" ? (
            <Card.Body>
              <p>로그인 유저만 가능한 서비스 입니다.</p>
              <Link className="btn btn-secondary" to={'/'} state={{ userId: userId }}>돌아가기</Link>
            </Card.Body>
          ) : (
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="d-block">작성 정보</Form.Label>
                  <div className="d-flex gap-3">
                    <Form.Group className="flex-fill">
                      <Form.Label>작성자</Form.Label>
                      <Form.Control type="text" value={userId} disabled />
                    </Form.Group>

                    <Form.Group className="flex-fill">
                      <Form.Label>카테고리 선택</Form.Label>
                      <Form.Select
                        aria-label="카테고리 선택"
                        value={ctId}
                        onChange={(e) => setCtId(Number(e.target.value))}
                      >
                        <option value="0">공지</option>
                        <option value="1">코드/에러</option>
                        <option value="2">일반</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>제목</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>내용</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Form.Group>

                {ctId == 1 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>코드 내용</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="코드 내용을 입력하세요"
                        value={codeContent}
                        onChange={(e) => setCodeContent(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>에러 내용</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="에러 내용을 입력하세요"
                        value={errorContent}
                        onChange={(e) => setErrorContent(e.target.value)}
                      />
                    </Form.Group>
                  </>
                )}

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="primary" onClick={handleSubmit}>등록</Button>
                  <Link to="/">
                    <Button variant="secondary">취소</Button>
                  </Link>
                </div>
              </Form>
            </Card.Body>
          )}
        </Card>
      </Container>
    </>
  );
}

export default AddArticle;
