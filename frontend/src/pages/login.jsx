import { useState } from "react";
import {useDispatch} from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/user";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form)
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        dispatch(setUser(data))
        navigate('/')
      } else {
        setMessage(
          (data && data.error && (data.error.message || data.error)) ||
          data.message ||
          "Invalid credentials."
        );
      }
    } catch (error) {
      console.log(error);
      setMessage("Network error or server is down.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h2 className="text-4xl font-bold text-center ">
        Welcome Back!
      </h2>
      <form className="card w-100 px-6 py-8 space-y-4" onSubmit={handleSubmit}>
        <input
          className="input input-bordered w-full"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="input input-bordered w-full"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary w-full mt-2" type="submit">
          Login
        </button>
        <Link to='/register'>
          <p className="text-sm place-self-center">
            New user? <span className="text-blue-300 cursor-pointer hover:underline">Register here</span>
          </p>
        </Link>
        {message && <div className="text-center text-error">{message}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
