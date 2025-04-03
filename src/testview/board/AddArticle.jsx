import {useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ApiClient from "../../service/ApiClient";

function AddArticle() {
  const location = useLocation();
  const userId = location.state?.userId || "user01@naver.com"; // 기본값 설정
  const [ctId, setCtId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeContent, setCodeContent] = useState("");
  const [errorContent, setErrorContent] = useState("");
  let today = new Date();
  const [regDate, setRegDate] = useState(today);
  const [updateDate, setUpdateDate] = useState(today);
  
  const navigate = useNavigate(); 

  const handleSubmit = () => {
    ApiClient.sendArticle(userId, ctId, title, content, codeContent, errorContent, regDate, updateDate)
    .then(() => {
      alert("게시글 등록 완료!");
      navigate('/');
    });
  };

  return (
    <div>
      <h2>게시글 작성</h2>
      <p>작성자: {userId}</p>
      <table border="0" align="center">
        <tbody>
          
            <tr>
                <td colSpan="2">
                    <input type="text" name="i_title" class="class-content" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요." />
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <textarea name="content" rows="10"
                        class="class-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력해주세요" />
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <textarea name="codeContent" rows="10"
                        class="class-content" value={codeContent} onChange={(e) => setCodeContent(e.target.value)} placeholder="코드를 입력해주세요" />
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <textarea name="errorContent" rows="10"
                        class="class-content" value={errorContent} onChange={(e) => setErrorContent(e.target.value)} placeholder="에러 내용을 입력해주세요" />
                </td>
            </tr>
            <p>{regDate.toLocaleString()} / {updateDate.toLocaleString()}</p>
            <tr>
                <td align="right"></td>
                <td colspan="2">
                  <button onClick={() => handleSubmit(userId)}>등록</button>
                  <Link to={'/'}>취소</Link>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}
export default AddArticle;