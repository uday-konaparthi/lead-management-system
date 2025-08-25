import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/user";

const registerPage = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setUser(data))
        navigate('/')
      } else {
        setMessage(data.error || "Registration failed.");
      }
    } catch {
      setMessage("Network error.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h2 className="text-3xl font-bold text-center mb-4">Create Your Account</h2>
      <form className="card w-100 px-6 py-8 space-y-4" onSubmit={handleSubmit}>
        <input
          className="input input-bordered w-full"
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          required
        />
        <input
          className="input input-bordered w-full"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
        />
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
          Register
        </button>
        <Link to='/login'>
          <p className="text-sm place-self-center">Already a user? <span className="text-blue-300 cursor-pointer hover:underline">click here</span></p>
        </Link>
        {message && <div className="text-center text-error">{message}</div>}
      </form>
    </div>
  );
};

export default registerPage;
