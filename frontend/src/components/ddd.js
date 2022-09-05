import React, {useEffect, useState} from 'react';
import axios from 'axios';


function App() {
  const SERVICE_KEY = 'b13dc1aff20d44c1abed'
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get(`http://openapi.foodsafetykorea.go.kr/api/${SERVICE_KEY}/COOKRCP01/json/1/10`)
    setData(response.data.COOKRCP01.row);
    console.log(data);
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <div>
      {data?.map((datas) => (
        <div key={datas.RCP_SEQ}>
          <div>{datas.RCP_NM}</div>
          <div>{datas.RCP_SEQ}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
