import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Edit = ( car ) => {
  console.log(car);
  const [tempCar, setTempCar] = useState(car);
  const [file, setFile] = useState();
  const navigate = useNavigate();
  async function addCar(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("price", tempCar.price);
    formData.append("model", tempCar.model);
    formData.append("type", tempCar.type);
    formData.append("id", car.id);
    const req = await axios.put("http://localhost:9000/api/cars", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    console.log(req);
    const data = req.data;
    if (data.status === "ok") {
      navigate("/dashboard");
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
  const fileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  return (
    <div>
      <h1>Sell Car: Submit information</h1>
      <form onSubmit={addCar}>
        <input
          type="number"
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
    </div>
  );
};

export default Edit;
