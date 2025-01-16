import { Heart } from "lucide-react";
import { clearWishlist, removeItemFromWishlist } from "../../features/wishlist/wishlistSlice";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useDispatch";
import ProductCard from "../Products/ProductCard/ProductCard";

const Wishlist = () => {
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const dispatch = useAppDispatch();

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Saved Items</h2>
        <button
          onClick={() => dispatch(clearWishlist())}
          className='text-red-600 hover:text-red-700'
        >
          Clear All
        </button>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {wishlist.map((item) => (
          <div key={item._id} className='relative'>
            <ProductCard product={item} />
            <button
              onClick={() => dispatch(removeItemFromWishlist(item._id))}
              className='absolute top-2 right-2 p-2 bg-red-50 rounded-full'
            >
              <Heart className='w-5 h-5 fill-red-500 text-red-500' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;