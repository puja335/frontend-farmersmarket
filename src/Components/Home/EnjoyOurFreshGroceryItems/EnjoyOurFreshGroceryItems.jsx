import { Button, Container, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard, {
  ProductCardSkeleton,
} from "../../Products/ProductCard/ProductCard";

const EnjoyOurFreshGroceryItems = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // MediaQuery
  const isExtraSmallScreen = useMediaQuery("(max-width: 640px)");
  useEffect(() => {
    // window.scroll({ top: 0 });
    fetchProducts();
  }, [selectedCategory]);
  const API_URL =
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000/api/v1";
  console.log("selectedCategory", selectedCategory);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const url = selectedCategory
        ? `${API_URL}/product?category=${selectedCategory}`
        : `${API_URL}/product`;

      const { data } = await axios.get(url);
      console.log("data", data);

      if (selectedCategory) {
        const categoryData = data.data?.find(
          (group) =>
            group.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        console.log("categoryData", categoryData);
        setItems(categoryData ? categoryData.items : []);
      } else {
        // Flatten all items from different categories
        const allProducts = data.data.reduce(
          (acc, group) => [...acc, ...group.items],
          []
        );
        setItems(allProducts);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className='md:mt-16 md:mb-20 space-y-7 xl:space-y-8'>
        {/* Title */}
        <h1 className='text-center pb-0 md:text-2xl text-xl font-semibold capitalize tracking-wide'>
          Enjoy Our Healthy And Fresh <br />
          Grocery Items
        </h1>
        {/* Items Toggler  */}
        <ItemsToggler
          alignment={selectedCategory}
          setAlignment={setSelectedCategory}
        />

        {/*Grocery Items */}
        <div
          className='grid md:grid-cols-3 sm:grid-cols-2 
                lg:gap-6 gap-x-5 gap-y-5'
        >
          {!isLoading
            ? items.map((item) => <ProductCard key={item.id} product={item} />)
            : Array.from({ length: 3 }).map((pd, i) => {
                return <ProductCardSkeleton key={i} />;
              })}
        </div>
        <Button
          onClick={() => navigate("/products")}
          color='success'
          size={isExtraSmallScreen ? "small" : "medium"}
          variant='outlined'
          sx={{ textTransform: "capitalize", display: "block", mx: "auto" }}
        >
          View All Products
        </Button>
      </div>
    </Container>
  );
};

// Grocery Items Toggler
const ItemsToggler = ({ alignment, setAlignment }) => {
  // MediaQuery
  const isExtraSmallScreen = useMediaQuery("(max-width: 640px)");
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <div className='space-x-3 md:space-x-5 text-center'>
      {[
        { id: 1, name: "Vegetables" },
        { id: 2, name: "Fruits" },
        { id: 4, name: "Grains" },
      ].map((category) => (
        <Button
          sx={{
            textTransform: "capitalize",
            transition: "all 150ms ease-in-out",
          }}
          size={
            isExtraSmallScreen ? "small" : isLargeScreen ? "large" : "medium"
          }
          color='success'
          variant={alignment === category.id ? "contained" : "text"}
          key={category.id}
          onClick={() => setAlignment(category.name)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default EnjoyOurFreshGroceryItems;
