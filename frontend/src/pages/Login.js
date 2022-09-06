import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: 100px;

  color: black;
  z-index: 101;
  .toggle {
    display: none;
  }

  .box {
    width: 400px;
    height: 400px;
    border-radius: 20px;
    padding: 1rem;
    background-color: white;
    box-shadow: 0px 0px 42px 7px rgba(0, 0, 0, 0.55);

    .menu {
      display: flex;
      margin-bottom: 50px;
      padding: 1rem;
      display: flex;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      input {
        width: 100%;
        height: 40px;
        background-color: white;
        font-size: 20px;
        margin-bottom: 5px;
        border: 0;
        border-radius: 5px;
        padding: 3px;
        box-shadow: 3px 3px 4px 1px rgba(0, 0, 0, 0.28);
      }
      input {
        padding-left: 1rem;
      }
      input:last-child {
        cursor: pointer;
        width: 100%;
        margin-top: 80px;
        color: #fff;
        height: 40px;
        background-color: #4c3f49;
        border: 0;
        font-weight: 400;
        text-align: center;
        font-size: 20px;
        border-radius: 0.25rem;
        margin-top: 14px;
      }
    }
  }

  .login_on{
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginsuccess, setLoginsuccess] = useState(false);
  const [logindata, setLogindata] = useState([])
  const [userdata, setUserdata] = useState([]);
  
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      setLogindata(response.data)
      console.log(logindata)
      
      if(logindata.status === "success"){
        setLoginsuccess(true);
        document.cookie = `access_token = ${logindata.access_token}`
       
      }else{
        alert("아이디와 비밀번호를 확인해주세요.")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/user/${email}`)
      setUserdata(response.data)
      console.log(userdata)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(document.cookie.indexOf('access_token') > 1){
      setLoginsuccess(true);
    }
  },[])

  return (
    <LoginStyled>
      {loginsuccess ? (
          <div className="login_on">
            <div>환영합니다 {userdata[0]?.name}</div>
            <div onClick={() => setLoginsuccess(false)}>로그아웃</div>
          </div>
      ) : (
        <>
          <div className="box">
            <div className="menu">
              <span>Sign In</span>
            </div>
            <form onSubmit={loginUser} className="form">
              <input
                type="email"
                value={email}
                placeholder="Email을 입력해주세요"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                value={password}
                placeholder="비밀번호를 입력해주세요"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="submit" value="로그인" />
            </form>
          </div>
        </>
      )}
    </LoginStyled>
  );
};

export default Login;
