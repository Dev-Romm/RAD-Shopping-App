import { useState } from "react";
import API from "../components/api";
import { Link } from "react-router-dom";
import "../styles/login.css";
import toast from "react-hot-toast";


function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const res = await API.post("/api/login", form);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      toast.success("Login successful!");
      window.location.href = "/home"; // Redirect to home after login
    } catch (err) {
      setError("Login failed!!! Retry");
      toast.error(err.response.data.message);
    }
  };
  return (
    <div >
      <h1 style={{ textAlign: "center" , backgroundColor: "#00bcd4", color:"white", width: "100%", height:"100px", paddingTop: "30px"}}>Welcome to the RAD Shopping App</h1>
      <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        {error && <p>{error}</p>}

      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      </div>
    </div>
  );
}

export default Login;
