import { useState } from "react";
import useAppSelector from "../../../hooks/useAppSelector";
import useAppDispatch from "../../../hooks/useDispatch";
import PopUpDialog from "../../PopUpDialog/PopUpDialog";
import { IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { DeleteIcon } from "lucide-react";
import { toast } from "react-toastify";
import { removeFromCart, updateItem } from "../../../features/cart/cartSlice";

const CartItems = () => {
  const { items, total } = useAppSelector((state) => state.cart);

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold text-gray-800'>Shopping Cart</h2>
      <div className='space-y-4'>
        {items.map((item) => (
          <CartItem key={item._id} cartItem={item} />
        ))}
      </div>
    </div>
  );
};

const CartItem = ({ cartItem }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [openDialog, setOpenDialog] = useState(false);

  const product = cartItem.productId;

  const handleQuantityChange = async (newQty) => {
    if (newQty < 1) return;
    try {
      await dispatch(
        updateItem({
          userId: user._id,
          productId: product._id,
          quantity: newQty,
        })
      ).unwrap();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async () => {
    try {
      await dispatch(
        removeFromCart({
          userId: user._id,
          productId: product._id,
        })
      ).unwrap();
      setOpenDialog(false);
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  return (
    <>
      <PopUpDialog
        open={openDialog}
        handleRemove={handleRemove}
        handleCancel={() => setOpenDialog(false)}
        message='Remove this item from cart?'
      />

      <div className='bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'>
        <div className='p-4 flex items-center gap-6'>
          <div className='relative w-24 h-24'>
            <img
              src={product.img}
              alt={product.name}
              className='w-full h-full object-contain rounded-lg'
            />
          </div>

          <div className='flex-1'>
            <div className='flex justify-between'>
              <div>
                <h3 className='text-lg font-medium text-gray-800'>
                  {product.name}
                </h3>
                <p className='text-sm text-gray-500 mt-0.5'>
                  Rs {product.price.toFixed(2)} / {product.unit}
                </p>
              </div>
              <div className='text-right'>
                <p className='text-lg font-semibold text-green-600'>
                  Rs {(product.price * cartItem.quantity).toFixed(2)}
                </p>
              </div>
            </div>

            <div className='flex items-center justify-between mt-4'>
              <div className='flex items-center gap-2 border border-gray-200 rounded-lg p-1'>
                <IconButton
                  size='small'
                  disabled={cartItem.quantity <= 1}
                  onClick={() => handleQuantityChange(cartItem.quantity - 1)}
                >
                  <Remove fontSize='small' />
                </IconButton>

                <span className='w-12 text-center font-medium'>
                  {cartItem.quantity} {product.unit}
                </span>

                <IconButton
                  size='small'
                  color='primary'
                  onClick={() => handleQuantityChange(cartItem.quantity + 1)}
                >
                  <Add fontSize='small' />
                </IconButton>
              </div>

              <IconButton
                onClick={() => setOpenDialog(true)}
                className='text-red-500 hover:text-red-600 hover:bg-red-50'
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;
