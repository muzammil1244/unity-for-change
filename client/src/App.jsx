import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './user/Home'
import { Global_chat } from './user/global_chat'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Main } from './admin/main'

function App() {

  return (
   <div className='md:w-screen md:h-screen    md:px-3 py-3 overflow-hidden'>
  
  <BrowserRouter>
  <Routes>
    <Route path='/' element={ <Home />}/>
     <Route path='/chat_screen' element={  <Global_chat/>}/>
   <Route path='/admin_panel' element={<Main/>}/>
  </Routes>
  
  </BrowserRouter>
 
 
</div>


    
  )
}

export default App
