import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import API from "./api";
function Editproduct() {
  const navigate = useNavigate();
  const { id } = useParams(); // 👈 get id

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  
 useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      const data = res.data.data;

      setName(data.name);
      setPrice(data.price);
      setStock(data.stock);
      setCategory(data.category);
    } catch (err) {
      toast.error("Failed to load product");
    }
  };

  fetchProduct();
}, [id]);


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.put(`/products/${id}`, {
      name,
      price,
      stock,
      category,
    });

    toast.success("Product updated");
    navigate("/inventorylist");
  } catch (err) {
    const data = err.response?.data;

    if (data?.errors) {
      Object.values(data.errors).forEach((field) => {
        field.forEach((msg) => toast.error(msg));
      });
    } else {
      toast.error(data?.message || "Update failed");
    }
  }
};
  return (
    <section className="min-h-screen bg-blue-900 flex items-center justify-center">

      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">

        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">

        
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Stock
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e)=>setStock(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
          </div>

         
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              className="w-full border p-2 rounded-lg"
            >
              <option>Electronics</option>
              <option>TV</option>
              <option>PC</option>
              <option>Gaming</option>
            </select>
          </div>

         
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Update Product
            </button>

            <button
              type="button"
              onClick={() => navigate("/inventorylist")}
              className="border border-red-500 text-red-500 px-5 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>

    </section>
  );
}

export default Editproduct;