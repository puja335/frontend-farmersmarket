import { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import apiClient from "../../utils/apiClient"

const PersonalInfo = () => {
  const user = useSelector((state) => state.auth.user)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // If changing password, validate
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error("Passwords don't match!")
          return
        }
        if (!formData.currentPassword) {
          toast.error("Current password required!")
          return
        }
      }

      const response = await apiClient.put("/user/profile", formData)

      if (response.data.success) {
        toast.success("Profile updated successfully!")
        // Update redux state with new user data if needed
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen pt-20 pb-10 bg-gray-50'>
      <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow'>
        <h2 className='text-2xl font-bold mb-6'>Personal Information</h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Name Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Full Name
              </label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md'
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md'
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Phone
              </label>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md'
              />
            </div>

            {/* Address Field */}
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Address
              </label>
              <textarea
                name='address'
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md'
              />
            </div>

            {/* Change Password Section */}
            <div className='md:col-span-2 pt-4 border-t'>
              <h3 className='text-lg font-medium mb-4'>Change Password</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Current Password
                  </label>
                  <input
                    type='password'
                    name='currentPassword'
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    New Password
                  </label>
                  <input
                    type='password'
                    name='newPassword'
                    value={formData.newPassword}
                    onChange={handleChange}
                    className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Confirm New Password
                  </label>
                  <input
                    type='password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-end'>
            <button
              type='submit'
              disabled={loading}
              className='bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400'
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PersonalInfo
