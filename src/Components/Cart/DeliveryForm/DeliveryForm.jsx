import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../../../features/cart/cartSlice";

import apiClient from "../../../utils/apiClient";

const DeliveryForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const { items, total } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePayment = async (orderData) => {
    try {
      // First create order
      const orderResponse = await apiClient.post("/orders", {
        ...orderData,
        items,
        total,
        paymentMethod,
      });

      if (paymentMethod === "ESEWA") {
        // Initialize Esewa payment
        const paymentResponse = await apiClient.post("/payment/initiate", {
          orderId: orderResponse.data.data._id,
          amount: total,
          paymentMethod: "esewa",
        });
        console.log("paymentResponse.data", paymentResponse.data);
        const { paymentUrl } = paymentResponse.data.data;

        // Create a form and submit it programmatically
        const form = document.createElement("form");
        form.method = "POST";
        form.action = paymentUrl;

        const paymentFormData = {
          ...paymentResponse.data.data.formData,
          product_service_charge: 0,
          product_delivery_charge: 0,
        };
        for (const [key, value] of Object.entries(paymentFormData)) {
          const input = document.createElement("input");
          input.type = "hidden";

          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();

        // Redirect to Esewa
      } else {
        // For COD, just confirm order
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        navigate(
          `/checkout/confirmation/${orderResponse.data.data._id}`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  const onSubmit = (formData) => {
    const orderData = {
      shippingDetails: {
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
      }
    };
    handlePayment(orderData);
  };

  return (
    <div className='min-h-screen pt-20 pb-10 bg-gray-50'>
      <div className='max-w-3xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-8'>Checkout</h1>

        <div className='bg-white rounded-lg shadow p-6 mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
          {items.map((item) => (
            <div key={item._id} className='flex justify-between py-2'>
              <span>
                {item.quantity}x {item.productId.name}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className='border-t mt-4 pt-4'>
            <div className='flex justify-between font-semibold'>
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white rounded-lg shadow p-6'
        >
          <h2 className='text-xl font-semibold mb-4'>Shipping Details</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            <div>
              <label className='block text-sm font-medium mb-2'>
                Full Name
              </label>
              <input
                {...register("fullName", { required: "Full name is required" })}
                className='w-full p-2 border rounded'
              />
              {errors.fullName && (
                <p className='text-red-500 text-sm'>
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>Email</label>
              <input
                type='email'
                {...register("email", { required: "Email is required" })}
                className='w-full p-2 border rounded'
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>Phone</label>
              <input
                type='tel'
                {...register("phone", { required: "Phone is required" })}
                className='w-full p-2 border rounded'
              />
              {errors.phone && (
                <p className='text-red-500 text-sm'>{errors.phone.message}</p>
              )}
            </div>

            <div className='md:col-span-2'>
              <label className='block text-sm font-medium mb-2'>Address</label>
              <textarea
                {...register("address", { required: "Address is required" })}
                rows={3}
                className='w-full p-2 border rounded'
              />
              {errors.address && (
                <p className='text-red-500 text-sm'>{errors.address.message}</p>
              )}
            </div>
          </div>

          <div className='mb-6'>
            <h3 className='text-lg font-semibold mb-3'>Payment Method</h3>
            <div className='space-y-2'>
              <label className='flex items-center space-x-3'>
                <input
                  type='radio'
                  value='COD'
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='form-radio'
                />
                <span>Cash on Delivery</span>
              </label>

              <label className='flex items-center space-x-3'>
                <input
                  type='radio'
                  value='ESEWA'
                  checked={paymentMethod === "ESEWA"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='form-radio'
                />
                <span>Pay with Esewa</span>
              </label>
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400'
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryForm;
