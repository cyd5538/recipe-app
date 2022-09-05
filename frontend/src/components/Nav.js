import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { BsFillPeopleFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";

const NavStyle = styled.div`
    width : 100%;
    height: 70px;
    color: #4C3F49;
    display: flex;
    justify-content: space-between;
    padding-left: 10rem;
    padding-right: 10rem;
    align-items: center;
    

    h1{
        color: black;
        font-size: 1.3rem;
    }
    .form{
        display: flex;
        flex-direction: column;
        padding-top: 40px;
        gap: 1rem;
    }
    .icon{
        display: flex; 
        gap: 1rem;
        font-size: 1.2rem;
        font-weight: bold;
        div{
            display: flex;
            gap: 0.5rem;
            cursor: pointer;
        }
    }

`

const Nav = () => {
  return (
    <NavStyle>
        <div>
            <Link to="/">
                <h1>
                    RECIPE
                </h1>
            </Link>
        </div>
        <div className='icon'>
            <div><AiFillHeart /></div>
            <div><BsFillPeopleFill /></div>
        </div>
    </NavStyle>
  )
}

export default Nav