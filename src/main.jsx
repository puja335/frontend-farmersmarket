import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import App from "./App.jsx"
import "./index.css"
import store from "./store/store.js"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position='bottom-right'
        autoClose={5000} // Close after 5 seconds
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName='bg-gray-800 text-white font-medium rounded shadow-md px-4 py-2'
        // bodyClassName="text-sm"
        progressClassName='bg-green-500'
      />
      <App />
    </Provider>
  </React.StrictMode>
)
