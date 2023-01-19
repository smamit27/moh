import React, { Suspense } from 'react'
import { BrowserRouter , Route, Routes  } from 'react-router-dom'
import Home  from './views/Home'
import './App.scss'
import SignIn from './components/molecules/SignIn'

const App = () => {

  return (
    <Suspense fallback={<div>Loading....</div>}>
      <div className="app">
        <div className='bar'></div>
        <BrowserRouter>
          <Routes >
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<SignIn/>} />

          </Routes>
      </BrowserRouter>
      </div>
   </Suspense>
  )
}

export default App