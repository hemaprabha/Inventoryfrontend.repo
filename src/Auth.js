import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
function Auth() {
    const navigate=useNavigate();
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[login,setLogin]=useState(false);

const  handleLogin =(e)=>{
     e.preventDefault();
    axios.post("http://localhost:8000/api/login",{
        email,
        password
    })
.then((res)=>{
    localStorage.setItem("token", res.data.token);
     toast.success("Login successful ");
     navigate("/inventorylist");
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setLogin(true);
     console.log(res);       
  console.log(res.data);   
})
.catch((err)=>{
    if(err.response){

        toast.error("Something went wrong");
    }
})
 }
 const handleRegister=(e)=>{
    e.preventDefault();
     axios.post("http://localhost:8000/api/register",{
        name,
        email,
        password
    })
    .then((res)=>{
        console.log(res.data)
        setName("")
        setPassword("")
        setEmail("")
toast.success("registered Successfully")
navigate("/dashboard");
    })
   .catch((err) => {
  if (err.response) {
    const data = err.response.data;

    if (data.errors) {
      Object.values(data.errors).forEach((field) => {
        field.forEach((msg) => {
          toast.error(msg); 
        });
      });
    }
    else if (data.message) {
      toast.error(data.message);
    }

  } else {
    toast.error("Server not reachable");
  }
});

 }

  return (
    <>
    <div className="min-h-screen flex ">
        <div className=" w-2/4 bg-sky-600  rounded-sm ">
        <img  className="mt-40 ms-24"
        src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKsdH-NyNgwa-v1a_XVPoDrVlOT8tEdoaZZw&s"/>
        </div>

        <div className="w-3/4  bg-white  rounded-sm ">
        <p className=" font-poppins text-4xl text-sky-600 font-bold fs-24 tracking-wide text-center">{login ? "Sign in":"Create Account"} </p>
         <div className=" flex items-center justify-center flex gap-4 mt-4">
      
      <div className="border border-sky-600 rounded-full p-3 cursor-pointer">
        <FaFacebookF className="text-gray-400" />
      </div>

      <div className="border border-sky-600 rounded-full p-3 cursor-pointer">
        <FaTwitter className="text-gray-400" />
      </div>

      <div className="border border-sky-600 rounded-full p-3 cursor-pointer">
        <FaLinkedinIn className="text-gray-400" />
      </div>

    </div>
    <p className=" mt-4 text-center font-bold  text-gray-400 ">or use your email account </p>
    <div className=" mt-10 flex justify-center"  > 
  <div className="flex flex-col  gap-4 w-96  ">
{ !login &&(<div className="flex items-center  border-2 border-sky-600 rounded-sm px-4 py-3">
        <FaUser className="text-gray-300 text-lg mr-3" />
        <input
          type="text"
          placeholder="Username"
          onChange={(e)=>setName(e.target.value)}
          className=" font-poppins  text-gray-600 placeholder-gray-300 w-full"
        />
      </div>)}
     
      

   
      <div className="flex items-center  border-2 border-sky-600 rounded-sm px-4 py-3">
        <FaEnvelope className="text-gray-300 text-lg mr-3" />
        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          className="font-poppins  text-gray-600 placeholder-gray-300 w-full"
        />
      </div>

    
      <div className="flex items-center border-2 border-sky-600 rounded-sm px-4 py-3">
        <FaLock className="text-gray-300 text-lg mr-3" />
        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          className="bg-transparent font-poppins   text-gray-600 placeholder-gray-300 w-full"
        />
      </div>

    </div>
        </div>
        <div className=" mt-10 flex justify-center border-sm ">
<button 
  type="button"
onClick={login ? handleLogin : handleRegister}
  className=" text-white bg-sky-600 border border-transparent hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 shadow-sm font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none"
>
  {login ? "SIGN IN":"SIGN UP"}
</button>
</div>
<p
  className="mt-4 text-center text-gray-500 cursor-pointer"
  onClick={() => setLogin(!login)}
>
  {login
    ? "Don't have an account? Sign Up"
    : "Already have an account? Sign In"}
</p>
        </div>
    </div>
    </>
  );
}

export default Auth;