import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import ApiClient from '../../service/ApiClient';

const LoginView = () => {
    const [userId, setUserId] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState('guest');

    const navigate = useNavigate(); 

    const handleSubmit = (id, pw) =>{
        ApiClient.getUser(userId)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            if(id.trim() === data.userId.trim()){
                setUserId(data.userId);
                setName(data.name);
            }else{
                alert("아이디를 확인해주세요");
                return;
            }

            if(pw.trim() === data.pwd.trim()){
                setPwd(data.pwd);
            }else{
                alert("비밀번호를 확인해주세요");
                return;
            }           

            navigate('/', { state: { userId: userId, name: name}});
        }).catch((error) => {
            console.error("Error fetching user:", error);
            alert("서버 오류가 발생했습니다.");
        });    
    }




    return (
        <div>
            <h2>Login</h2>
            <table border="0" align="center">
        <tbody>            
            <tr>
                <td colSpan="2">
                    <input type="text" name="userId" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="ID" />
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                    <input type="password" name="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="PASSWARD" />
                </td>
            </tr>
            <Link to={'/'}>비밀번호 찾기 / 아이디 찾기 </Link>
            <tr>
                <td align="right"></td>
                <td>
                  <button onClick={() => handleSubmit(userId, pwd)}>로그인</button>
                  <Link to={'/'}>처음으로 </Link>
                </td>
            </tr>
        </tbody>
      </table>
        </div>
    );
};

export default LoginView;