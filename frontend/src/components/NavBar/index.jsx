import { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../context/authContex'
import { logout } from '../../api/userApi'

const NavBar = () => {
  const { userAuth, setUserAuth} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setUserAuth(user)
    }
  }, [setUserAuth])

  const handleLogout = async () => {
    try {
      const response = await logout()
      if(!response) {
        throw new Error('Error al cerrar sesión');
      }      

      setUserAuth(null)
      localStorage.removeItem('user')
      navigate('/')
    } catch (error) {
      console.error(error.message)
    }
  }
    
  return (
    <header className="bg-gray-800 text-white p-5 mb-7">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <ul className="flex gap-6">
          <li>
            <NavLink to="/" className={({ isActive }) => 
                `px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
              aria-current={isActive => isActive ? 'page' : undefined}
            >
              Home
            </NavLink>
          </li>
          {userAuth && userAuth.isAdmin &&
            <li>
              <NavLink to={'/dashboard'} className={({ isActive }) => 
                `px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                }
                aria-current={isActive => isActive ? 'page' : undefined}
              >
                Dashboard
              </NavLink>
            </li>
          }
        </ul>
        <ul className="flex gap-6">
          {userAuth && (
            <>
            <li>
              <NavLink to={'/createPublication'} className={({ isActive }) => 
                  `px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                }
                aria-current={isActive => isActive ? 'page' : undefined}
              >
                Crear publicación
              </NavLink>
            </li>
            <li>
              <NavLink to={`/profile/${userAuth.userId}`} className={({ isActive }) => 
                  `px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                }
                aria-current={isActive => isActive ? 'page' : undefined}
              >
                Perfil
              </NavLink>
            </li>
            </>
          )}
          <li>
            {userAuth ? (
              <button onClick={handleLogout}>Logout</button>
            ):
            (
              <NavLink to="/login" className={({ isActive }) => 
                `px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
              aria-current={isActive => isActive ? 'page' : undefined}
              >
                Login
              </NavLink>
            )
            }            
          </li>
        </ul>
      </nav>
    </header>
  )
}

export { NavBar }