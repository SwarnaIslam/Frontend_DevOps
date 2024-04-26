import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [file, setFile] = useState();
  const [tempCar, setTempCar] = useState({
    price: 0, // Defaulting to 0
    photo: "",
    model: "",
    type: "",
  });

  async function populateCars() {
    const req = await fetch("https://api.projectsbd.me/api/cars/your-cars", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    console.log(data);
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
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("price", tempCar.price);
    formData.append("model", tempCar.model);
    formData.append("type", tempCar.type);
    const req = await axios.post("https://api.projectsbd.me/api/cars", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    console.log(req);
    const data = req.data;
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

  async function deleteCar(carId) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `https://api.projectsbd.me/api/cars/${carId}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      console.log(res);
      if (res.data.status === "ok") {
        // Remove the deleted car from the state
        setCars(cars.filter((car) => car._id !== carId));
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the car.");
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
  const fileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div>
      <Link to="/home">Home</Link>
      <h1>Sell Car: Submit information</h1>
      <form onSubmit={addCar}>
        <input
          type="number" // Change input type to number
          name="price"
          value={tempCar.price}
          placeholder="Price"
          onChange={handleChange}
        />
        <br />
        <input type="file" accept="image/*" onChange={fileChange} />
        <br />
        <input
          type="text"
          name="model"
          value={tempCar.model}
          placeholder="Model"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="type"
          value={tempCar.type}
          placeholder="Type"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        {cars.map((car) => (
          <div key={car._id}>
            <h2>Car Info</h2>
            <p>Price: {car.price}</p>
            <p>Model: {car.model}</p>
            <p>Type: {car.type}</p>
            <button onClick={() => deleteCar(car._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
