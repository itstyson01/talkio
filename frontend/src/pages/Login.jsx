import { useState } from "react"

import { loginUser } from "../services/api"
import { saveToken } from "../services/auth"


function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const data = await loginUser(email, password)

      saveToken(data.access_token)

      console.log("Login successful 🚀")
    } catch (error) {
      console.error("Login failed:", error.message)
    }
  }


  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <h1 className="text-4xl font-bold text-white text-center">
          Talkio
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Talk. Connect. Share.
        </p>


        <form
          onSubmit={handleLogin}
          className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >

          <h2 className="text-2xl font-semibold text-white">
            Welcome back
          </h2>

          <p className="text-gray-400 mt-1">
            Login to your Talkio account
          </p>


          <div className="mt-6">
            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>


          <div className="mt-4">
            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>


          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  )
}


export default Login