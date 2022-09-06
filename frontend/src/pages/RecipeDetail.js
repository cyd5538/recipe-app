import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import styled from 'styled-components';

const RecipeDetailStyled = styled.div`
  max-width: 1000px;
  width: 100%;
  margin : auto;
`

const RecipeDetail = () => {
  const [datas, setDatas] = useState([]);
  let { id } = useParams();
  let replaced_id = id.replace(' ', '_');
 
  // cosr 막히면 https://cors-anywhere.herokuapp.com/ 추가
  const getData = async () => {
      const response = await axios.get(`http://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_SERVICE_KEY}/COOKRCP01/json/1/1/RCP_NM=${replaced_id}`)
      setDatas(response.data.COOKRCP01.row[0]);
      console.log(datas);
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <RecipeDetailStyled>
      
          <img src={datas.ATT_FILE_NO_MK} alt="" />
          <div>{datas.RCP_NM}</div>
          <div>재료 {datas.RCP_PARTS_DTLS}</div>

    </RecipeDetailStyled>
    
  )
}

export default RecipeDetail