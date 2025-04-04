import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import CommentList from "./CommentList";
import Article from "./Article";

import { Container, Card, Button, Row, Col } from "react-bootstrap";

function ArticleDetailView() {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const moveHome = () => {
    navigate("/");
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card className="p-4 shadow-sm w-100" style={{ maxWidth: "800px" }}>
        <Card.Body>
          {/*게시글 내용*/}
          <Article boardId={articleId}/>
          <div className="my-4" />
          {/*댓글 리스트*/}
          <CommentList boardId={articleId}/>

          {/* 버튼 */}
          <div className="text-end">
            <Button variant="secondary" onClick={moveHome}>
              목록으로
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ArticleDetailView;
