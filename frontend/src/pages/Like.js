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
      <div className='card'>
        {favor?.map((data) => (
          <div>
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

  .card{
    margin-top: 50px;
    display: flex; 
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    div{
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
  }

  img{
    max-width: 200px;
    width: 100%;
  }
`