import { Container } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import ApiClient from "../../services/ApiClient";

function LoginForm() {
  const [userId, setUserId] = useState("");
  const [pwd, setPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [isCheck, setIsCheck] = useState(false);

  const [name, setName] = useState('guest');
  const [regDate, setRegDate] = useState(new Date);

  const navigate = useNavigate(); 

  const SignupSubmit = (userId, name, pwd, regDate) =>{
    if(pwd !== checkPwd){
        alert("비밀번호가 일치하지 않습니다. ");

    }else{
        ApiClient.sendUser(userId, name, pwd, regDate)
        .then(() => {
            alert("회원가입을 환영합니다!");
            navigate('/');
        });
    }    
  }  

  return (
    <>
      <Container className="mt-4">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="fw-bold text-dark" style={{ cursor: 'pointer' }}>
            ourproject
          </h1>
        </Link>
      </Container>
      <div className="container mt-5">
          <div className="card mx-auto" style={{ maxWidth: '400px' }}>
            <div className="card-body">
              <h2 className="card-title text-center">Sign Up</h2>
              <p>이름</p>
              <input className="form-control mb-3" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <p>이메일</p>
              <input className="form-control mb-3" type="text" placeholder="Email" value={userId} onChange={(e) => setUserId(e.target.value)} />
              <p>비밀번호</p>
              <input className="form-control mb-3" type="password" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
              <input className="form-control mb-3" type="password" placeholder="Check your password" value={checkPwd} onChange={(e) => setCheckPwd(e.target.value)} />
              <div className="d-flex justify-content-between">
                <Link to={'/login'}>이미 회원이신가요?</Link>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-primary" onClick={() => SignupSubmit(userId, name, pwd, regDate)}>회원가입</button>
                <Link className="btn btn-secondary" to={'/'}>처음으로</Link>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default LoginForm;