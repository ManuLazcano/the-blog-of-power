import { createContext, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null)
  
  return (
    <AuthContext.Provider value={{
        setUserAuth,
        userAuth
    }} >
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthProvider,
  AuthContext
}