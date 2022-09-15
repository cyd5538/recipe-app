import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Spinner from "../../style/Spinner";
import { useQuery } from "react-query";
import axios from "axios";

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

const Recipe = ({name, title, ImgWidth, ImgHeight, MinWidth }) => {
  const [dataget, setDataget] = useState(false);
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  
  const fetchCharacter = async ({ queryKey }) => {
    const response = await axios(
        `/${process.env.REACT_APP_SERVICE_KEY}/COOKRCP01/json/1/10/RCP_NM=${queryKey[1]}`
      );
      setDataget(true)
      return response.data.COOKRCP01.row
    };

    const { data, status } = useQuery(["characters", name], fetchCharacter, {
      keepPreviousData: true,
    });

    useEffect(() => {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }, [data]);


  return (
    <RecipeStyle>
      {dataget ? <h2>{title}</h2> : <Spinner /> }
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
          {data?.map((recipe) => {
            return (
              <motion.div
                className="item"
                style={{ minWidth: `${MinWidth}` }}
                key={recipe.RCP_SEQ}
              >
                <Link to={`/${recipe.RCP_NM}`}>
                  <img
                    src={recipe.ATT_FILE_NO_MAIN}
                    alt={recipe.RCP_NM}
                    style={{ width: `${ImgWidth}`, height: `${ImgHeight}` }}
                  />

                  <div className="center">{recipe.RCP_NM}</div>
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
