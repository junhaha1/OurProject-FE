import { useParams } from "react-router-dom";
import { useNavigate, useLocation, Link } from "react-router-dom";

import CommentList from "./CommentList";
import Article from "./Article";
import BoardHeader from "./BoardHeader";

import { Container, Card, Button, Row, Col } from "react-bootstrap";

function ArticleDetailView() {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const userId = location.state?.userId || "guest"; // 기본값 설정

  return (
    <>
      <BoardHeader state={{userId: userId}}/>
      <Container className="my-5 d-flex justify-content-center">
        <Card className="p-4 shadow-sm w-100" style={{ maxWidth: "800px" }}>
          <Card.Body>
            {/*게시글 내용*/}
            <Article boardId={articleId} />
            <div className="my-4" />
            {/*댓글 리스트*/}
            <CommentList boardId={articleId} userId={userId} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ArticleDetailView;
