import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import CommentList from "./CommentList";
import Article from "./Article";
import BoardHeader from "./BoardHeader";

import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { useSelector } from 'react-redux';

function ArticleDetailView() {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.userId) || 'guest';


  return (
    <>
      <BoardHeader/>
      <Container className="my-5 d-flex justify-content-center">
        <Card className="p-4 shadow-sm w-100" style={{ maxWidth: "800px" }}>
          <Card.Body>
            {/*게시글 내용*/}
            <Article boardId={articleId} />
            <div className="my-4" />
            {/*댓글 리스트*/}
            <CommentList boardId={articleId} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ArticleDetailView;
