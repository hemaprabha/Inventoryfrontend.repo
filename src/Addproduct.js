import { use, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "./api";
function Addproduct() {
  const navigate=useNavigate();
  const[name,setName]=useState("");
  const[price,setPrice]=useState("");
 const[stock,setStock]=useState("");
 const[category,setCategory]=useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/products", {
      name,
      price,
      stock,
      category,
    });

    console.log(res.data);

    setName("");
    setPrice("");
    setStock("");
    setCategory("");

    toast.success("Product added");

    navigate("/inventorylist");
  } catch (err) {
    const data = err.response?.data;

    if (data?.errors) {
      Object.values(data.errors).forEach((field) => {
        field.forEach((msg) => toast.error(msg));
      });
    } else {
      toast.error(data?.message || "Server not reachable");
    }
  }
};

  return (
    <section className="min-h-screen bg-blue-900 flex items-center justify-center">

      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">

        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={price}
                onChange={(e)=>setPrice(e.target.value)}
            
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={stock}
             onChange={(e)=>setStock(e.target.value)}
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              name="category"
              value={category}
                onChange={(e)=>setCategory(e.target.value)}
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>Electronics</option>
              <option>TV</option>
              <option>PC</option>
              <option>Gaming</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
            >
              Add Product
            </button>

            <button
              type="button"
              className="border border-red-500 text-red-500 px-5 py-2 rounded-lg hover:bg-red-500 hover:text-white"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>

    </section>
  );
}

export default Addproduct;