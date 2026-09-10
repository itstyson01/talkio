
const API_BASE_URL = "http://127.0.0.1:8000"


export async function checkHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`)

  if (!response.ok) {
    throw new Error("Backend request failed")
  }

  return response.json()
}


export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Login failed")
  }

  return data
}


export async function getCurrentUser(token) {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to get current user")
  }

  return data
}


export async function updateProfile(token, username, bio) {
  console.log("updateProfile() called")

  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      username,
      bio,
    }),
  })

  const data = await response.json()

  console.log("Profile API response:", data)

  if (!response.ok) {
    throw new Error(data.detail || "Failed to update profile")
  }

  return data
}
