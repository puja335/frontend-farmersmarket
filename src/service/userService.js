import axios from "axios"

export const registerUser = async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/auth/register",
    formData
  )
  return response.data
}

export const loginUser = async (data) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/auth/login",
    data
  )
  return response.data
}
