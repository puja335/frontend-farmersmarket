// src/store/wishlistSlice.ts
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialState = {
  items: [],
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action) => {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)

      if (!existingItem) {
        state.items.push(newItem)
        toast.success("Item added to wishlist successfully!")
      } else {
        toast.info("Item is already in the wishlist.")
      }
    },
    removeItemFromWishlist: (state, action) => {
      const id = action.payload
      const existingItem = state.items.find((item) => item.id === id)

      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id)
        toast.success("Item removed from wishlist.")
      } else {
        toast.info("Item not found in the wishlist.")
      }
    },
    clearWishlist: (state) => {
      state.items = []
      toast.success("Wishlist cleared successfully.")
    },
  },
})

export const { addItemToWishlist, removeItemFromWishlist, clearWishlist } =
  wishlistSlice.actions
export default wishlistSlice.reducer
