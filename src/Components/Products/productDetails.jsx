import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import { addToCart } from "../../features/cart/cartSlice";
import useAppDispatch from "../../hooks/useDispatch";
import useAppSelector from "../../hooks/useAppSelector";

const ProductDetails = () => {
  const { slug } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/product/${slug}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await dispatch(addToCart({
        userId: user._id,
        productId: product._id,
        quantity,
        size: product.unit
      })).unwrap();
      
      toast.success('Added to cart successfully');
    } catch (error) {
      toast.error(error || 'Failed to add to cart');
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(prev => prev + 1);
    } else {
      toast.warning('Maximum available quantity reached');
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (isLoading || !product) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        Loading...
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Breadcrumb */}
        <nav className='flex items-center text-sm mb-8'>
          <a href='/' className='text-gray-500 hover:text-gray-900'>
            Home
          </a>
          <ChevronRight className='w-4 h-4 mx-2 text-gray-500' />
          <a href='/products' className='text-gray-500 hover:text-gray-900'>
            {product.category}
          </a>
          <ChevronRight className='w-4 h-4 mx-2 text-gray-500' />
          <span className='text-gray-900'>{product.name}</span>
        </nav>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Product Images */}
          <div className='space-y-4'>
            <div className='aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden'>
              <img
                src={product.images?.[currentImage] || product.img}
                alt={product.name}
                className='w-full h-full object-center object-cover'
              />
            </div>

            {product.images?.length > 0 && (
              <div className='flex space-x-4'>
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-20 h-20 rounded-md overflow-hidden ${
                      currentImage === idx ? "ring-2 ring-black" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt=''
                      className='w-full h-full object-cover'
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className='space-y-6'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold text-gray-900'>
                {product.name}
              </h1>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-5 h-5 ${
                        idx < Math.floor(product.reviews)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className='ml-2 text-sm text-gray-500'>
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className='flex items-center space-x-4'>
              <span className='text-3xl font-bold text-gray-900'>
                ₹{product.price}
              </span>
              {product.oldPrice && (
                <span className='text-xl text-gray-500 line-through'>
                  ₹{product.oldPrice}
                </span>
              )}
            </div>

            <div className='border-t border-b py-4'>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center border rounded-md'>
                  <button
                    onClick={decrementQuantity}
                    className='p-2 hover:bg-gray-100'
                  >
                    <Minus className='w-4 h-4' />
                  </button>
                  <span className='px-4'>{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className='p-2 hover:bg-gray-100'
                  >
                    <Plus className='w-4 h-4' />
                  </button>
                </div>
                <button
                onClick={handleAddToCart}
                className='flex-1 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors'>
                  <ShoppingCart className='w-5 h-5 inline-block mr-2' />
                  Add to Cart
                </button>
                <button className='p-3 border rounded-md hover:bg-gray-50'>
                  <Heart className='w-5 h-5' />
                </button>
              </div>
            </div>

            <div className='prose prose-sm'>
              <h3 className='text-lg font-medium'>Description</h3>
              <p>{product.description}</p>
            </div>

            {product.tags?.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className='px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-700'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
