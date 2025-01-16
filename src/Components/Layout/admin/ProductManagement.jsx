import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  PlusCircle,
  Search,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../../utils/apiClient";

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const productsPerPage = 8;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: 1,
    unit: "kg",
    img: "",
    images: [],
    description: "",
    tags: [],
    oldPrice: "",
    reviews: 0,
    reviewCount: 0,
    inStock: true,
    isFeatured: false,
  });

  const handleMultipleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        continue;
      }

      try {
        const formData = new FormData();
        formData.append("Image", file);

        const response = await apiClient.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.success) {
          setFormData((prev) => ({
            ...prev,
            images: [...(prev.images || []), response.data.imageUrl],
          }));
        }
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
  };

  const handleTagsChange = (value) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    setFormData((prev) => ({ ...prev, tags }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      quantity: 1,
      unit: "kg",
      img: "",
      images: [],
      description: "",
      tags: [],
      oldPrice: "",
      reviews: 0,
      reviewCount: 0,
      inStock: true,
      isFeatured: false,
    });
    setEditingProduct(null);
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/product");

      setProducts(response.data.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log("product", products);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await (editingProduct
        ? apiClient.put(`/product/${editingProduct._id}`, formData)
        : apiClient.post("/product", formData));

      if (response.data.success) {
        toast.success(
          `Product ${editingProduct ? "updated" : "created"} successfully`
        );
        setIsFormOpen(false);
        resetForm();
        fetchProducts();
      }
    } catch (error) {
      toast.error("Failed to save product");
    }
  };

  // Add these functions to your component

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Image", file);

      setImageUploading(true);
      const response = await apiClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("response", response);

      if (response.data.success) {
        setImageUploading(false);
        const url = response.data.imageUrl;
        setFormData((prev) => ({ ...prev, img: url }));
        toast.success("Image uploaded successfully");
      }
      console.log("response image", response);
    } catch (error) {
      setImageUploading(false);
      toast.error("Failed to upload image", error);
    }
  };

  //   const handleEdit = (product) => {
  //     setEditingProduct(product);
  //     setFormData({
  //       name: product.name,
  //       category: product.category,
  //       price: product.price,
  //       quantity: product.quantity,
  //       unit: product.unit,
  //       img: product.img,
  //       reviews: product.reviews,
  //       reviewCount: product.reviewCount,
  //       inStock: product.inStock,
  //     });
  //     setIsFormOpen(true);
  //   };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      images: product.images || [],
      tags: product.tags || [],
      oldPrice: product.oldPrice || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await apiClient.delete(`/product/${id}`);
      if (response.ok) {
        toast.success("Product deleted successfully");
        fetchProducts();
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const getFilteredProducts = () => {
    if (!products || !products.length) return [];

    // Flatten all items from categories
    const allProducts = products.reduce(
      (acc, category) => [...acc, ...category.items],
      []
    );

    return allProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        currentFilter === "all" ||
        (currentFilter === "inStock" && product.inStock) ||
        (currentFilter === "outStock" && !product.inStock) ||
        (currentFilter === "featured" && product.isFeatured);

      return matchesSearch && matchesFilter;
    });
  };
  const filteredProducts = getFilteredProducts();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-semibold text-gray-900'>
              Product Management
            </h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className='inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors'
            >
              <PlusCircle className='w-5 h-5 mr-2' />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Filters and Search */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
          <div className='relative flex-1 max-w-xs'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Search products...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent'
            />
          </div>

          <div className='flex gap-4'>
            <select
              value={currentFilter}
              onChange={(e) => setCurrentFilter(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent'
            >
              <option value='all'>All Products</option>
              <option value='inStock'>In Stock</option>
              <option value='outStock'>Out of Stock</option>
              <option value='featured'>Featured</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className='bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow'
            >
              <div className='aspect-w-16 aspect-h-9 bg-gray-200'>
                <img
                  src={product.img}
                  alt={product.name}
                  className='object-cover w-full h-48'
                />
              </div>
              <div className='p-4'>
                <div className='flex justify-between items-start mb-2'>
                  <h3 className='text-lg font-medium text-gray-900 truncate'>
                    {product.name}
                  </h3>
                  <div className='flex items-center'>
                    <Star className='w-4 h-4 text-yellow-400 fill-current' />
                    <span className='ml-1 text-sm text-gray-600'>
                      {product.reviews}
                    </span>
                  </div>
                </div>
                <p className='text-sm text-gray-500 mb-2'>{product.category}</p>
                <div className='flex justify-between items-center'>
                  <span className='text-lg font-semibold'>
                    ${product.price}
                  </span>
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => handleEdit(product)}
                      className='p-2 text-gray-600 hover:text-black rounded-full hover:bg-gray-100'
                    >
                      <Pencil className='w-5 h-5' />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className='p-2 text-red-600 hover:text-red-700 rounded-full hover:bg-red-50'
                    >
                      <Trash2 className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='flex justify-between items-center mt-6'>
          <p className='text-sm text-gray-600'>
            Showing {indexOfFirstProduct + 1} to{" "}
            {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>
          <div className='flex space-x-2'>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className='p-2 rounded-md border border-gray-300 disabled:opacity-50'
            >
              <ChevronLeft className='w-5 h-5' />
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className='p-2 rounded-md border border-gray-300 disabled:opacity-50'
            >
              <ChevronRight className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Product Form Modal */}
        {/* Product Form Modal */}
        {isFormOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
            <div className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
              <div className='p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='text-2xl font-semibold text-gray-900'>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h2>
                  <button
                    onClick={() => {
                      setIsFormOpen(false);
                      resetForm();
                    }}
                    className='text-gray-500 hover:text-gray-700'
                  >
                    <X className='w-6 h-6' />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>
                        Name
                      </label>
                      <input
                        type='text'
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md'
                        required
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700'>
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md'
                        required
                      >
                        <option value=''>Select Category</option>
                        <option value='Vegetables'>Vegetables</option>
                        <option value='Fruits'>Fruits</option>
                        <option value='Grains'>Grains</option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700'>
                        Price ($)
                      </label>
                      <input
                        type='number'
                        step='0.01'
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md'
                        required
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700'>
                        Quantity
                      </label>
                      <input
                        type='number'
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({ ...formData, quantity: e.target.value })
                        }
                        className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md'
                        required
                      />
                    </div>
                    <div className='col-span-2'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        rows={4}
                        className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md'
                        required
                      />
                    </div>

                    <div className='col-span-2'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Additional Images
                      </label>
                      <input
                        type='file'
                        multiple
                        accept='image/*'
                        onChange={handleMultipleImageUpload}
                        className='mt-1'
                      />
                      {formData.images?.length > 0 && (
                        <div className='mt-2 flex gap-2'>
                          {formData.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt=''
                              className='w-16 h-16 object-cover rounded'
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <div className='col-span-2'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Tags
                      </label>
                      <input
                        type='text'
                        value={formData.tags?.join(", ") || ""}
                        onChange={(e) => handleTagsChange(e.target.value)}
                        placeholder='Enter tags separated by commas'
                        className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700'>
                        Unit
                      </label>
                      <select
                        value={formData.unit}
                        onChange={(e) =>
                          setFormData({ ...formData, unit: e.target.value })
                        }
                        className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md'
                      >
                        <option value='kg'>Kilogram (kg)</option>
                        <option value='g'>Gram (g)</option>
                        <option value='lb'>Pound (lb)</option>
                        <option value='pcs'>Pieces</option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700'>
                        Image{" "}
                        <span>{imageUploading ? "(Uploading...)" : ""}</span>
                      </label>
                      <div className='mt-1 flex items-center'>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={handleImageChange}
                          className='hidden'
                          id='image-upload'
                        />
                        <label
                          htmlFor='image-upload'
                          className='cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
                        >
                          <Upload className='w-5 h-5 mr-2' />
                          Upload Image
                        </label>
                        {formData.img && (
                          <img
                            src={formData.img}
                            alt='Preview'
                            className='ml-4 h-12 w-12 object-cover rounded-md'
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700'>
                        Stock Status
                      </label>
                      <div className='mt-2'>
                        <label className='inline-flex items-center'>
                          <input
                            type='checkbox'
                            checked={formData.inStock}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                inStock: e.target.checked,
                              })
                            }
                            className='rounded border-gray-300 text-black focus:ring-black'
                          />
                          <span className='ml-2'>In Stock</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className='mt-6 flex justify-end space-x-3'>
                    <button
                      type='button'
                      onClick={() => {
                        setIsFormOpen(false);
                        resetForm();
                      }}
                      className='px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      disabled={imageUploading || isLoading}
                      className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800'
                    >
                      {editingProduct ? "Update Product" : "Create Product"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAdmin;
