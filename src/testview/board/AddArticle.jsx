import {useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ApiClient from "../../service/ApiClient";

function AddArticle() {
  const location = useLocation();
  const userId = location.state?.userId || "guest"; // 기본값 설정
  const [ctId, setCtId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeContent, setCodeContent] = useState("");
  const [errorContent, setErrorContent] = useState("");
  let today = new Date();
  const [regDate, setRegDate] = useState(today);
  const [updateDate, setUpdateDate] = useState(today);
  const [isPacked, setIsPacked] = useState(false);

  const navigate = useNavigate(); 

  const handleSubmit = () => {
    ApiClient.sendArticle(userId, ctId, title, content, codeContent, errorContent, regDate, updateDate)
    .then(() => {
      alert("게시글 등록 완료!");
      navigate('/');
    });
  };

  const selctCategory = (e) => {
    setCtId(e.target.value);
    console.log(ctId);
  }

  const checkCategory = () =>{
    switch(ctId){
      case 0:
        setIsPacked(false);
        break;
      case 1:
        setIsPacked(true);
        break;
      case 2:
        setIsPacked(false);
        break;

    }
  }

  function Item({ isPacked }) {
    if (isPacked) {
      return (
        <div>
          <tr>
            <td colSpan="2">
              <textarea name="codeContent" rows="10"
                value={codeContent} onChange={(e) => setCodeContent(e.target.value)} placeholder="코드를 입력해주세요" />
            </td>
          </tr>
          <tr>
              <td colSpan="2">
                <textarea name="errorContent" rows="10"
                  value={errorContent} onChange={(e) => setErrorContent(e.target.value)} placeholder="에러 내용을 입력해주세요" />
              </td>
          </tr>
        </div>      

      );
    }
    return null;
  }

  if(userId.trim() === "guest") return <div>로그인 유저만 가능한 서비스 입니다. </div>;

  return (
    <div>
      <h2>게시글 작성</h2>
      <p>작성자: {userId}</p>
      <select id="selectBox" name="category" onChange={selctCategory}>
              <option value='0'>공지</option>
              <option value='1'>코드/에러</option>
              <option value='2'>일반</option>
            </select>
          
      <table border="0" align="center">
        <tbody>            
            <tr>
                <td colSpan="2">
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요." />
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <textarea name="content" rows="10"
                       value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력해주세요" />
                </td>
            </tr>
            <tr>
              <Item isPacked={isPacked}/>
            </tr>
            
            <p>{regDate.toLocaleString()} / {updateDate.toLocaleString()}</p>
            <tr>
                <td align="right"></td>
                <td>
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