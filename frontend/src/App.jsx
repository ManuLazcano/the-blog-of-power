import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'

import { PublicationDetail } from './components/PublicationDetail'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { CreateAccount } from './pages/CreateAccount'
import { EditPublication } from './pages/EditPublication'
import { CreatePublication } from './pages/CreatePublication'
import { Perfil } from './pages/Profile'
import { EditProfile } from './components/EditProfile'
import { Dashboard } from './pages/Dashboard'
import { clearExpiredItemsInLocalStorage } from './utils/localStorage'

function App() {

  useEffect(() => {
    const interval = setInterval(clearExpiredItemsInLocalStorage, 5 * 60 * 1000) // 5 minutos
    
    return () => clearInterval(interval) // Limpia el intervalo al desmontar
  }, [])
  
  return (
    <>
      <NavBar />
      <main className="p-4 flex justify-center">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/publication/:id' element={<PublicationDetail />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/createAccount' element={<CreateAccount />} />
          <Route path='/editPublication/:id' element={<EditPublication />} />
          <Route path='/createPublication' element={<CreatePublication />} />
          <Route path='/profile/:id' element={<Perfil />} />
          <Route path='/editProfile/:id' element={<EditProfile />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </main>
    </>
  )
}

export default App
