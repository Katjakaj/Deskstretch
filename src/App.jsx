import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import DummyPage from './pages/DummyPage'

const App = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/dummy" element={<DummyPage />}></Route>
    </Routes>
    <Footer />
  </>
  )
}

export default App