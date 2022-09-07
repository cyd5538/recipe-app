import React from "react";
import styled from "styled-components";

const SearchStyled = styled.div`
  width: 100%;
  margin-top: 20px;
  div {
    display: flex;
    justify-content: center;
    input {
      width: 500px;
      height: 50px;
      background-color: #4c3f49;
      border: none;
      border-radius: 20px;
      color: white;
      font-size: 1.4rem;
      padding-left: 10px;
      ::placeholder {
        color: white;
      }
    }
  }
  .icon {
    margin-top: 20px;
    display: flex;
    gap: 2rem;
    div {
      width: 70px;
      height: 70px;
      background-color: #4c3f49;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      border-radius: 50%;
    }
  }
`;

const Search = ({ searchdata, setSearchdata, handleSubmit }) => {


  return (
    <SearchStyled>
      <form onSubmit={handleSubmit}>
        <div>
        <input
          type="type"
          placeholder="recipe..."
          name="searchdata"
          value={searchdata}
          onChange={(e) => setSearchdata(e.target.value)}
        />
        <button>클릭</button>
        </div>
      </form>
      <div className="icon">
        <div>닭</div>
        <div>돼지</div>
        <div>소</div>
        <div>생선</div>
      </div>
    </SearchStyled>
  );
};

export default Search;
