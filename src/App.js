import Auth from "./Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Route,Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import "bootstrap-icons/font/bootstrap-icons.css";
import Inventorylist from "./Inventorylist";
import Addproduct from "./Addproduct";
import Editproduct from "./Editproduct";
function App() {
   
  return (
    <>
    <ToastContainer />
   <BrowserRouter>
      {/* Toast container should also be here */}
      
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/inventorylist" element={<Inventorylist/>} />
         <Route path="/addproduct" element={<Addproduct/>} />
      <Route path="/editproduct/:id" element={<Editproduct />} />
      </Routes>
    </BrowserRouter>
    </>
  );
   
}

export default App;