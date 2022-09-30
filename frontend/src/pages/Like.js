import React, {useState, useEffect} from 'react'
import axios from 'axios';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Like = () => {
  const [favor, setFavor] = useState([]);
  // 토큰을 가져와서 headers에 넣기 

  const data = JSON.parse(localStorage.getItem("user"));
  const token = data.token;


 const getFavor = async () => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  const response = await axios.get(`http://localhost:5000/api/favors/`,config)
  const data = response.data
  setFavor(data)
  console.log(data)
  }

  useEffect(() => {
    getFavor()
  },[])
  

  return(
    <LikeStyle>
      <h2>나의 좋아요 목록</h2>
      <div className='card_container'>
        {favor?.map((data) => (
          <div className='card'>
            <Link to={`/${data.url}`}>
              <img src={data.image} alt={data.title} />
              <div>{data.title}</div>
            </Link>
          </div>
        ))}
      </div>
    </LikeStyle>
  )
}

export default Like

const LikeStyle = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 100px auto;

  h2{
    text-align: center;
  }

  .card_container{
    margin-top: 50px;
    display: flex; 
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .card{
      display: flex;
      width: 250px;
      height: 300px;
      gap: 1rem;
      justify-content: center;
      gap: 1rem;
      padding : 5px;
      transition: all 0.3s;
      div{
        text-align: center;
      }
    }
    .card:hover{
      border: 2px solid #f3bcf3;
    }

  }

  img{
    max-width: 250px;
    width: 100%;
    max-height: 250px;
    height: 100%;
    object-fit: cover;
  }
`