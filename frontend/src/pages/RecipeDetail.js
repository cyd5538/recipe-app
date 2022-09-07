import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Spinner from "../style/Spinner";

const RecipeDetailStyled = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 100px auto;
  .container {
    display: flex;
    flex-wrap: wrap;

    .container_img {
      flex: 1;
      img {
        width: 450px;
      }
    }
    .container_text {
      flex: 1;
      display: flex;
      flex-direction: column;

      height: 100%;
      .title {
        font-size: 2rem;
        color: red;
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
        background-color: #f00;
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

const RecipeDetail = () => {
  const [datas, setDatas] = useState([]);
  const [getdata, setGetdata] = useState(false);
  const [tapmenu, setTapmenu] = useState(true);
  let { id } = useParams();
  let replaced_id = id.replace(" ", "_");

  // cosr 막히면 https://cors-anywhere.herokuapp.com/ 추가
  const getData = async () => {
    const response = await axios.get(
      `http://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_SERVICE_KEY}/COOKRCP01/json/1/1/RCP_NM=${replaced_id}`
    );
    setDatas(response.data.COOKRCP01.row[0]);
    setGetdata(true);
    console.log(datas);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <RecipeDetailStyled>
      {getdata ? (
        <>
          <div className="container">
            <div className="container_img">
              <img src={datas.ATT_FILE_NO_MK} alt="" />
            </div>

            <div className="container_text">
              <div className="title">{datas.RCP_NM}</div>
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
