import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API from "./api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
function Inventorylist() {
  const[total_products,setTotal_products]=useState("");
  const[total_users,setTotal_users]=useState("");
  const[total_stocks,setTotal_stocks]=useState("");
    const navigate=useNavigate();
    const [products,setProducts]=useState([]);
    useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
  try {
    const res = await API.get("/products");
    setProducts(res.data.data);
  } catch (err) {
    console.error(err);
    toast.error("Failed to load products");
  }
};
 useEffect(() => {
  const fetchdata = async () => {
    try {
      const dashboardres = await API.get("/dashboard");
      const data = dashboardres.data;

      setTotal_products(data.total_product);
      setTotal_stocks(data.total_stock);
      setTotal_users(data.total_user);
    } catch (err) {
      console.error(err);
      toast.error("Dashboard load failed");
    }
  };

  fetchdata();
}, []);

  
  const handleDelete = async (id) => {
  try {
    await API.delete(`/products/${id}`);

    toast.success("Product deleted");

    setProducts((prev) => prev.filter((p) => p.id !== id));
  } catch (err) {
    toast.error("Delete failed");
  }
};
console.log(total_users);
    return (<>
  <div className="bg-blue-900 p-4">
  <p className="text-white text-center md:text-left">
    Inventory Management System
  </p>
</div>

<div className="flex flex-col md:flex-row">

  {/* SIDEBAR */}
  <div className="w-full md:w-1/4 bg-gray-200 border-r border-black p-4">

    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
      
      <div onClick={() => navigate("/addproduct")}
        className="flex items-center gap-3 p-2 bg-gray-500 text-white rounded-lg whitespace-nowrap">
        <i className="bi bi-box"></i>
        <span>Add Product</span>
      </div>

      <div className="flex items-center gap-3 p-2 bg-gray-500 text-white rounded-lg whitespace-nowrap">
        <i className="bi bi-cart"></i>
        <span>Orders</span>
      </div>

      <div className="flex items-center gap-3 p-2 bg-gray-500 text-white rounded-lg whitespace-nowrap">
        <i className="bi bi-graph-up"></i>
        <span>Reports</span>
      </div>

      <div className="flex items-center gap-3 p-2 bg-gray-500 text-white rounded-lg whitespace-nowrap">
        <i className="bi bi-gear"></i>
        <span>Settings</span>
      </div>

    </div>
  </div>

  {/* MAIN CONTENT */}
  <div className="w-full md:w-3/4 bg-gray-200 p-4">

    {/* DASHBOARD CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

      {/* CARD */}
      <div className="relative bg-blue-900 px-2 rounded-sm border pt-8">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white w-10 h-10 flex items-center justify-center rounded-lg shadow">
          <i className="bi bi-collection-fill"></i>
        </div>
        <div className="text-center text-white">
          <p>Total Products</p>
          <h3 className="font-bold">{total_products}</h3>
        </div>
      </div>

      <div className="relative bg-blue-900 px-2 rounded-sm border pt-8">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white w-10 h-10 flex items-center justify-center rounded-lg shadow">
          <i className="bi bi-tags-fill"></i>
        </div>
        <div className="text-center text-white">
          <p>Stocks</p>
          <h3 className="font-bold">{total_stocks}</h3>
        </div>
      </div>

      <div className="relative bg-blue-900 px-2 rounded-sm border pt-8">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white w-10 h-10 flex items-center justify-center rounded-lg shadow">
          <i className="bi bi-graph-up"></i>
        </div>
        <div className="text-center text-white">
          <p>Orders</p>
          <h3 className="font-bold">2859</h3>
        </div>
      </div>

      <div className="relative bg-blue-900 px-2 rounded-sm border pt-8">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white w-10 h-10 flex items-center justify-center rounded-lg shadow">
          <i className="bi bi-journal"></i>
        </div>
        <div className="text-center text-white">
          <p>Total Users</p>
          <h3 className="font-bold">{total_users}</h3>
        </div>
      </div>

    </div>

    {/* TABLE */}
    <div className="overflow-x-auto bg-white shadow rounded-lg border">
      <table className="min-w-[600px] w-full text-sm text-left">

        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, index) => (
            <tr key={p.id}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"} hover:bg-blue-100`}>

              <td className="px-4 py-3">{p.name}</td>
              <td className="px-4 py-3">{p.category}</td>
              <td className="px-4 py-3">{p.stock}</td>
              <td className="px-4 py-3">${p.price}</td>

              <td className="px-4 py-3">
                <div className="flex gap-3">
                  <button onClick={() => navigate(`/editproduct/${p.id}`)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(p.id)}>
                    <FaTrash />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>

  </div>
</div>
    </>);
    
}
export default Inventorylist;