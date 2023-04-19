import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

function Editproduct() {
  const user = useSelector((state) => state.user);
  const username = user.username;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const token = useSelector((state) => state.token);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (image !== null) {
      formData.append("image", image);
    }
    formData.append("user", username);

    axios
      .patch(`http://localhost:3002/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setName("");
    setDescription("");
    setPrice("");
    setImage(null);
  };

  const { id } = useParams();

  useEffect(() => {
    async function fetchProducts() {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `http://localhost:3002/api/products/${id}`,
        {
          headers,
        }
      );

      console.log(response.data);
      setName(response.data.name);
      setPrice(response.data.price);
      setDescription(response.data.description);
    }

    fetchProducts();
  }, []);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Add product panel */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Add a new product</h2>

            {/* Add product form */}
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  required
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  required
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  className="block w-full"
                  onChange={handleImageChange}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editproduct;
