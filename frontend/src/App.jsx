import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'

import { PublicationDetail } from './components/PublicationDetail'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'

function App() {
  
  return (
    <>
      <NavBar />
      <main className="p-4 flex justify-center">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/publication/:id' element={<PublicationDetail />} />
          <Route path='/login' element={<SignIn />} />
        </Routes>
      </main>
    </>
  )
}

export default App
