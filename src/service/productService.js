import axios from "@/utils/apiClient";
import axiosInstance from "./axiosInstance";

export const getProductById = async (productId) => {
  const response = await axiosInstance.get(`product/${productId}`);
  console.log("response", response.data);
  return response.data.data;
};

export const createProduct = async (formData) => {
  return axios.post("/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      maxContentLength: 10000000,
      maxBodyLength: 10000000,
    },
  });
};

export const updateProduct = async (id, formData) => {
  return axios.put(`/product/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      maxContentLength: 10000000,
      maxBodyLength: 10000000,
    },
  });
};

export const getProducts = async () => {
  return axios.get("/product");
};

export const deleteProduct = async (id) => {
  return axios.delete(`/product/${id}`);
};

export const prepareProductFormData = (productData, imageFile) => {
  const formData = new FormData();

  if (imageFile) {
    formData.append("Image", imageFile);
  }

  const arrayFields = ["sizes", "colors", "material", "festival_tags"];
  arrayFields.forEach((field) => {
    if (productData[field]) {
      formData.append(field, JSON.stringify(productData[field]));
    }
  });

  Object.keys(productData).forEach((key) => {
    if (key !== "Image") {
      formData.append(
        key,
        typeof productData[key] === "object"
          ? JSON.stringify(productData[key])
          : productData[key]
      );
    }
  });

  return formData;
};
