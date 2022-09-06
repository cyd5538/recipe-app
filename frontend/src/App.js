import React from 'react'
import GlobalStyle from './style/GlobalStyle'
import {Route, Routes} from 'react-router-dom'
import RecipeDetail from './pages/RecipeDetail'
import Join from './pages/Join'
import Login from './pages/Login'
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
        <Route path="/sign" element={<Join />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App