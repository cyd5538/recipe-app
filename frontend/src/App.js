import React from 'react'
import GlobalStyle from './style/GlobalStyle'
import {Route, Routes} from 'react-router-dom'
import RecipeDetail from './pages/RecipeDetail'
import Home from './pages/Home'
import Nav from './components/Nav'


const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<RecipeDetail />} />
      </Routes>
    </div>
  )
}

export default App