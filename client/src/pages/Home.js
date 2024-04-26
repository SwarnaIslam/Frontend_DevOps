import React from "react";
import { json } from "react-router-dom";

const Home = () => {
  const renderCarRows = async () => {
    const req = await fetch("http://localhost:9000/api/cars", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    if (data.status !== "ok") {
      alert(data.error);
    }
    const cars = data.cars;
    const carRows = [];
    for (let i = 0; i < cars.length; i += 4) {
      const row = (
        <div className="row" key={i}>
          {cars.slice(i, i + 4).map((car, index) => (
            <div className="col" key={index}>
              <div className="car-template">
                <img src={car.photo} alt={car.model} />
                <p>Model: {car.model}</p>
                <p>Type: {car.type}</p>
                <p>Price: {car.price}</p>
              </div>
            </div>
          ))}
        </div>
      );
      carRows.push(row);
    }
    return carRows;
  };
  return <div>{renderCarRows()}</div>;
};

export default Home;
