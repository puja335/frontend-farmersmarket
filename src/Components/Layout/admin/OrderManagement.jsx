import { Box, MenuItem, Select, Tab, Tabs, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../../utils/apiClient";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get("/orders");
      setOrders(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await apiClient.patch(`/admin/orders/${orderId}`, { status });
      fetchOrders();
      toast.success("Order status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;
    const matchesSearch =
      order._id.includes(searchTerm) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const todayOrders = filteredOrders.filter(
    (order) =>
      new Date(order.createdAt).toDateString() === new Date().toDateString()
  );

  if (loading) {
    return <div className='min-h-screen pt-20 center'>Loading...</div>;
  }

  return (
    <div className='min-h-screen pt-20 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Orders Management</h1>
          <div className='flex gap-4'>
            <TextField
              size='small'
              placeholder='Search orders...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select
              size='small'
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value='all'>All Orders</MenuItem>
              <MenuItem value='pending'>Pending</MenuItem>
              <MenuItem value='processing'>Processing</MenuItem>
              <MenuItem value='delivered'>Delivered</MenuItem>
            </Select>
          </div>
        </div>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
            <Tab label='All Orders' />
            <Tab label={`Today's Orders (${todayOrders.length})`} />
          </Tabs>
        </Box>

        <div className='grid gap-6'>
          {(tabValue === 0 ? filteredOrders : todayOrders).map((order) => (
            <div key={order._id} className='bg-white rounded-lg shadow-md p-6'>
              <div className='flex justify-between mb-4'>
                <div>
                  <h3 className='text-lg font-semibold'>
                    Order #{order._id.slice(-8)}
                  </h3>
                  <p className='text-sm text-gray-500'>
                    Customer: {order.user?.name} ({order.user?.email})
                  </p>
                  <p className='text-sm text-gray-500'>
                    Date: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <Select
                  size='small'
                  value={order.orderStatus}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  className='min-w-[150px]'
                >
                  <MenuItem value='pending'>Pending</MenuItem>
                  <MenuItem value='processing'>Processing</MenuItem>
                  <MenuItem value='delivered'>Delivered</MenuItem>
                </Select>
              </div>

              <div className='space-y-4'>
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className='flex items-center gap-4 p-3 bg-gray-50 rounded'
                  >
                    <img
                      src={item.productId?.img}
                      alt={item.productId?.name}
                      className='w-16 h-16 object-cover rounded'
                    />
                    <div className='flex-1'>
                      <p className='font-medium'>{item.productId?.name}</p>
                      <p className='text-sm text-gray-600'>
                        {item.quantity} x ₹{item.price} = ₹
                        {item.quantity * item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-4 pt-4 border-t flex justify-between items-center'>
                <div>
                  <p className='text-sm text-gray-600'>
                    Payment Method: {order.paymentMethod}
                  </p>
                  <p className='text-sm text-gray-600'>
                    Payment Status: {order.paymentStatus}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-lg font-semibold'>Total: ₹{order.total}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
