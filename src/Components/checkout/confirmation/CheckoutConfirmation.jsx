import { AlertCircle, CheckCircle, Clock, Package } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import apiClient from "../../../utils/apiClient"

const OrderStatus = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(status)}`}
    >
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  )
}

const OrderTracker = ({ currentStatus }) => {
  const steps = [
    { id: "pending", label: "Order Placed" },
    { id: "processing", label: "Processing" },
    { id: "shipped", label: "Shipped" },
    { id: "delivered", label: "Delivered" },
  ]

  const getStepStatus = (stepId) => {
    const statusOrder = ["pending", "processing", "shipped", "delivered"]
    const currentIndex = statusOrder.indexOf(currentStatus)
    const stepIndex = statusOrder.indexOf(stepId)

    if (stepIndex < currentIndex) return "complete"
    if (stepIndex === currentIndex) return "current"
    return "upcoming"
  }

  return (
    <div className='py-6'>
      <div className='flex items-center justify-between'>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className='flex flex-col items-center'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${
                  getStepStatus(step.id) === "complete"
                    ? "bg-green-500"
                    : getStepStatus(step.id) === "current"
                    ? "bg-blue-500"
                    : "bg-gray-200"
                }`}
              >
                {getStepStatus(step.id) === "complete" ? (
                  <CheckCircle className='w-5 h-5 text-white' />
                ) : getStepStatus(step.id) === "current" ? (
                  <Clock className='w-5 h-5 text-white' />
                ) : (
                  <Package className='w-5 h-5 text-gray-400' />
                )}
              </div>
              <span className='mt-2 text-sm text-gray-600'>{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  getStepStatus(steps[index + 1].id) === "complete"
                    ? "bg-green-500"
                    : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const OrderDetails = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await apiClient.get(`/orders/${id}`)
        setOrder(response.data.data)
      } catch (error) {
        toast.error("Failed to fetch order details")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  console.log(order)

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900' />
      </div>
    )
  }

  if (!order) {
    return (
      <div className='text-center py-16'>
        <AlertCircle className='w-16 h-16 text-red-500 mx-auto mb-4' />
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          Order Not Found
        </h2>
        <p className='text-gray-600'>Unable to find order details</p>
      </div>
    )
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='bg-white rounded-lg shadow-sm p-6 space-y-6'>
        {/* Order Header */}
        <div className='flex justify-between items-center pb-4 border-b'>
          <div>
            <h1 className='text-2xl font-semibold text-gray-900'>
              Order #{order._id.slice(-8)}
            </h1>
            <p className='text-sm text-gray-500'>
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <OrderStatus status={order.orderStatus} />
        </div>

        {/* Order Progress */}
        <OrderTracker currentStatus={order.orderStatus} />

        {/* Order Items */}
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-gray-900'>Order Items</h2>
          <div className='space-y-4'>
            {order.items.map((item) => (
              <div
                key={item._id}
                className='flex items-center justify-between p-4 border rounded-lg'
              >
                <div className='flex items-center space-x-4'>
                  <img
                    src={item.productId.img}
                    alt={item.productId.name}
                    className='w-16 h-16 object-cover rounded'
                  />
                  <div>
                    <h3 className='font-medium'>{item.productId.name}</h3>
                    <p className='text-sm text-gray-500'>
                      Quantity: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>
                <p className='font-semibold'>₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className='bg-gray-50 p-4 rounded-lg'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>
            Order Summary
          </h2>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span>₹{order.total}</span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className='flex justify-between font-semibold pt-2 border-t'>
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Shipping Details */}
        <div>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>
            Shipping Details
          </h2>
          <div className='bg-gray-50 p-4 rounded-lg'>
            <p className='font-medium'>{order.shippingDetails.fullName}</p>
            <p>{order.shippingDetails.address}</p>
            <p>{order.shippingDetails.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
