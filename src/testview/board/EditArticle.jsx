import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation, Link } from "react-router-dom";
import ApiClient from "../../service/ApiClient";

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
    ApiClient.getArticle(boardId)
      .then(res => res.json())
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
        navigate('/', {state: { userId: userId }} );
      });
  };

  if (!article) return <div>로딩 중...</div>;
  if (userId.trim() === "guest") return <div>로그인 유저만 가능한 서비스입니다.</div>;

  return (
    <div>
      <h2>게시글 작성</h2>
      <h3>게시글 수정중입니다😎</h3>
      <p>작성자: {userId}</p>

      <select id="selectBox" name="category" onChange={handleCategoryChange} value={ctId}>
        <option value="0">공지</option>
        <option value="1">코드/에러</option>
        <option value="2">일반</option>
      </select>

      <table border="0" align="center">
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={article.title}
              />
            </td>
          </tr>
          <tr>
            <td>
              <textarea
                name="content"
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={article.content}
              />
            </td>
          </tr>

          {/*  조건부 렌더링 */}
          {isPacked && (
            <>
              <tr>
                <td>
                  <textarea
                    name="codeContent"
                    rows="10"
                    value={codeContent}
                    onChange={(e) => setCodeContent(e.target.value)}
                    placeholder={article.codeContent}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <textarea
                    name="errorContent"
                    rows="10"
                    value={errorContent}
                    onChange={(e) => setErrorContent(e.target.value)}
                    placeholder={article.errorContent}
                  />
                </td>
              </tr>
            </>
          )}

          <tr>
            <td colSpan="2">{regDate.toLocaleString()} / {updateDate.toLocaleString()}</td>
          </tr>
          <tr>
            <td align="right" colSpan="2">
              <button onClick={handleSubmit}>저장</button>
              <Link to={'/'} style={{ marginLeft: "10px" }}  state={{ userId: userId }}>취소</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EditArticle;
