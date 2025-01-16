import {
  Dashboard,
  Inventory,
  PeopleAlt,
  ShoppingCart,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { useState } from "react";
// import Orders from "./Orders";
import Overview from "./orverView";
// import Products from "./Products";
import AdminOrders from "./OrderManagement";
import ProductAdmin from "./ProductManagement";
import UsersList from "./UserList";

const AdminSidebar = ({ items, selected, onSelect }) => {
  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        height: "80vh",
        position: "fixed",
        bottom: 0,
        left: 0,
        pt: 8,
        zIndex: 1000,
        overflowY: "auto",
      }}
    >
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            p: 2,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 2,
            bgcolor: selected === item.id ? "action.selected" : "transparent",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
          onClick={() => onSelect(item.id)}
        >
          {item.icon}
          <span>{item.label}</span>
        </Box>
      ))}
    </Box>
  );
};

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: <Dashboard /> },
    { id: "users", label: "Users", icon: <PeopleAlt /> },
    { id: "orders", label: "Orders", icon: <ShoppingCart /> },
    { id: "products", label: "Products", icon: <Inventory /> },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "overview":
        return <Overview />;
      case "users":
        return <UsersList />;
      case "orders":
        return <AdminOrders />;
      case "products":
        return <ProductAdmin />;
      default:
        return <Overview />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar
        items={sidebarItems}
        selected={selectedTab}
        onSelect={setSelectedTab}
      />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          ml: "240px", // Add margin equal to sidebar width
          minHeight: "100vh",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
