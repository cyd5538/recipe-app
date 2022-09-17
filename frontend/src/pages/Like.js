import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query"
import axios from 'axios';

const Like = () => {
  const { user } = useSelector((state) => state.auth);
 
  const fetchRecipeList = async ({ queryKey }) => {
    const response = await axios(
      `http://localhost:5000/api/favors/liked/${queryKey[1]}`
    );
    return response
  };

  const { data, status } = useQuery(["characters", user.email], fetchRecipeList, {
    keepPreviousData: true
  });

  console.log(data);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div>
      
    </div>
  )
}

export default Like