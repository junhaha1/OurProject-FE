import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Container, Table, Card, Button } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ApiClient from "../../services/ApiClient";

function EditArticle() {
  const location = useLocation();
  const userId = location.state?.userId || "guest";

  const [article, setArticle] = useState(null);
  const { boardId } = useParams();

  const [ctId, setCtId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeContent, setCodeContent] = useState("");
  const [errorContent, setErrorContent] = useState("");
  const [regDate, setRegDate] = useState("");
  const [updateDate, setUpdateDate] = useState(new Date());
  const [isPacked, setIsPacked] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    console.log("디테일 boardId:", boardId);
    ApiClient.getArticleDetail(boardId)
      .then(data => {
        console.log(data);
        setArticle(data);
        setCtId(data.ctId);
        setTitle(data.title);
        setContent(data.content);
        setCodeContent(data.codeContent);
        setErrorContent(data.errorContent);
        setRegDate(data.regDate);
        setUpdateDate(new Date());
        setIsPacked(data.ctId === "1");  // 코드/에러인 경우 활성화
      })
      .catch(err => console.error("게시글 불러오기 오류:", err));
  }, [boardId]);


  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCtId(selected);
    setIsPacked(selected === "1"); // "코드/에러"일 때만 true
  };

  const handleSubmit = () => {
    ApiClient.updateArticle(boardId, userId, ctId, title, content, codeContent, errorContent, regDate, updateDate)
      .then(() => {
        alert("게시글 수정 완료!");
        navigate('/', { state: { userId: userId } });
      });
  };

  if (!article) return <div>로딩 중...</div>;
  if (userId.trim() === "guest") return <div>로그인 유저만 가능한 서비스입니다.</div>;

  return (
    <>
      <Container className="mt-4">
        <Link
          to="/"
          state={{ userId: userId }}
          style={{ textDecoration: 'none' }}
        >
          <h1 className="fw-bold text-dark" style={{ cursor: 'pointer' }}>
            ourproject
          </h1>
        </Link>
      </Container>
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">게시글</h2>
            <p className="text-muted">작성자: {userId}</p>

            <select className="form-select mb-3" value={ctId} onChange={handleCategoryChange}>
              <option value="0">공지</option>
              <option value="1">코드/에러</option>
              <option value="2">일반</option>
            </select>

            <input
              className="form-control mb-3"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
            />

            <textarea
              className="form-control mb-3"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해주세요"
            />

            {isPacked && (
              <>
                <textarea
                  className="form-control mb-3"
                  rows="5"
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  placeholder="코드를 입력해주세요"
                />
                <textarea
                  className="form-control mb-3"
                  rows="5"
                  value={errorContent}
                  onChange={(e) => setErrorContent(e.target.value)}
                  placeholder="에러 내용을 입력해주세요"
                />
              </>
            )}

            <div className="mb-3 text-muted">{regDate.toLocaleString()} / {updateDate.toLocaleString()}</div>

            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-success" onClick={handleSubmit}>저장</button>
              <Link className="btn btn-danger" to={'/'} state={{ userId: userId }}>취소</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditArticle;