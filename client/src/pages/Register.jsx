import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Register = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [user, setUser] = useState({
    //user_id: cookies.UserId, //backend userId üretir
    first_name: "",
    last_name: "",
    age: null,
    gender: "",
    email: "",
    password: "",
    //location: "",
    image: "",
    bio: "",
    matches: [],
  });

  const fileInput = React.createRef();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value =
      e.target.type === "file"
        ? fileInput.current.files[0].name
        : e.target.value;
    const name = e.target.name;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/register", {
        user,
      });

      setCookie("AuthToken", response.data.token); //backend in gönderdiği token ile Route bölümünde kontrol yap
      setCookie("UserId", response.data.userId);

      const success = response.status === 201;
      if (success) {
        navigate("/registerDog");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="formContainer register">
      <div className="formWrapper">
        <span className="logo">Tindog</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="Enter a name"
            required={true}
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Enter a surname"
            required={true}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Enter an age"
            onChange={handleChange}
          />
          <span
            className="title"
            style={{ fontSize: "15px", marginTop: "5px", textAlign: "left" }}
          >
            Gender
          </span>
          <div className="multiple-input-container">
            <input
              id="man-gender-identity"
              type="radio"
              name="gender"
              value="man"
              onChange={handleChange}
              checked={user.gender === "man"}
            />
            <label htmlFor="man-gender-identity">Man</label>
            <input
              id="woman-gender-identity"
              type="radio"
              name="gender"
              value="woman"
              onChange={handleChange}
              checked={user.gender === "woman"}
            />
            <label htmlFor="woman-gender-identity">Woman</label>
          </div>

          <input
            type="email"
            placeholder="Enter an email"
            name="email"
            required={true}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter a password"
            name="password"
            required={true}
            onChange={handleChange}
          />
          <input
            type="location"
            placeholder="Enter a city"
            name="location"
            required={true}
            onChange={handleChange}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              className="title"
              style={{ fontSize: "15px", marginTop: "5px", textAlign: "left" }}
            >
              Profile Picture
            </span>
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              ref={fileInput}
              onChange={handleChange}
            />
          </div>

          <input
            type="textArea"
            placeholder="Write about yourself"
            name="bio"
            onChange={handleChange}
          />
          <button type="submit">Next</button>
          <p>
            You do have an account? <Link to="/login">Login</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
