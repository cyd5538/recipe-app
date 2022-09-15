import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Search from "../components/Home/Search";
import Recipe from "../components/Home/Recipe";
import { Link } from "react-router-dom";

const HomeStyle = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: auto;

  .search_container {
    margin: 70px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    gap: 2rem;
    img {
      width: 220px;
      height: 220px;
      border-radius: 20px;
      cursor: pointer;
      transition: all ease-in 0.3s;
    }
    img:hover {
      transform: scale(1.1);
    }
  }
`;

const Home = () => {
  const [searchdata, setSearchdata] = useState("");
  const [datas, setDatas] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `/${process.env.REACT_APP_SERVICE_KEY}/COOKRCP01/json/1/20/RCP_NM=${searchdata}`
      );
      setDatas(response.data.COOKRCP01.row);
    } catch (error) {
      console.log(Error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getData();
  };

  const searchTag = async (tag) => {
    setSearchdata(tag);
  };

  return (
    <HomeStyle>
      <Search
        searchdata={searchdata}
        setSearchdata={setSearchdata}
        handleSubmit={handleSubmit}
        searchTag={searchTag}
      />

      <div className="search_container">
        {datas === undefined ? (
          <div>검색 결과가 없습니다</div>
        ) : (
          <>
            {datas?.map((data) => (
              <div key={data.RCP_SEQ}>
                <Link to={`/${data.RCP_NM}`}>
                  <img src={data.ATT_FILE_NO_MK} alt="" />
                  <div>{data.RCP_NM}</div>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>

      <Recipe
        title="밥이 먹고싶을 떄"
        ImgWidth="100%"
        ImgHeight="50%"
        MinWidth="33%"
        name="밥"
      />
      <Recipe
        title="면이 먹고싶을 떄"
        ImgWidth="100%"
        ImgHeight="60%"
        MinWidth="50%"
        name="면"
      />
      <Recipe
        title="비 오는 날 추천메뉴"
        ImgWidth="100%"
        ImgHeight="40%"
        MinWidth="25%"
        name="전"
      />


    </HomeStyle>
  );
};

export default Home;
