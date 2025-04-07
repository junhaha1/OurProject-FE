import { useEffect, useState } from "react";
import ApiClient from "../../services/ApiClient";
import { Card, Form } from "react-bootstrap";

const CommentList = (props) => {
  const [comments, setComments] = useState([]);

  /*각종 컨트롤 변수*/
  const [isWriting, setIsWriting] = useState(false); //사용자가 댓글을 작성 중인지 아닌지 나타내는 변수
  const [refresh, setRefresh] = useState(false); //댓글이 작성, 수정, 삭제됐을 시에 화면을 렌더링하기 위한 변수

  const [ctId, setCtId] = useState(2); //기본값 2 => 일반

  const [comment, setComment] = useState(""); //사용자가 작성한 댓글 내용
  const [codeComment, setCodeComment] = useState("")// 사용자가 입력하는 코드 댓글 내용 
  
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editComment, setEditComment] = useState("");
  const [editCodeComment, setEditCodeComment] = useState("");

  //댓글 등록
  const saveComment = (boardId, userId) => {
    let today = new Date();
    ApiClient.sendComment(boardId, userId, comment, codeComment, today, today)
      .then(() => {
        alert("댓글 등록 완료!");
        setComment("");
        setCodeComment("");
        setIsWriting(false);
        setRefresh(prev => !prev);
      });
  };

  //댓글 삭제
  const commentDelete = (commentId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      ApiClient.deleteComment(commentId)
        .then(res => {
          if (!res.ok) {
            throw new Error(`서버 오류: ${res.status}`);
          }
          alert("댓글 삭제 완료!");
          setRefresh(prev => !prev);
        })
        .catch(error => {
          console.error("댓글 삭제 중 오류 발생:", error);
          alert("댓글 삭제 중 오류가 발생했습니다.");
        });
    }
  };
  
  //댓글 수정 여부
  const commentEdit = (comment) => {
    setEditingCommentId(comment.commentId);
    setEditComment(comment.comment);
    setEditCodeComment(comment.codeComment || "");
  };

  //댓글 수정 요청
  const updateComment = () => {
    ApiClient.updateComment(editingCommentId, editComment, editCodeComment, new Date())
      .then(() => {
        alert("댓글 수정 완료!");
        setEditingCommentId(null);
        setEditComment("");
        setEditCodeComment("");
        setRefresh(prev => !prev);
      })
      .catch(error => {
        console.error("댓글 수정 오류:", error);
        alert("댓글 수정 중 오류가 발생했습니다.");
      });
  };

  //댓글 수정 취소
  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditComment("");
    setEditCodeComment("");

  };


  useEffect(() => {
    ApiClient.getCommentList(props.boardId)
      .then((data) => {
        console.log("댓글 응답:", data);
        setComments(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("댓글 가져오기 실패", error);
        setComments([]); // 에러 시에도 빈 배열 처리
      });
  }, [refresh, props.boardId]);

  if (props.userId.trim() === "guest") return <div></div>;

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
              {editingCommentId === comment.commentId && (
                <>
                <div className="d-flex flex-column ">
                  <input
                    type="text"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "0.5rem" }}
                  />
                  {editCodeComment !== "" && (
                    <input
                      type="text"
                      value={editCodeComment}
                      onChange={(e) => setEditCodeComment(e.target.value)}
                      placeholder="코드 댓글 수정"
                      style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "0.5rem" }}
                    />
                  )}
                </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={updateComment} style={{ backgroundColor: "#2196F3", color: "white", padding: "0.3rem 0.8rem", borderRadius: "4px", border: "none" }}>저장</button>
                    <button onClick={cancelEdit} style={{ backgroundColor: "#aaa", color: "white", padding: "0.3rem 0.8rem", borderRadius: "4px", border: "none" }}>취소</button>
                  </div>
                </>
              )}
              {editingCommentId !== comment.commentId &&(
                <>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex flex-column ">
                    <div style={{ whiteSpace: "pre-wrap", flex: 1 }}>
                      {comment.comment}
                    </div>
                    {comment.codeComment !== "" && (
                      <div style={{ whiteSpace: "pre-wrap", flex: 1 }}>
                        {comment.codeComment}
                      </div>
                    )}
                  </div>
                  <div
                    className="text-end text-muted ms-3"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    👍 {comment.likeCount || 0}
                  </div>
                </div>
                {comment.userId.trim() === props.userId && (
                  <>
                    <div style={{ marginTop: "0.5rem", textAlign: "right" }}>
                      <button onClick={()=>commentEdit(comment)} style={{ marginRight: "0.5rem" }}>수정</button>
                      <button onClick={()=>commentDelete(comment.commentId)}>삭제</button>
                    </div>
                  </>
                )}
              </>
              )}
            </Card.Body>
          </Card>
        ))
      )}
      {!isWriting && (  //댓글 작성 중이면 버튼 안 보임임
        <button
          onClick={() => setIsWriting(true)}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px" }}
        >
          댓글 작성
        </button>
      )}
      {isWriting && (
        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Form.Select
            aria-label="카테고리 선택"
            value={ctId}
            onChange={(e) => setCtId(Number(e.target.value))}
          >
            <option value="1">코드/에러</option>
            <option value="2">일반</option>
          </Form.Select>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력해주세요."
            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          {ctId === 1 && (
            <input
              type="text"
              value={codeComment}
              onChange={(e) => setCodeComment(e.target.value)}
              placeholder="코드 댓글을 입력해주세요."
              style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          )}
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => saveComment(props.boardId, props.userId)}
              style={{ padding: "0.5rem 1rem", backgroundColor: "#2196F3", color: "white", border: "none", borderRadius: "5px" }}
            >
              등록
            </button>
            <button
              onClick={() => setIsWriting(false)}
              style={{ padding: "0.5rem 1rem", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px" }}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentList;
