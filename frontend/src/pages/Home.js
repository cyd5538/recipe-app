import React, {useState} from 'react';
import styled from 'styled-components';
import Search from '../components/Home/Search';
import Recipe from '../components/Home/Recipe';


const HomeStyle = styled.div`
  max-width: 1000px;
  width: 100%;
  margin : auto;
`


const Home = () => {
  const [rcpname, setRcpname] = useState('');

  return (
    <HomeStyle>
      <Search />
      <Recipe title="비 오는 날 먹기 좋은 음식" rcpname="전"/>

      {/* <Recipe title="면치기 하고 싶을 떄 ?" rcpname="면"/>
      <Recipe title="아플 때" rcpname="죽"/> */}
    </HomeStyle>
  )
}

export default Home