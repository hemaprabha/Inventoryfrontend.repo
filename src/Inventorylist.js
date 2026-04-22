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
   <div className =" bg-blue-900 p-4 ">
<p className="text-white ">Inventory Management System </p>
   </div>
   <div className="flex">
<div className="min-h-screen w-1/4 bg-gray-200 border-r border-black p-4">

 
  <div className="flex flex-col gap-4">
    <div  onClick={() => navigate("/addproduct")}
    className="flex items-center gap-3 p-2 bg-gray-500 text-white rounded-lg">
      <i className="bi bi-box"></i>
      <span>Add Product</span>
    </div>

    <hr className="border-black" />

    <div 
    className="flex items-center gap-3 p-2 bg-gray-500 text-white rounded-lg">
      <i className="bi bi-cart"></i>
      <span>Orders</span>
    </div>

    <hr className="border-black" />

    <div className="flex items-center gap-3 p-2 bg-gray-500 text-white rounded-lg">
      <i className="bi bi-graph-up"></i>
      <span>Reports</span>
    </div>

    <hr className="border-black" />

    <div className="flex items-center gap-3 p-2 bg-gray-500 text-white rounded-lg">
      <i className="bi bi-gear"></i>
      <span>Settings</span>
    </div>

  </div>
</div>
    <div className=" w-3/4 bg-gray-200">
     <div className="grid grid-cols-4 gap-4 mb-6">
 <div className="relative bg-blue-900 px-2 rounded-sm mt-6 mx-4 border border-gray-500 pt-8">
  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white w-10 h-10 border border-black flex items-center justify-center rounded-lg shadow">
    <i className="bi bi-collection-fill text-lg"></i>
  </div>
  <div className="text-center">
    <p className="text-sm text-white">Total Products</p>
    <h3 className="text-lg text-white font-bold">{total_products}</h3>
  </div>

</div>

<div className="relative bg-blue-900 px-2 rounded-sm mt-6 mx-4 border border-gray-500 pt-8">
  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white w-10 h-10 border border-black flex items-center justify-center rounded-lg shadow">
    <i className="bi bi-tags-fill text-lg"></i>
  </div>
  <div className="text-center">
    <p className="text-sm text-white">stocks</p>
    <h3 className="text-lg text-white font-bold">{total_stocks}</h3>
  </div>

</div>


<div className="relative bg-blue-900 px-2 rounded-sm mt-6 mx-4 border border-gray-500 pt-8">
  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white w-10 h-10 border border-black flex items-center justify-center rounded-lg shadow">
   <i className="bi bi-graph-up text-lg"></i>
  </div>
  <div className="text-center">
    <p className="text-sm text-white">Orders</p>
    <h3 className="text-lg text-white font-bold">2859</h3>
  </div>

</div>
<div className="relative bg-blue-900 px-2 rounded-sm mt-6 mx-4 border border-gray-500 pt-8">
  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white w-10 h-10 border border-black flex items-center justify-center rounded-lg shadow">
<i className="bi bi-journal text-lg"></i>
  </div>
  <div className="text-center">
    <p className="text-sm text-white">Total Users</p>
    <h3 className="text-lg text-white font-bold">{total_users}</h3>
  </div>
</div>
</div>
<div className="overflow-x-auto bg-white shadow rounded-lg border">

      <table className="w-full text-sm text-left">

        {/* HEADER */}
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="px-6 py-3">Product Name</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-4 py-3 ">Action</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>

          {products.map((p, index) => (
            <tr
              key={p.id}
              className={`
                border-b
                ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                hover:bg-blue-100 transition
              `}
            >

              <td className="px-6 py-4 font-medium text-gray-800">
                {p.name}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {p.category}
              </td>

              <td className="px-6 py-4">
                {p.stock}
              </td>

              <td className="px-6 py-4 font-semibold">
                ${p.price}
              </td>

              <td className="px-4 py-4 text-right flex  gap-3">
  <button  onClick={() => navigate(`/editproduct/${p.id}`)}
  className="text-blue-900  text-lg hover:text-blue-800">
    <FaEdit />
  </button>
  <button 
    onClick={() => handleDelete(p.id)}
  className="text-blue-900  text-lg hover:text-red-800">
    <FaTrash />
  </button>

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