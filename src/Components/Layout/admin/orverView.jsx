import {
    MoreVert, PeopleAlt, TrendingUp, ShoppingCart,
    Inventory, AttachMoney, PersonAdd, LocalShipping
   } from "@mui/icons-material";
   import { Box, Card, Grid, IconButton, Menu, MenuItem } from "@mui/material";
   import { useState } from "react";
   import { useNavigate } from "react-router-dom";
   import { ResponsiveLine } from '@nivo/line';

   const revenueData = [
    {
      id: "revenue",
      color: "hsl(123, 70%, 50%)",
      data: [
        { x: "Jan", y: 13000 },
        { x: "Feb", y: 17000 },
        { x: "Mar", y: 15000 },
        { x: "Apr", y: 21000 },
        { x: "May", y: 19000 },
        { x: "Jun", y: 25000 },
        { x: "Jul", y: 28000 }
      ]
    }
   ];

   const activities = [
    {
      id: 1,
      title: "New user registered",
      time: "5 minutes ago",
      icon: <PersonAdd />,
      color: "blue"
    },
    {
      id: 2,
      title: "New order received",
      time: "1 hour ago",
      icon: <ShoppingCart />,
      color: "green"
    },
    {
      id: 3,
      title: "Order #123 shipped",
      time: "2 hours ago",
      icon: <LocalShipping />,
      color: "orange"
    }
   ];

   const recentOrders = [
    {
      id: "123",
      customer: "John Doe",
      amount: 1200,
      status: "Delivered"
    },
    {
      id: "124",
      customer: "Jane Smith",
      amount: 850,
      status: "Processing"
    }
   ];

   const topProducts = [
    {
      id: 1,
      name: "Product A",
      sales: 120,
      revenue: 12000
    },
    {
      id: 2,
      name: "Product B",
      sales: 85,
      revenue: 8500
    }
   ];

   const Overview = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [stats, setStats] = useState({
      users: 1250,
      orders: 450,
      products: 89,
      revenue: 125000,
      growth: 12
    });

    const navigate = useNavigate();

    const StatCard = ({ title, value, icon, color, percentage }) => (
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600 text-sm">{title}</p>
            <h3 className="text-2xl font-bold mt-2">
              {title === "Revenue" ? `₹${value.toLocaleString()}` : value}
            </h3>
            {percentage && (
              <p className={`text-${color}-500 text-sm flex items-center mt-2`}>
                <TrendingUp className="w-4 h-4 mr-1" />
                {percentage}% up from last month
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full bg-${color}-100 h-fit`}>{icon}</div>
        </div>
      </Card>
    );

    const RecentOrders = () => (
      <div className="space-y-4">
        {recentOrders.map(order => (
          <div key={order.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">Order #{order.id}</p>
              <p className="text-sm text-gray-500">{order.customer}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">₹{order.amount}</p>
              <p className="text-sm text-green-500">{order.status}</p>
            </div>
          </div>
        ))}
      </div>
    );

    const TopProducts = () => (
      <div className="space-y-4">
        {topProducts.map(product => (
          <div key={product.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">{product.sales} sales</p>
            </div>
            <p className="font-medium">₹{product.revenue}</p>
          </div>
        ))}
      </div>
    );

    // Rest of your component code...
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="py-6 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Existing JSX... */}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={3}>
                <StatCard
                  title="Total Users"
                  value={stats.users}
                  percentage={12}
                  icon={<PeopleAlt color="primary" />}
                  color="blue"
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <StatCard
                  title="Orders"
                  value={stats.orders}
                  percentage={8}
                  icon={<ShoppingCart color="success" />}
                  color="green"
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <StatCard
                  title="Products"
                  value={stats.products}
                  percentage={5}
                  icon={<Inventory color="warning" />}
                  color="orange"
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <StatCard
                  title="Revenue"
                  value={stats.revenue}
                  percentage={15}
                  icon={<AttachMoney color="error" />}
                  color="red"
                />
              </Grid>
            </Grid>

            {/* Chart and Activities section */}
            <Grid container spacing={3} className="mt-3">
              <Grid item xs={12} lg={8}>
                <Card className="p-6">
                  <div className="flex justify-between mb-6">
                    <h3 className="font-semibold">Revenue Overview</h3>
                    <select className="border rounded p-1">
                      <option>Last 7 days</option>
                      <option>Last month</option>
                      <option>Last year</option>
                    </select>
                  </div>
                  <Box sx={{ height: 400 }}>
                    <ResponsiveLine
                      data={revenueData}
                      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                      xScale={{ type: 'point' }}
                      yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                      axisTop={null}
                      axisRight={null}
                      axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                      }}
                      axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                      }}
                      pointSize={10}
                      pointColor={{ theme: 'background' }}
                      pointBorderWidth={2}
                      pointBorderColor={{ from: 'serieColor' }}
                      enableGridX={false}
                      curve="cardinal"
                      enableArea={true}
                      areaOpacity={0.15}
                    />
                  </Box>
                </Card>
              </Grid>

              {/* Rest of your Grid sections */}
            </Grid>
          </div>
        </div>
      </div>
    );
   };

   export default Overview;