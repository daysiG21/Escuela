import {useState, createContext} from 'react'

export const AuthFireContext = createContext();

const AuthContextProvider = (props) => {
  const [userId, setUserId] = useState(null) 

  const setAuthUserId = (id) => { 
    setUserId(id) 

  }

  return(
    <AuthFireContext.Provider value={{userId, setAuthUserId}}>
      {props.children}    
    </AuthFireContext.Provider>
  )
}

export default AuthContextProvider