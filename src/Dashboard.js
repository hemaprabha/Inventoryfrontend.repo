import { useEffect, useState } from "react";
import { FaCog, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "./api";
function  Dashboard(){
 
  const navigate=useNavigate();
  const[total_products,setTotal_products]=useState("");
  const[total_users,setTotal_users]=useState("");
  const[total_stocks,setTotal_stocks]=useState("");

  useEffect(() => {
  const fetchData = async () => {
    try {
      const dashboardres = await API.get("/dashboard");
      const data = dashboardres.data;
      setTotal_products(data.total_product);
      setTotal_stocks(data.total_stock);
      setTotal_users(data.total_user);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);
  
    return (
        <>
        <div className="flex  min-h-screen">
     <div className=" min-h-screen w-60   bg-sky-600  rounded-l-lg  text-white p-4  ">
 <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtqL_ksGcYqPBA618PMHgpz27gAIXeFvbQew&s" className="block w-full"/>  
 <ul className="space-y-4 white py-4">
          <li className="font-semibold text-white">  <i class="bi bi-trello"></i>   Dashboard</li>
          <li > <i class="bi bi-cart-fill"></i>    Your shop</li>
          <li  onClick={() => navigate("/inventorylist")} > <i class="bi bi-bank2"></i>    Inventory</li>
          <li > <i class="bi bi-archive-fill"></i>   Orders</li>
          <li ><i class="bi bi-bar-chart-fill"></i>   Reports</li>
          <li> <i class="bi bi-collection-fill"></i>    Collections</li>
          <li ><i class="bi bi-gear"></i>  Settings</li>
        </ul>
        <ul className="py-24 text-white">
<li><i class="bi bi-box-arrow-right"></i>   Logout</li>
        </ul>
</div>
<div className="flex-1  min-h-screen bg-white  rounded-tr-lg ">
  <div className="flex justify-end   mb-6">
    <form className="max-w-md w-full">
      <div className=" mt-5 relative">
        
        <input
          type="search"
          className="w-full p-2 pl-10 border rounded-sm"
          placeholder="Search"
        />

        <svg
          className="w-2 h-2 absolute left-3 top-3 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>

      </div>
    </form>

    <div className="flex items-center px-4 gap-4 text-xl">
      <FaCog className="cursor-pointer" />
      <FaBell className="cursor-pointer" />
    </div>  
     </div>
      <div className =" min-h-screen bg-sky-600 pt-5 border-4 border-white">
<div className="bg-white rounded-sm p-2 mx-4 shadow-md border border-gray-500">
    <h2>Over View</h2> 
  <div className="grid grid-cols-4 gap-4 mb-6">
  <div className="bg-purple-50 px-2 rounded-xl mt-3  mx-4 border border-gray-500">
    <div className="flex ">
        <div className="mt-5 bg-green-100 w-10 h-10 border border-black flex items-center justify-center rounded-lg">
  <i className="bi bi-collection-fill text-lg"></i>
</div>
        <div>
      <p className="text-sm p-2 text-gray-500">Total Products</p>
    <h3 className="text-lg px-2  font-bold">{total_products}</h3>
    </div>
     </div>
  </div>

   <div className="bg-purple-50 px-2 rounded-xl mt-3  mx-4 border border-gray-500">
    <div className="flex ">
        <div className="mt-5 bg-green-100 w-10 h-10 border border-black flex items-center justify-center rounded-lg">
  <i className="bi bi-tags-fill text-lg"></i>
</div>
        <div>
      <p className="text-sm p-2 text-gray-500">stocks</p>
    <h3 className="text-lg px-2  font-bold">{total_stocks}</h3>
    </div>
     </div>
  </div>

   <div className="bg-purple-50 px-2 rounded-xl mt-3  mx-4 border border-gray-500">
    <div className="flex ">
        <div className="mt-5 bg-green-100 w-10 h-10 border border-black flex items-center justify-center rounded-lg">
  <i className="bi bi-graph-up text-lg"></i>
</div>
        <div>
      <p className="text-sm p-2 text-gray-500">Orders</p>
    <h3 className="text-lg px-2  font-bold">2859</h3>
    </div>
     </div>
  </div>

  <div className="bg-purple-50 px-2 rounded-xl mt-3  mx-4 border border-gray-500">
    <div className="flex ">
        <div className="mt-5 bg-green-100 w-10 h-10 border border-black flex items-center justify-center rounded-lg">
  <i className="bi bi-journal text-lg"></i>
</div>
        <div>
      <p className="text-sm p-2 text-gray-500">Total users</p>
    <h3 className="text-lg px-2  font-bold">{total_users}</h3>
    </div>
     </div>
  </div>
</div>
</div>
    <div className="bg-white p-6 rounded-sm shadow-md max-w-6xl mx-4 mt-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Order History</h2>
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded-md text-sm outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-3 text-left">Order ID</th>
              <th className="py-3 text-left">Customer</th>
              <th className="py-3 text-left">Date</th>
              <th className="py-3 text-left">Status</th>
              <th className="py-3 text-left">Amount</th>
              <th className="py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            
            <tr className="border-b hover:bg-gray-50 transition">
              <td className="py-3 font-medium">#1234</td>
              <td className="flex items-center gap-2 py-3">
               
               Dinesh
              </td>
              <td>12 Apr 2026</td>
              <td>
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                  Completed
                </span>
              </td>
              <td className="font-semibold">$120</td>
              <td>
                <button className="text-blue-600 text-sm hover:underline">
                  View
                </button>
              </td>
            </tr>

            <tr className="border-b hover:bg-gray-50 transition">
              <td className="py-3 font-medium">#1235</td>
              <td className="flex items-center gap-2 py-3">
                
              Arun
              </td>
              <td>13 Apr 2026</td>
              <td>
                <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">
                  Pending
                </span>
              </td>
              <td className="font-semibold">$80</td>
              <td>
                <button className="text-blue-600 text-sm hover:underline">
                  View
                </button>
              </td>
            </tr>

            <tr className="hover:bg-gray-50 transition">
              <td className="py-3 font-medium">#1236</td>
              <td className="flex items-center gap-2 py-3">
               
            Rohini
              </td>
              <td>14 Apr 2026</td>
              <td>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                  Cancelled
                </span>
              </td>
              <td className="font-semibold">$45</td>
              <td>
                <button className="text-blue-600 text-sm hover:underline">
                  View
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
</div>
</div>
  </div>

      



        </>
       
    );
}
export default Dashboard;