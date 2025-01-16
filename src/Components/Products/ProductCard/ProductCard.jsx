import { Card, CardActions, CardContent, Skeleton } from "@mui/material";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../../features/cart/cartSlice";
import { addItemToWishlist } from "../../../features/wishlist/wishlistSlice";

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const wishlist = useSelector((state) => state.wishlist.items);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.info("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (!product.inStock) {
      toast.warning("Product is out of stock");
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        addToCart({
          userId: user._id,
          productId: product._id,
          quantity: 1,
          size: product.unit,
        })
      ).unwrap();

      toast.success("Added to cart successfully");
    } catch (error) {
      toast.error(error || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };
  const isInWishlist = wishlist.some((item) => item._id === product._id);

  const handleWishlist = () => {
    if (!user) {
      toast.info("Please login to use wishlist");
      navigate("/login");
      return;
    }

    if (isInWishlist) {
      dispatch(removeItemFromWishlist(product._id));
    } else {
      dispatch(addItemToWishlist(product));
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all relative'>
      <Link to={`/product/${product.slug}`} className='block'>
        <div className='aspect-w-1 aspect-h-1 w-full'>
          <img
            src={product.img}
            alt={product.name}
            className='w-full h-48 object-cover object-center'
          />
        </div>
      </Link>

      <div className='p-4'>
        <Link to={`/product/${product.slug}`}>
          <h3 className='text-lg font-medium text-gray-900 truncate'>
            {product.name}
          </h3>
        </Link>

        <div className='mt-2 flex items-center justify-between'>
          <div>
            <p className='text-gray-500'>₹{product.price}</p>
            <p className='text-sm text-gray-500'>
              {product.quantity} {product.unit}
            </p>
          </div>

          <div className='flex items-center'>
            <Star className='w-4 h-4 text-yellow-400 fill-current' />
            <span className='ml-1 text-sm text-gray-600'>
              {product.reviews}
            </span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={loading || !product.inStock}
          className={`mt-4 w-full flex items-center justify-center px-4 py-2 rounded-md ${
            loading || !product.inStock
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          } transition-colors`}
        >
          <ShoppingCart className='w-5 h-5 mr-2' />
          {loading
            ? "Adding..."
            : product.inStock
            ? "Add to Cart"
            : "Out of Stock"}
        </button>
      </div>
      <div className='absolute top-2 right-2'>
        <button
          onClick={handleWishlist}
          className='p-2 rounded-full bg-white/80 hover:bg-white'
        >
          <Heart
            className={`w-5 h-5 ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

// ProductCard Skeleton
export const ProductCardSkeleton = () => (
  <div>
    <Card
      sx={{
        maxWidth: 308,
        mx: "auto",
        boxShadow:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        backgroundColor: "white",
      }}
    >
      {/* Product_img */}
      <Skeleton variant='rectangular' height={170} width={"100%"} />

      <div className='px-1.5 pb-2'>
        <CardContent className='space-y-2' sx={{ pb: 1 }}>
          {/* title */}
          <Skeleton
            sx={{ mx: "auto" }}
            variant='text'
            height={"3rem"}
            width={"55%"}
          />

          <div className='md:space-y-1.5 space-y-2 lg:space-y-2'>
            <div className='flex justify-center space-x-5'>
              {/* Amount */}
              <Skeleton variant='text' height={"1.3rem"} width={"30%"} />

              {/* Price */}
              <Skeleton variant='text' height={"1.3rem"} width={"25%"} />
            </div>

            <div className='flex justify-center'>
              {/* Ratings */}
              <Skeleton variant='text' height={"1.6rem"} width={"80%"} />
            </div>
          </div>
        </CardContent>

        {/* Add To Cart Btn */}
        <CardActions sx={{ pt: 0 }}>
          <Skeleton variant='rounded' height={"1.9rem"} width={"100%"} />
        </CardActions>
      </div>
    </Card>
  </div>
);
export default ProductCard;
