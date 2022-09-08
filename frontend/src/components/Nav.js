import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";    
import { AiFillHeart } from "react-icons/ai";
import { FiUserPlus, FiLogIn } from "react-icons/fi";

const NavStyle = styled.div`
  width: 100%;
  height: 70px;
  color: #4c3f49;
  display: flex;
  justify-content: space-between;
  padding-left: 10rem;
  padding-right: 10rem;
  align-items: center;

  h1 {
    color: black;
    font-size: 2rem;
  }
  .form {
    display: flex;
    flex-direction: column;
    padding-top: 40px;
    gap: 1rem;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.3rem;
    font-size: 1.5rem;
    font-weight: bold;
    div{
        a{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }
        span:last-child{
            font-size: 0.7rem;
            color:black;
        }
    }
  }
`;

const Nav = () => {
  return (
    <NavStyle>
      <div>
        <Link to="/">
          <h1>RECIPE</h1>
        </Link>
      </div>
      <div className="icon">
        <div>
          <AiFillHeart />
        </div>
        <div>
            <Link to="/login">
                <span><FiLogIn /></span>
                <span>로그인</span>
            </Link>
        </div>
        <div>
            <Link to="/sign">
                <span><FiUserPlus /></span>
                <span>회원가입</span>
            </Link>
        </div>
      </div>
    </NavStyle>
  );
};

export default Nav;
