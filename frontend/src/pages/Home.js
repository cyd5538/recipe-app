import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Search from "../components/Home/Search";
import Recipe from "../components/Home/Recipe";

const HomeStyle = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: auto;
`;

const Home = () => {
  const [rcpname, setRcpname] = useState("");
  const [searchdata, setSearchdata] = useState('');
  const [datas, setDatas] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `/${process.env.REACT_APP_SERVICE_KEY}/COOKRCP01/json/1/10/RCP_NM=${searchdata}`
      );
      setDatas(response.data.COOKRCP01.row);
      console.log(datas);
    } catch (error) {
      console.log(Error)
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    getData()
  };


  useEffect(() => {
    getData();
  }, [handleSubmit])

  return (
    <HomeStyle>
      <Search
        searchdata={searchdata}
        setSearchdata={setSearchdata}
        handleSubmit={handleSubmit}
      />
      {datas?.map((data) => (
        <div>
          <div>{data.RCP_NM}</div>
        </div>
      ))}
      {/* <Recipe
        title="김치 요리?"
        rcpname="김치"
        ImgWidth="100%"
        ImgHeight="50%"
        MinWidth="33%"
      />
      <Recipe
        title="참치 요리?"
        rcpname="참치"
        ImgWidth="100%"
        ImgHeight="50%"
        MinWidth="50%"
      />
      <Recipe
        title="구이 요리?"
        rcpname="구이"
        ImgWidth="100%"
        ImgHeight="50%"
        MinWidth="25%"
      /> */}
    </HomeStyle>
  );
};

export default Home;
