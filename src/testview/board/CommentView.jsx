import { useEffect, useState } from 'react';
import ApiClient from '../service/ApiClient';

const CommentView = ({ boardId, userId, ctId }) => {
  console.log("ctId: " + ctId + "| userID: " + userId);  
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState("");
  const [codeComment, setCodeComment] = useState("");
  const today = new Date();
  const [regDate] = useState(today);
  const [updateDate] = useState(today);

  const [refresh, setRefresh] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  const [editingId, setEditingId] = useState(null); // 수정 중인 댓글 ID
  const [editComment, setEditComment] = useState("");
  const [editCodeComment, setEditCodeComment] = useState("");

  useEffect(() => {
    ApiClient.getComment(boardId)
      .then(res => res.json())
      .then(data => {
        setComments(data);
        console.log(data);
      });
  }, [refresh, boardId]);

  const saveComment = () => {
    ApiClient.sendComment(boardId, userId, comment, codeComment, regDate, updateDate)
      .then(() => {
        alert("댓글 등록 완료!");
        setComment("");
        setCodeComment("");
        setIsWriting(false);
        setRefresh(prev => !prev);
      });
  };

  const commentEdit = (comment) => {
    setEditingId(comment.commentId);
    setEditComment(comment.comment);
    setEditCodeComment(comment.codeComment || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditComment("");
    setEditCodeComment("");
  };

  const updateComment = () => {
    ApiClient.updateComment(editingId, editComment, editCodeComment)
      .then(() => {
        alert("댓글 수정 완료!");
        setEditingId(null);
        setEditComment("");
        setEditCodeComment("");
        setRefresh(prev => !prev);
      })
      .catch(error => {
        console.error("댓글 수정 오류:", error);
        alert("댓글 수정 중 오류가 발생했습니다.");
      });
  };

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

  return (
    <div style={{ marginTop: "2rem", padding: "1rem", borderTop: "1px solid #ccc" }}>
      <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>💬 댓글</h2>

      {comments.length === 0 && (
        <div>댓글이 없습니다. <br /> 첫 번째 댓글을 달아보세요.</div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {comments.map((a) => (
          <div key={a.commentId} style={{ padding: "0.5rem", border: "1px solid #ddd", borderRadius: "8px" }}>
            <div><strong>{a.userId}</strong></div>

            {editingId === a.commentId ? ( //댓글 수정
              <>
                <input
                  type="text"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "0.5rem" }}
                />
                {ctId === 1 && (
                  <input
                    type="text"
                    value={editCodeComment}
                    onChange={(e) => setEditCodeComment(e.target.value)}
                    placeholder="코드 댓글 수정"
                    style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", marginBottom: "0.5rem" }}
                  />
                )}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={updateComment} style={{ backgroundColor: "#2196F3", color: "white", padding: "0.3rem 0.8rem", borderRadius: "4px", border: "none" }}>저장</button>
                  <button onClick={cancelEdit} style={{ backgroundColor: "#aaa", color: "white", padding: "0.3rem 0.8rem", borderRadius: "4px", border: "none" }}>취소</button>
                </div>
              </>
            ) : (
              <>
                <div>{a.comment}</div>
                {a.codeComment && <div style={{ color: "#555", fontStyle: "italic" }}>💻 {a.codeComment}</div>}
                <div style={{ fontSize: "0.8rem", color: "#888" }}>{a.regDate}</div>
                {userId.trim() === a.userId && (  //본인이 쓴 댓글만 수정&삭제
                  <div style={{ marginTop: "0.5rem" }}> 
                    <button onClick={() => commentEdit(a)} style={{ marginRight: "0.5rem" }}>수정</button>
                    <button onClick={() => commentDelete(a.commentId)}>삭제</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

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
          <div style={{ fontSize: "0.8rem", color: "#aaa" }}>{regDate.toLocaleString()}</div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={saveComment}
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

export default CommentView;
