import {useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = () => {
    fetch("http://localhost:8080/boardAPI/addArticle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    }).then(() => {
      alert("게시글 등록 완료!");
      navigate('/');
    });
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용" />
      <button onClick={handleSubmit}>등록</button>
      <Link to={'/'}>취소</Link>
    </div>
  );
}
export default AddArticle;