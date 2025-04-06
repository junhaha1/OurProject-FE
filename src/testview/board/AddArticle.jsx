import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ApiClient from "../service/ApiClient";

function AddArticle() {
  const location = useLocation();
  const userId = location.state?.userId || "guest";

  const [ctId, setCtId] = useState("0");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeContent, setCodeContent] = useState("");
  const [errorContent, setErrorContent] = useState("");
  const [regDate] = useState(new Date());
  const [updateDate] = useState(new Date());
  const [isPacked, setIsPacked] = useState(false);

  const navigate = useNavigate();


  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCtId(selected);
    setIsPacked(selected === "1"); // "코드/에러"일 때만 true
  };

  const handleSubmit = () => {
    ApiClient.sendArticle(userId, ctId, title, content, codeContent, errorContent, regDate, updateDate)
      .then(() => {
        alert("게시글 등록 완료!");
        navigate('/' , {state: { userId: userId }});
      });
  };

  if (userId.trim() === "guest") return <div>로그인 유저만 가능한 서비스입니다.</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-3">📄 게시글 작성</h2>
      <p className="text-muted">작성자: <strong>{userId}</strong></p>
  
      <div className="mb-3">
        <label htmlFor="selectBox" className="form-label">카테고리</label>
        <select id="selectBox" className="form-select" value={ctId} onChange={handleCategoryChange}>
          <option value="0">공지</option>
          <option value="1">코드/에러</option>
          <option value="2">일반</option>
        </select>
      </div>
  
      <div className="mb-3">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          placeholder="제목을 입력해주세요."
        />
      </div>
  
      <div className="mb-3">
        <textarea
          name="content"
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
          placeholder="내용을 입력해주세요"
        />
      </div>
  
      {isPacked && (
        <>
          <div className="mb-3">
            <textarea
              name="codeContent"
              rows="6"
              value={codeContent}
              onChange={(e) => setCodeContent(e.target.value)}
              className="form-control"
              placeholder="코드를 입력해주세요"
            />
          </div>
          <div className="mb-3">
            <textarea
              name="errorContent"
              rows="6"
              value={errorContent}
              onChange={(e) => setErrorContent(e.target.value)}
              className="form-control"
              placeholder="에러 내용을 입력해주세요"
            />
          </div>
        </>
      )}
  
      <p className="text-secondary">{regDate.toLocaleString()} / {updateDate.toLocaleString()}</p>
  
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary me-2" onClick={handleSubmit}>등록</button>
        <Link className="btn btn-outline-secondary" to="/" state={{ userId: userId }}>
          취소
        </Link>
      </div>
    </div>
  );
}

export default AddArticle;
