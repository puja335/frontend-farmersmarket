import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./Components/About/About";
import Account from "./Components/Account/Account";
import AllCategories from "./Components/AllCategories/AllCategories";
import ForgotPassword from "./Components/Authantication/forgotpassword/ForgotPassword";
import Login from "./Components/Authantication/Login/Login";
import Register from "./Components/Authantication/register/Register";
import Cart from "./Components/Cart/Cart";
import OrderDetails from "./Components/checkout/confirmation/CheckoutConfirmation";
import Home from "./Components/Home/Home";
import OurServices from "./Components/Home/OurServices/OurServices";
import ProductAdmin from "./Components/Layout/admin/ProductManagement";
import Layout from "./Components/Layout/Layout";
import Orders from "./Components/order/Order";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import PaymentStatus from "./Components/payment/esewa/EsewaSuccess";
import PersonalInfo from "./Components/personalInfo/Profile";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import ProductDetails from "./Components/Products/productDetails";
import Products from "./Components/Products/Products";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Security from "./Components/Security/Security";
import SupportCenter from "./Components/SupportCenter/SupportCenter";
import TermsAndConditions from "./Components/TermsAndConditions/TermsAndConditions";
import Testimonials from "./Components/Testimonials/Testimonials";
import WhyUs from "./Components/WhyUs/WhyUs";
import Wishlist from "./Components/wishlist/Wishlist";
import AdminOrders from "./Components/Layout/admin/OrderManagement";
import AdminDashboard from "./Components/Layout/admin/Admin";
import UsersList from "./Components/Layout/admin/UserList";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/ourservices' element={<OurServices />} />
          <Route path='/products' element={<Products />} />
          {/* product details */}
          <Route path='/product/:slug' element={<ProductDetails />} />
          <Route path='/categories' element={<AllCategories />} />
          <Route path='/about' element={<About />} />
          <Route path='/whyus' element={<WhyUs />} />
          <Route path='/security' element={<Security />} />
          <Route path='/testimonials' element={<Testimonials />} />
          <Route path='/supportcenter' element={<SupportCenter />} />
          <Route path='/privacypolicy' element={<PrivacyPolicy />} />
          <Route path='/termsandconditions' element={<TermsAndConditions />} />
          <Route path='/dashboard/wishlist' element={<Wishlist />} />
          <Route
            path='/categories/:categoryName'
            element={<Products categoryProducts={true} />}
          />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/register' element={<Register />} />
          {/* Protected Route */}
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Account />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/admin/products' element={<ProductAdmin />} />
            <Route path='/admin/users' element={<UsersList />} />
            <Route path='/admin/orders' element={<AdminOrders />} />
            <Route path='/profile' element={<PersonalInfo />} />
            <Route path='/dashboard/orders' element={<Orders />} />
            <Route
              path='/checkout/payment/esewa/success'
              element={<PaymentStatus />}
            />
            <Route
              path='/checkout/confirmation/:id'
              element={<OrderDetails />}
            />
          </Route>
          <Route path='/*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
