import React, { useState } from "react";
import API from "../components/api";
import { Link } from "react-router-dom";
import "../styles/register.css";
import toast from "react-hot-toast";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/register", form);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      toast.success("Registration successful!");
    } catch (err) {
      setError("Registration failed");
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          backgroundColor: "#00bcd4",
          color: "white",
          width: "100%",
          height: "100px",
          paddingTop: "30px",
        }}
      >
        Welcome to the RAD Shopping App
      </h1>

      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">Register</button>
          {error && <p>{error}</p>}
        </form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
