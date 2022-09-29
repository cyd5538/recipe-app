import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../feautures/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const [favor, setFavor] = useState([]);


  // 토큰을 가져와서 headers에 넣기 


  const getFavor = async () => {

  const datas = JSON.parse(localStorage.getItem("user")) || null;
  const token = datas.token;
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  const response = await axios.get(`http://localhost:5000/api/favors/`,config)
    const data = response.data
    setFavor(data)
  }

  useEffect(() => {
      getFavor()
  },[favor])

  return (
    <NavStyle>
      <div>
        <Link to="/">
          <h1>RECIPE</h1>
        </Link>
      </div>
      <div className="icon">
        {user ? (
          <>
          <div className="like">
            <Link to="/like">
              <div><AiFillHeart /></div>
              <span className="likelength">{favor.length}</span>
            </Link>
          </div>
          <div className="btn" onClick={onLogout}>
            로그아웃
          </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
            <Link to="/sign">
              <FaUser /> Register
            </Link>
          </>
        )}
      </div>
    </NavStyle>
  );
};

export default Nav;

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
    font-size: 1.1rem;
    div {
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }
    }
  }
  .btn {
    border: none;
    font-size: 1.2rem;
    background-color: #fff;
    cursor: pointer;
  }

  .toggle_container {
    position: relative;
  }


  .like{
    position: relative;
    a{
      color:red;
      font-size: 2rem;

    }
  }
  .likelength{
        position: absolute;
        top: -10px;
        right: -15px;
        font-size:1.3rem;
    
  }
`;