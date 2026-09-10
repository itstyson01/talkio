
import { createContext, useEffect, useState } from "react"

import { getCurrentUser } from "../services/api"
import { getToken, removeToken } from "../services/auth"


export const AuthContext = createContext()


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const token = getToken()

    console.log("AuthContext token:", token ? "Token exists" : "No token")


    if (!token) {
      setLoading(false)
      return
    }


    getCurrentUser(token)
      .then((userData) => {
        console.log("Current user:", userData)

        setUser(userData)
      })
      .catch((error) => {
        console.error("Authentication failed:", error)

        removeToken()
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])


  const logout = () => {
    removeToken()
    setUser(null)
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
