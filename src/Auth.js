import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import API from "./api";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Auth() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const res = await API.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");
      navigate("/inventorylist");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const res =  await API.post("/register", {
        name,
        email,
        password,
      });

      toast.success("Registered successfully");

      setName("");
      setEmail("");
      setPassword("");

      navigate("/dashboard");
    } catch (err) {
      const data = err.response?.data;

      if (data?.errors) {
        Object.values(data.errors).forEach((field) => {
          field.forEach((msg) => toast.error(msg));
        });
      } else {
        toast.error(data?.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="w-2/4 bg-sky-600 rounded-sm">
        <img
          className="mt-40 ms-24"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKsdH-NyNgwa-v1a_XVPoDrVlOT8tEdoaZZw&s"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-3/4 bg-white rounded-sm">
        <p className="text-4xl text-sky-600 font-bold text-center">
          {login ? "Sign in" : "Create Account"}
        </p>

        {/* SOCIAL */}
        <div className="flex justify-center gap-4 mt-4">
          <FaFacebookF />
          <FaTwitter />
          <FaLinkedinIn />
        </div>

        <p className="mt-4 text-center text-gray-400">
          or use your email account
        </p>

        {/* FORM */}
        <div className="mt-10 flex justify-center">
          <div className="flex flex-col gap-4 w-96">

            {/* NAME */}
            {!login && (
              <div className="flex items-center border-2 border-sky-600 px-4 py-3">
                <FaUser className="mr-3" />
                <input
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full outline-none"
                />
              </div>
            )}

            {/* EMAIL */}
            <div className="flex items-center border-2 border-sky-600 px-4 py-3">
              <FaEnvelope className="mr-3" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex items-center border-2 border-sky-600 px-4 py-3">
              <FaLock className="mr-3" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none"
              />
            </div>

          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={login ? handleLogin : handleRegister}
            disabled={loading}
            className="text-white bg-sky-600 px-4 py-2 rounded-lg"
          >
            {loading ? "Please wait..." : login ? "SIGN IN" : "SIGN UP"}
          </button>
        </div>

        {/* TOGGLE */}
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
  );
}

export default Auth;