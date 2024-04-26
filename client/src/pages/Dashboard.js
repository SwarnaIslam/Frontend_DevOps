import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [tempCar, setTempCar] = useState({
    price: 0, // Defaulting to 0
    photo: "",
    model: "",
    type: "",
  });

  async function populateCars() {
    const req = await fetch("http://localhost:9000/api/cars", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    if (data.status === "ok") {
      setCars(data.cars);
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateCars();
      }
    }
  }, []);

  async function addCar(event) {
    event.preventDefault();
    const req = await fetch("http://localhost:9000/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(tempCar),
    });
    const data = await req.json();
    if (data.status === "ok") {
      setTempCar({
        price: 0, // Resetting price to 0
        photo: "",
        model: "",
        type: "",
      });
    } else {
      alert(data.error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    // If the field is price, convert value to number
    const newValue = name === "price" ? parseFloat(value) : value;
    setTempCar((prevCar) => ({
      ...prevCar,
      [name]: newValue,
    }));
  };

  return (
    <div>
      <h1>Sell Car: Submit information</h1>
      <form onSubmit={addCar}>
        <input
          type="number" // Change input type to number
          name="price"
          value={tempCar.price}
          placeholder="Price"
          onChange={handleChange}
        />
        <input
          type="text"
          name="photo"
          value={tempCar.photo}
          placeholder="Photo URL"
          onChange={handleChange}
        />
        <input
          type="text"
          name="model"
          value={tempCar.model}
          placeholder="Model"
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          value={tempCar.type}
          placeholder="Type"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <a
      
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </a>
    </div>
  );
};

export default Dashboard;
