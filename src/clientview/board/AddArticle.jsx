import {useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ApiClient from "../../services/ApiClient";

function AddArticle() {
  const [userId, setUserId] = useState("test@naver.com"); //나중에 변경될 구조 (하드코딩 : 사용자 test로 고정) => 이유: 로그인 구현 X
  const [title, setTitle] = useState("");
  const [ctId, setCtId] = useState(1); //기본값 1 
  const [content, setContent] = useState("");
  const [codeContent, setCodeContent] = useState("");
  const [errorContent, setErrorContent] = useState("");
  const [regDate, setRegDate] = useState("2025-04-03"); //하드코딩 변경될 곳
  const navigate = useNavigate(); 

  const handleSubmit = () => {
    //API서버로 보낼 JSON
    const article_data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, title, ctId, content, codeContent, errorContent, regDate }),
    };
    
    ApiClient.sendArticle(userId, article_data)
    .then(() => {
      alert("게시글 등록 완료!");
      navigate('/');
    });
  };
  
  return (
    <div>
      <input type="text" value={userId} disabled />
      <input type="text" value={ctId} disabled />
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용" />
      <textarea value={codeContent} onChange={(e) => setCodeContent(e.target.value)} placeholder="코드내용" />
      <textarea value={errorContent} onChange={(e) => setErrorContent(e.target.value)} placeholder="에러내용" />
      <button onClick={handleSubmit}>등록</button>
      <Link to={'/'}>취소</Link>
    </div>
  );
}
export default AddArticle;