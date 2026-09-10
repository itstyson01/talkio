
import { useContext, useState } from "react"

import { AuthContext } from "../context/AuthContext"
import { updateProfile } from "../services/api"
import { getToken } from "../services/auth"


function Profile() {
  const { user, setUser } = useContext(AuthContext)

  const [isEditing, setIsEditing] = useState(false)

  const [username, setUsername] = useState(user.username)
  const [bio, setBio] = useState(user.bio || "")

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")


  console.log("Profile rendered")
  console.log("User:", user)


  const handleEdit = () => {
    console.log("EDIT BUTTON CLICKED")

    setUsername(user.username)
    setBio(user.bio || "")
    setError("")
    setIsEditing(true)
  }


  const handleCancel = () => {
    console.log("CANCEL BUTTON CLICKED")

    setUsername(user.username)
    setBio(user.bio || "")
    setError("")
    setIsEditing(false)
  }


  const handleSave = async () => {
    console.log("SAVE BUTTON CLICKED")

    setSaving(true)
    setError("")


    try {
      const token = getToken()

      console.log(
        "Token exists:",
        token ? "YES" : "NO"
      )


      if (!token) {
        throw new Error("No authentication token found")
      }


      const data = await updateProfile(
        token,
        username,
        bio
      )


      console.log("Update successful:", data)


      setUser({
        ...user,
        username: data.username,
        bio: data.bio,
      })


      setIsEditing(false)

    } catch (error) {

      console.error(
        "Profile update failed:",
        error
      )

      setError(error.message)

    } finally {

      setSaving(false)

    }
  }


  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p>Loading user...</p>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6">

        {/* Profile Picture */}

        <div className="flex justify-center">

          <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">

            <span className="text-3xl text-gray-400">
              👤
            </span>

          </div>

        </div>


        {isEditing ? (

          /* ==================== */
          /* EDIT PROFILE */
          /* ==================== */

          <div>

            <h1 className="text-2xl font-bold text-center mt-4">
              Edit Profile
            </h1>


            {/* Username */}

            <div className="mt-8">

              <label className="block text-sm text-gray-300 mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value)
                }}
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              />

            </div>


            {/* Bio */}

            <div className="mt-4">

              <label className="block text-sm text-gray-300 mb-2">
                Bio
              </label>

              <textarea
                value={bio}
                onChange={(event) => {
                  setBio(event.target.value)
                }}
                rows="4"
                placeholder="Tell people something about yourself..."
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500 resize-none"
              />

            </div>


            {/* Error */}

            {error && (
              <p className="text-red-400 text-sm mt-4">
                {error}
              </p>
            )}


            {/* Buttons */}

            <div className="flex gap-3 mt-6">

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold py-3 rounded-lg"
              >
                {saving ? "Saving..." : "Save"}
              </button>


              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="flex-1 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 text-white font-semibold py-3 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </div>

        ) : (

          /* ==================== */
          /* PROFILE VIEW */
          /* ==================== */

          <div>

            <h1 className="text-2xl font-bold text-center mt-4">
              {user.username}
            </h1>


            <p className="text-gray-400 text-center mt-1">
              {user.email}
            </p>


            <div className="mt-8">

              <h2 className="text-sm text-gray-400">
                About
              </h2>

              <p className="mt-2 text-gray-200">
                {user.bio || "No bio yet."}
              </p>

            </div>


            <button
              type="button"
              onClick={handleEdit}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg"
            >
              Edit Profile
            </button>

          </div>

        )}

      </div>

    </div>
  )
}


export default Profile
