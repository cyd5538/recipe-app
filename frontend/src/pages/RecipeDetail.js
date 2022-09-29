import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Spinner from "../style/Spinner";
import { toast } from 'react-toastify';

const RecipeDetail = () => {
  const [datas, setDatas] = useState([]);
  const [getdata, setGetdata] = useState(false);
  const [tapmenu, setTapmenu] = useState(true);
  const [favor, setFavor] = useState([]);
  const [IsFavor, setIsFavor] = useState(true);
  let { id } = useParams();
  let replaced_id = id.replaceAll(" ", "_");

  // cosr 막히면 https://cors-anywhere.herokuapp.com/ 추가
  const getData = async () => {
    const response = await axios.get(
      `http://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_SERVICE_KEY}/COOKRCP01/json/1/1/RCP_NM=${replaced_id}`
    );
    setDatas(response.data.COOKRCP01.row[0]);
    setGetdata(true)
  };

  useEffect(() => {
    getData();
  }, []);

  // 토큰을 가져와서 headers에 넣기 

  const data = JSON.parse(localStorage.getItem("user"));
  const token = data.token;

  // 찜하기버튼 구현하려는 get
  const getAllFavor = async () => {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.get(`http://localhost:5000/api/favors/`, config)
    const data = response.data

    setFavor(data);
    await truefalse()

  }

  const truefalse = async () => {
    let data = favor.map((d) => d.url)
    let dataresult = data.find((f) => f === replaced_id)
    
    if (dataresult !== undefined) {
      setIsFavor(false)
    } else {
      setIsFavor(true);
    }
  }


    // 즐겨찾기 on
    const favorClick = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const title = datas.RCP_NM
      const image = datas.ATT_FILE_NO_MK
      const url = replaced_id
      axios.post(`http://localhost:5000/api/favors/`, {
        title,
        image,
        url
      }, config)
   
      toast('즐겨찾기에서 추가되었습니다')
    }


      // 찜목록에서 useparam으로 페이지 url 가져온 배열만 추출해서 삭제api에다가 넣어줌.
    function delIdGet(a) {
      if(a.url === replaced_id) {
        return true
      }
    }
    const ab = favor.find((delIdGet))
   
      // 즐겨찾기 off
    const favorNotClick = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
      },
    }

    await axios.delete(`http://localhost:5000/api/favors/${ab._id}`, config)
 
    toast('즐겨찾기에서 제거되었습니다');
  }


    useEffect(() => {
      getAllFavor()
    },[favor,IsFavor]);

  return (
    <RecipeDetailStyled>
      {getdata ? (
        <>
          <div className="container">
            <div className="container_img">
              <img src={datas.ATT_FILE_NO_MK} alt="" />
            </div>

            <div className="container_text">
              <div className="titlelike">
                <div className="title">{datas.RCP_NM}</div>
                {IsFavor ? <div onClick={() => favorClick()} className="like">추가</div>
                : <div onClick={() => favorNotClick()} className="like">삭제</div>}
              </div>
              <div className="choice">
                <div onClick={() => setTapmenu(true)}>재료</div>
                <div onClick={() => setTapmenu(false)}>레시피</div>
              </div>
              {tapmenu ? (
                <div>{datas.RCP_PARTS_DTLS}</div>
              ) : (
                <div className="recipe">
                  <div>{datas.MANUAL01}</div>
                  <div>{datas.MANUAL02}</div>
                  <div>{datas.MANUAL03}</div>
                  <div>{datas.MANUAL04}</div>
                  <div>{datas.MANUAL05}</div>
                  <div>{datas.MANUAL06}</div>
                  <div>{datas.MANUAL07}</div>
                  <div>{datas.MANUAL08}</div>
                  <div>{datas.MANUAL09}</div>
                  <div>{datas.MANUAL10}</div>
                  <div>{datas.MANUAL11}</div>
                  <div>{datas.MANUAL12}</div>
                  <div>{datas.MANUAL13}</div>
                  <div>{datas.MANUAL14}</div>
                  <div>{datas.MANUAL15}</div>
                  <div>{datas.MANUAL16}</div>
                  <div>{datas.MANUAL17}</div>
                  <div>{datas.MANUAL18}</div>
                  <div>{datas.MANUAL19}</div>
                  <div>{datas.MANUAL20}</div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </RecipeDetailStyled>
  );
};

export default RecipeDetail;

const RecipeDetailStyled = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 100px auto;
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .container_img {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
      img {
        max-width: 450px;
        width: 100%;
      }
    }
    .container_text {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      padding-left: 10px;
      padding-right: 10px;

      .titlelike{
   
        padding-right: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .like{
        font-size: 2rem;
        color: red;
        cursor: pointer;
      }

      .title {
        font-size: 2rem;
        font-weight: bold;
      }
    }
    .choice {
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;
      gap: 2rem;
      font-size: 1.3rem;
      cursor: pointer;
      div {
        padding: 5px;
        border-radius: 10px;
        background-color: #222;
        color: white;
      }
    }
  }

  span {
    font-weight: bold;
  }

  .recipe {
    div {
      margin-bottom: 15px;
    }
  }
`;
