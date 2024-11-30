import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/authContex'

const NavBar = () => {
  const { userAuth } = useContext(AuthContext)
    
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
        </ul>
        <ul className="flex gap-6">
          {userAuth && (
            <li>
              <NavLink to="/perfil" className={({ isActive }) => 
                  `px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                }
                aria-current={isActive => isActive ? 'page' : undefined}
              >
                Perfil
              </NavLink>
            </li>
          )}
          <li>
            {userAuth ? (
              <span>Logout</span>
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