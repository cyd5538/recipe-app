import React from "react";
import styled from "styled-components";

const SearchStyled = styled.div`
  width: 100%;
  margin-top: 20px;
  .form_container {
    display: flex;
    justify-content: center;
    position: relative;
    margin : auto;
    width: 500px;
    input {
      width: 500px;
      height: 60px;
      background-color: #4c3f49;
      border: none;
      border-radius: 20px;
      color: white;
      font-size: 1.6rem;
      padding-left: 20px;
      ::placeholder {
        color: white;
      }
    }
    button{
      background-color: #6c3f49;
      border: none;
      color : white;
      padding-left: 5px;
      padding-right: 5px;
      position: absolute;
      height: 60px;
      right: 0;
      border-radius: 20px;
      cursor: pointer;
      font-size: 1.0rem;
    }
  }
  .icon {
    
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 2rem;
    div {
      cursor: pointer;
      width: 70px;
      height: 70px;
      background-color: #6c3f49;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      border-radius: 50%;
    }
  }
`;

const Search = ({ searchdata, setSearchdata, handleSubmit, searchTag }) => {
const Tag = ["닭고기", "돼지고기", "소고기", "생선"]

  return (
    <SearchStyled>
      <form onSubmit={handleSubmit}>
        <div className="form_container">
          <input
            type="type"
            placeholder="recipe..."
            name="searchdata"
            value={searchdata}
            onChange={(e) => setSearchdata(e.target.value)}
          />
          <button>Search</button>
        </div>
      </form>
      <div className="icon">
        <div onClick={() => searchTag(Tag[0])}>{Tag[0]}</div>
        <div onClick={() => searchTag(Tag[1])}>{Tag[1]}</div>
        <div onClick={() => searchTag(Tag[2])}>{Tag[2]}</div>
        <div onClick={() => searchTag(Tag[3])}>{Tag[3]}</div>
      </div>
    </SearchStyled>
  );
};

export default Search;
