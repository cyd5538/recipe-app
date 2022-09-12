import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Spinner from "../../style/Spinner";

const RecipeStyle = styled.div`
  margin-top: 50px;
  h2 {
    margin-bottom: 30px;
  }

  .item {
    min-height: 40rem;
    min-width: 33%;
    padding: 10px;
    position: relative;
  }

  .item img {
    border-radius: 2rem;
    pointer-events: none;
    position: relative;
  }

  .inner-carousel {
    display: flex;
  }

  .carousel {
    cursor: grab;
    overflow: hidden;
    background-color: #fff;
    height: 430px;
    border-radius: 2rem;
  }

  .center {
    margin-top: 5px;
    text-align: center;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.3s ease-in;
  }
  .center:hover{
    transform: scale(1.2);
    color: blue;
  }
`;

const Recipe = ({API, title, ImgWidth, ImgHeight, MinWidth }) => {
  const [datas, setDatas] = useState([]);
  const [dataget, setDataget] = useState(false);
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  
  // cosr 막히면 https://cors-anywhere.herokuapp.com/ 추가
  const getData = async () => {
    try {
      const response = await axios.get(API);
      setDatas(response.data.COOKRCP01.row);
      setDataget(true);
      console.log(datas)

    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [datas]);

  return (
    <RecipeStyle>
      {dataget ? <h2>{title}</h2> : <Spinner />}
      <motion.div
        ref={carousel}
        className="carousel"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="inner-carousel"
        >
          {datas?.map((data) => {
            return (
              <motion.div
                className="item"
                style={{ minWidth: `${MinWidth}` }}
                key={data.RCP_SEQ}
              >
                <Link to={`/${data.RCP_NM}`}>
                  <img
                    src={data.ATT_FILE_NO_MAIN}
                    alt={data.RCP_NM}
                    style={{ width: `${ImgWidth}`, height: `${ImgHeight}` }}
                  />

                  <div className="center">{data.RCP_NM}</div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </RecipeStyle>
  );
};

export default Recipe;
