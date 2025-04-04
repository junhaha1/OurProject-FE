import { useEffect, useState } from "react";
import ApiClient from "../../services/ApiClient";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const Article = (props) => {
  const [article, setArticle] = useState(null);
  const [userId, setUserId] = useState("test@naver.com");

  /* 추가해서 구현할 부분 => 사용자가 해당 게시글에 좋아요를 눌렀는지 확인하는 서버 API 추가 해야됨. 
  const handleLike = async (articleId, userId) => { // 서버에 좋아요 요청 이벤트
    const good_data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articleId, userId}),
    };

    try {
      await ApiClient.likeArticle(good_data); // 서버에 좋아요 요청 보내기
      setArticle((prev) => ({
        ...prev,
        likeCount: (prev.likeCount || 0) + 1,
      }));
    } catch (error) {
      console.error("좋아요 실패", error);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };
  */

  useEffect(() => {
    ApiClient.getArticleDetail(props.boardId).then((data) => {
      setArticle(data);
    });
  }, [props.boardId]);

  if (!article) return <div>로딩 중...</div>;

  return (
    <>
      {/* 제목 */}
      <Card.Title className="mb-4 fs-3 border-bottom pb-2 text-center">
        {article.title}
      </Card.Title>

      {/* 글 정보 */}
      <Row className="mb-2 text-muted">
        <Col sm={6}>
          <strong>글번호:</strong> {article.boardId}
        </Col>
        <Col sm={6}>
          <strong>분류:</strong> {article.ctId || "없음"}
        </Col>
      </Row>
      <Row className="mb-3 text-muted">
        <Col sm={6}>
          <strong>작성자:</strong> {article.userId}
        </Col>
        <Col sm={6}>
          <strong>작성일:</strong>{" "}
          {article.regDate[0] +
            "-" +
            article.regDate[1] +
            "-" +
            article.regDate[2] || "알 수 없음"}
        </Col>
      </Row>

      {/* 내용 */}
      <div
        className="bg-light rounded p-3 mb-4"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {article.content}
      </div>
      <Button
        variant="light"
        size="sm"
        onClick={()=>handleLike(article.boardId, userId)}
      >
        👍 {article.likeCount || 0}
      </Button>
    </>
  );
};

export default Article;
