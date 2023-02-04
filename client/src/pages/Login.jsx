import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        form,
      });

      if (response.status === 201) navigate("/home");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formContainer login">
      <div className="formWrapper">
        <span className="logo">Tindog</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter an email"
            name="email"
            onChange={onChange}
          />
          <input
            type="password"
            placeholder="Enter a password"
            name="password"
            onChange={onChange}
          />
          <button type="submit">Login</button>
          <p>
            You don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
