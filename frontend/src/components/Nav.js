import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../feautures/auth/authSlice";
import { useNavigate } from "react-router-dom";

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
      span:last-child {
        font-size: 0.7rem;
        color: black;
      }
    }
  }
  .btn {
    border: none;
    font-size: 1.1rem;
    background-color: #fff;
    cursor: pointer;
  }

  .toggle_container {
    position: relative;
  }


`;

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <NavStyle>
      <div>
        <Link to="/">
          <h1>RECIPE</h1>
        </Link>
      </div>
      <div className="icon">
        {user ? (
          <div className="btn" onClick={onLogout}>
            로그아웃
          </div>
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
