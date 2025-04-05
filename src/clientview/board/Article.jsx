import { useEffect, useState } from "react";
import ApiClient from "../../services/ApiClient";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const Article = (props) => {
  const [article, setArticle] = useState(null);
  const [userId, setUserId] = useState("test@naver.com");
  const [existsGood, setExistsGood] = useState(null);

  const getCategoryLabel = (ctId) => { //카테고리 아이디 -> 텍스트로 변환
    switch (ctId) {
      case 0:
        return "공지";
      case 1:
        return "코드/에러";
      case 2:
        return "일반";
      default:
        return "알 수 없음";
    }
  };

  const handleLike = async (articleId, userId) => { // 서버에 좋아요 요청 이벤트
    try {
      await ApiClient.addLikeArticle(articleId, userId); // 서버에 좋아요 요청 보내기
      const response = await ApiClient.countBoardGood(articleId);
      const count = await response.json();  // 서버에서 숫자만 내려준다고 가정
      setExistsGood(true);

      setArticle((prev) => ({
        ...prev,
        likeCount: count,
      }));
    } catch (error) {
      console.error("좋아요 수 조회 실패", error);
    }
  };

  const handleUnlike = async (articleId, userId) => { // 서버에 좋아요 삭제 요청 이벤트
    try {
      await ApiClient.deleteLikeArticle(articleId, userId); // 서버에 좋아요 삭제 요청 보내기
      const response = await ApiClient.countBoardGood(articleId);
      const count = await response.json();  // 서버에서 숫자만 내려준다고 가정
      setExistsGood(false);

      setArticle((prev) => ({
        ...prev,
        likeCount: count,
      }));
    } catch (error) {
      console.error("좋아요 수 조회 실패", error);
    }
  };

  useEffect(() => {
    ApiClient.getArticleDetail(props.boardId).then((data) => {
      setArticle(data);
    });

    ApiClient.getExistsBoardGood(props.boardId, userId).then((data) => {
      setExistsGood(data);
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
          <strong>분류:</strong> {getCategoryLabel(article.ctId)}
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
      {article.ctId === 1 && (
        <>
          <div
            className="bg-light rounded p-3 mb-4"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {article.codeContent}
          </div>
          <div
            className="bg-light rounded p-3 mb-4"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {article.errorContent}
          </div>
        </>
      )}
      <Button
        variant="light"
        size="sm"
        onClick={() =>{
          existsGood
            ? handleUnlike(article.boardId, userId)
            : handleLike(article.boardId, userId)
        }
        }
      >
        {existsGood ? "❤️" : "🤍"} {article.likeCount || 0}
      </Button>
    </>
  );
};

export default Article;
