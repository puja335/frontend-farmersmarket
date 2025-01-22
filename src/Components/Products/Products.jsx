import { Container, Fade } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductCard, { ProductCardSkeleton } from "./ProductCard/ProductCard"

const API_URL = import.meta.env.VITE_REACT_APP_API_URL
  ? import.meta.env.VITE_REACT_APP_API_URL
  : "http://localhost:5000/api/v1"

const Products = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { categoryName } = useParams()

  useEffect(() => {
    window.scroll({ top: 0 })
    fetchProducts()
  }, [categoryName])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const url = categoryName
        ? `${API_URL}/product?category=${categoryName}`
        : `${API_URL}/product`

      const { data } = await axios.get(url)

      if (categoryName) {
        const categoryData = data.data.find(
          (group) => group.category.toLowerCase() === categoryName.toLowerCase()
        )
        setProducts(categoryData?.items || [])
      } else {
        // Flatten all items from different categories
        const allProducts = data.data.reduce(
          (acc, group) => [...acc, ...group.items],
          []
        )
        setProducts(allProducts)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products")
      console.error("Error fetching products:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center text-red-500'>
        {error}
      </div>
    )
  }

  return (
    <main className='min-h-screen space-y-5 pt-20 mb-9'>
      <Fade in={true}>
        <Container className='xl:space-y-10 sm:space-y-8 space-y-6'>
          <h1 className='pb-0 md:text-2xl text-xl font-semibold text-gray-700 capitalize'>
            {categoryName ? categoryName : "All Products"}
          </h1>

          <section className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-6 gap-x-5 gap-y-5'>
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </section>
        </Container>
      </Fade>
    </main>
  )
}

export default Products
