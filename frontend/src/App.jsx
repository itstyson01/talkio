import { useContext } from "react"

import Login from "./pages/login"
import { AuthProvider, AuthContext } from "./context/AuthContext"


function AppContent() {
  const { user, loading, logout } = useContext(AuthContext)


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


  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">

        <h1 className="text-3xl font-bold">
          Welcome to Talkio 👋
        </h1>

        <p className="mt-4 text-gray-400">
          Username: {user.username}
        </p>

        <p className="text-gray-400">
          Email: {user.email}
        </p>

        <button
          onClick={logout}
          className="mt-6 bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>
    </div>
  )
}


function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}


export default App