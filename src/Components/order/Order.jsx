import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import useAppSelector from "../../hooks/useAppSelector"
import apiClient from "../../utils/apiClient"

// Orders.jsx
const OrderCard = ({ order }) => (
  <div className='bg-white rounded-lg shadow p-6'>
    <div className='flex justify-between items-start mb-4'>
      <div>
        <h3 className='text-lg font-medium'>Order #{order._id.slice(-8)}</h3>
        <p className='text-sm text-gray-500'>
          Placed on {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>
      <span
        className={`px-3 py-1 rounded-full text-sm ${
          order.status === "delivered"
            ? "bg-green-100 text-green-800"
            : order.status === "processing"
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {order?.orderStatus?.charAt(0).toUpperCase() +
          order?.orderStatus?.slice(1)}
      </span>
    </div>

    <div className='space-y-4'>
      {order.items.map((item) => (
        <div key={item._id} className='flex items-center gap-4'>
          <img
            src={item.productId?.img}
            alt={item.productId?.name}
            className='w-16 h-16 object-cover rounded'
          />
          <div className='flex-1'>
            <h4 className='font-medium'>{item.productId?.name}</h4>
            <p className='text-sm text-gray-500'>
              Quantity: {item?.quantity} × Rs {item?.price}
            </p>
          </div>
          <p className='font-medium'>Rs {item?.price * item?.quantity}</p>
        </div>
      ))}
    </div>

    <div className='mt-4 pt-4 border-t'>
      <div className='flex justify-between'>
        <span className='font-medium'>Total</span>
        <span className='font-semibold'>Rs {order?.total}</span>
      </div>
    </div>
  </div>
)

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get(`/orders`)
        if (response.data.success) {
          setOrders(response.data.data)
        }
      } catch (error) {
        toast.error("Failed to fetch orders")
      } finally {
        setLoading(false)
      }
    }

    if (user?._id) {
      fetchOrders()
    }
  }, [user?._id])

  if (loading) {
    return (
      <div className='min-h-screen pt-20 pb-10 bg-gray-50'>
        <div className='max-w-6xl mx-auto p-6'>
          <h2 className='text-2xl font-bold mb-6'>My Orders</h2>
          <div className='space-y-4'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='bg-white rounded-lg shadow p-6 animate-pulse'
              >
                <div className='h-24 bg-gray-200 rounded'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen pt-20 pb-10 bg-gray-50'>
      <div className='max-w-6xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-6'>My Orders</h2>
        {orders.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500'>No orders found</p>
          </div>
        ) : (
          <div className='space-y-6'>
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
