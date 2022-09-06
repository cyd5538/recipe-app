import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'

const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
  color: black;
  z-index: 101;
  .toggle {
    display: none;
  }

  .box {
    width: 450px;
    height: 750px;
    border-radius: 20px;
    padding: 2rem;
    background-color: white;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.35);

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
      height: 590px;
      flex-direction: column;
      position: relative;
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
        position: absolute;
        bottom: 0;
        cursor: pointer;
        width: 100%;
        margin-top: 20px;
        color: #fff;
        height: 40px;
        background-color: #4C3F49;
        border: 0;
        font-weight: 400;
        text-align: center;
        font-size: 20px;
        border-radius: 0.25rem;
        margin-top: 14px;
      }
    }
  }
  error {
  font-size: 16px;
  color: #ff6774;
  }
  label {
    color: grey;
    padding-left: 4px;
    font-size: 16px;
  }
`;

const Join = () => {
  const navigate= useNavigate();

  //react hook form
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
  });
  const { name, email, password, password2 } = watch();

  useEffect(() => {
    register("name");
    register("email");
    register("password");
  }, [register]);

  const handleChange = (e, name) => {
    setValue(name, e.target.value);
  };

  const registerUser = async (e) => {
    
    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        name,
        email,
        password,
      });
      const data = await response.data;
      if(data.status === "error"){
        alert("이미 존재하는 이메일입니다.")
      }
      alert("회원가입이 완료되었습니다.")
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginStyled>
      <div className="box">
        <div className="menu">
          <span>Sign Up</span>
        </div>
        <form onSubmit={handleSubmit(registerUser)} className="form">
          <label>이름</label>
          <input
            type="text"
            placeholder="id를 입력하세요"
            onChange={(e) => handleChange(e, "firstName")}
            value={name}
            {...register("name", { required: true,  })}
          />
          <error>
          {errors.name?.type === "required" && "이름이 꼭 필요합니다."}
          </error>
          <label>이메일</label>
          <input
            onChange={(e) => handleChange(e, "email")}
            value={email}
            placeholder="이메일을 입력하세요"
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
            })}
          />
          <error>
            {errors.email?.type === "required" && "이메일이 꼭 필요합니다"}
            {errors.email?.type === "pattern" && "이메일 포멧이 맞지 않습니다."}
          </error>
          <label>패스워드</label>
          <input
            type="password"
            onChange={(e) => handleChange(e, "password")}
            value={password}
            placeholder="패스워드를 입력하세요"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          <error>
            {errors.password?.type === "required" && "비밀번호를 입력해주세요"}
            {errors.password?.type === "minLength" &&
              "비밀번호는 적어도 6글자 이상입니다"}
            {errors.password?.type === "maxLength" &&
              "비밀번호는 최대 12글자 이하입니다."}
          </error>
          <label>패스워드 확인</label>
          <input
            type="password"
            onChange={(e) => handleChange(e, "password2")}
            value={password2}
            placeholder="패스워드를 입력하세요"
            {...register("password2", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          <error>
            {errors.password?.type === "required" && "비밀번호를 입력해주세요"}
            {errors.password?.type === "minLength" &&
              "비밀번호는 적어도 6글자 이상입니다"}
            {errors.password?.type === "maxLength" &&
              "비밀번호는 최대 12글자 이하입니다."}
          </error>
          <input type="submit" value="회원가입" />
        </form>
      </div>
    </LoginStyled>
  );
};

export default Join;
