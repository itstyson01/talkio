import { useEffect, useState } from "react"

function App() {
  const [message, setMessage] = useState("Connecting to Talkio backend...")

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/health")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message)
      })
      .catch(() => {
        setMessage("Could not connect to Talkio backend ❌")
      })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <h1 className="text-4xl font-bold text-white">
        {message}
      </h1>
    </div>
  )
}

export default App

