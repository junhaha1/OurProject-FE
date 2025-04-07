import { useEffect, useState } from "react";
import ApiClient from "../../services/ApiClient";
import { Card } from "react-bootstrap";

const CommentList = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    ApiClient.getCommentList(props.boardId)
      .then((data) => {
        console.log("댓글 응답:", data);
        setComments(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("댓글 가져오기 실패", error);
        setComments([]); // 에러 시에도 빈 배열 처
      });
  }, [props.boardId]);

  return (
    <div>
      {comments.length === 0 ? (
        <div className="text-muted">댓글이 없습니다.</div>
      ) : (
        comments.map((comment) => (
          <Card key={comment.commentId} className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <div className="fw-bold">{comment.userId}</div>
                <div className="text-muted small">{comment.regDate}</div>
              </div>
              <div className="d-flex justify-content-between align-items-start">
                <div style={{ whiteSpace: "pre-wrap", flex: 1 }}>
                  {comment.comment}
                </div>
                <div
                  className="text-end text-muted ms-3"
                  style={{ whiteSpace: "nowrap" }}
                >
                  👍 {comment.likeCount || 0}
                </div>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
      <button
        onClick={() => setIsWriting(true)}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px" }}
      >
        댓글 작성
      </button>
    </div>
  );
};

export default CommentList;
