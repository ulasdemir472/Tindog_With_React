import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function RegisterDog() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [dog, setDog] = useState({
    name: "",
    type: "",
    age: null,
    gender: "",
    image: "",
    user_id: cookies.UserId,
  });

  const fileInput = React.createRef();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value =
      e.target.type === "file"
        ? fileInput.current.files[0].name
        : e.target.value;
    const name = e.target.name;

    setDog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/registerDog", {
        dog,
      });
      const success = response.status === 201;
      if (success) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="formContainer registerDog">
      <div className="formWrapper dogWrapper">
        <span className="logo">Tindog</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter a name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="type"
            placeholder="Enter a type"
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
              checked={dog.gender === "man"}
            />
            <label htmlFor="man-gender-identity">Man</label>
            <input
              id="woman-gender-identity"
              type="radio"
              name="gender"
              value="woman"
              onChange={handleChange}
              checked={dog.gender === "woman"}
            />
            <label htmlFor="woman-gender-identity">Woman</label>
          </div>
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
          <button type="submit">Register</button>
          <p>
            You do have an account? <Link to="/login">Login</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterDog;
