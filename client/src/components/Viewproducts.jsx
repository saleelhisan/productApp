import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function Viewproducts() {
  const navigate = useNavigate();

  const [editingProduct, setEditingProduct] = useState(null);

  const openEditModal = (product) => {
    setEditingProduct(true);
  };

  const closeEditModal = () => {
    setEditingProduct(null);
  };
  const token = useSelector((state) => state.token);
  const username = useSelector((state) => state.user.username);
  const [products, setProducts] = useState([]);

  async function handleDelete(productId) {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(`http://localhost:3002/api/products/${productId}`, {
        headers,
      });

      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEdit(productId) {
    console.log("button workde");
    navigate(`/editproduct/${productId}`);
  }

  useEffect(() => {
    async function fetchProducts() {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get("http://localhost:3002/api/products", {
        headers,
      });
      console.log(response.data);
      setProducts(response.data);
    }

    fetchProducts();
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/png;base64,${btoa(binary)}`;
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product._id}>
              {/* Product card */}
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <img
                  src={arrayBufferToBase64(product?.image?.data)}
                  alt={product.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-6 border-b border-gray-200 relative">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-600">${product.price}</p>
                  {product.user === username && (
                    <div className="flex justify-between items-center">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleEdit(product._id)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}

export default Viewproducts;
