import { useContext } from "react"

import Profile from "./pages/profile"
import Login from "./pages/Login"
import { AuthProvider, AuthContext } from "./context/AuthContext"


function AppContent() {
  const { user, loading } = useContext(AuthContext)


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-400">
          Loading...
        </p>
      </div>
    )
  }


  if (!user) {
    return <Login />
  }


  return <Profile />
}


function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}


export default App