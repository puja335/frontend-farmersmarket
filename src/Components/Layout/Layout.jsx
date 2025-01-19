import { createContext, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import Breadcrumb from "../Braedcrumb/Breadcrumb"
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"

export const groceryContext = createContext()
const Layout = () => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const [cartItems, setCartItems] = useState([])
  return (
    <groceryContext.Provider
      value={{
        userLoggedInState: [isAuthenticated],
        cartItemsState: [cartItems, setCartItems],
      }}
    >
      <Navbar />
      {!isHomePage && <Breadcrumb />}
      <section className='min-h-screen'>
        <Outlet />
      </section>
      <Footer />
    </groceryContext.Provider>
  )
}

export default Layout
