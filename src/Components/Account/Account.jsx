import {
  Favorite,
  History,
  LocationOn,
  Person,
  Settings,
  ShoppingBag,
} from "@mui/icons-material";
import { Container, Fade } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Account = () => {
  // Scrolling Bug Fixed
  window.scroll({ top: 0 });
  const user = useSelector((state) => state.auth.user);

  const accountSections = [
    {
      icon: <Person className='text-green-600 text-3xl' />,
      title: "Personal Information",
      description: "Manage your profile details and preferences",
      link: "/profile",
    },
    {
      icon: <ShoppingBag className='text-green-600 text-3xl' />,
      title: "My Orders",
      description: "Track and view your order history",
      link: "/dashboard/orders",
    },
    {
      icon: <Favorite className='text-green-600 text-3xl' />,
      title: "Saved Items",
      description: "View your wishlist and favorite products",
      link: "/dashboard/wishlist",
    },
    {
      icon: <LocationOn className='text-green-600 text-3xl' />,
      title: "Delivery Addresses",
      description: "Manage your delivery locations",
      link: "#addresses",
    },
    {
      icon: <History className='text-green-600 text-3xl' />,
      title: "Purchase History",
      description: "View detailed transaction history",
      link: "#history",
    },
    {
      icon: <Settings className='text-green-600 text-3xl' />,
      title: "Account Settings",
      description: "Manage notifications and security",
      link: "#settings",
    },
  ];

  return (
    <div className='min-h-screen pt-20 pb-10 bg-gray-50'>
      <Fade in={true}>
        <Container>
          {/* Header Section */}
          <div className='bg-white rounded-xl p-6 shadow-md mb-8'>
            <div className='flex items-center space-x-4'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
                <Person className='text-green-600 text-3xl' />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-gray-800'>
                  Welcome, {user.name}
                </h1>
                <p className='text-gray-600'>
                  Manage your account and preferences
                </p>
              </div>
            </div>
          </div>

          {/* Account Sections Grid */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {accountSections.map((section, index) => (
              <a
                href={section.link}
                key={index}
                className='bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300'
              >
                <div className='flex items-start space-x-4'>
                  <div className='p-3 bg-green-50 rounded-lg'>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800 mb-1'>
                      {section.title}
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      {section.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Recent Activity */}
          <div className='mt-8 bg-white rounded-xl p-6 shadow-md'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Recent Activity
            </h2>
            <div className='space-y-4'>
              <ActivityItem
                text='Order #12345 delivered successfully'
                time='2 hours ago'
              />
              <ActivityItem
                text='Added new delivery address'
                time='Yesterday'
              />
              <ActivityItem
                text='Updated payment information'
                time='3 days ago'
              />
            </div>
          </div>
        </Container>
      </Fade>
    </div>
  );
};

const ActivityItem = ({ text, time }) => (
  <div className='flex items-center justify-between py-2 border-b border-gray-100'>
    <span className='text-gray-700'>{text}</span>
    <span className='text-sm text-gray-500'>{time}</span>
  </div>
);

export default Account;
