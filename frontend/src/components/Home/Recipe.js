import React, {useState,useEffect, useRef} from 'react'
import axios from 'axios'
import { motion } from "framer-motion";
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const RecipeStyle = styled.div`
margin-top: 50px;
h2{
    margin-bottom: 30px;
}

.item{
    min-height: 40rem;
    min-width: 33%;
    padding: 10px;
}

.item img{
    width: 100%;
    height: 50%;
    border-radius: 2rem;
    pointer-events: none;
    position: relative;
    z-index: 999;
}


.inner-carousel{
    display: flex;
}

.carousel{
    cursor: grab;
    overflow: hidden;
    background-color: #fff;
    height: 350px;
    border-radius: 2rem;
}

.center{
  margin-top: 5px;
  text-align: center;
}

`

const Recipe = ({rcpname, title}) => {
    const [datas, setDatas] = useState([]);
    const [width, setWidth] = useState(0);
    const  carousel = useRef();
    
    // cosr 막히면 https://cors-anywhere.herokuapp.com/ 추가
    const getData = async () => {
        const response = await axios.get(`http://openapi.foodsafetykorea.go.kr/api/${process.env.REACT_APP_SERVICE_KEY}/COOKRCP01/json/1/10/RCP_NM=${rcpname}`)
        setDatas(response.data.COOKRCP01.row);
        console.log(datas);
    }
    useEffect(() => {
        getData()
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      },[])
      
  return (
    <RecipeStyle>
      <h2>{title}</h2>
      <motion.div ref={carousel} className="carousel" whileTap={{cursor :"grabbing"}}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="inner-carousel"
        >
          {datas?.map((data) => {
            return (
              <motion.div className="item" key={data.RCP_SEQ}>
                   <img src={data.ATT_FILE_NO_MAIN} alt={data.RCP_NM} />
                    <Link to={`/${data.RCP_SEQ}`}>
                      <div className='center'>{data.RCP_NM}</div>
                    </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </RecipeStyle>
  )
}

export default Recipe