import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const req = await fetch("https://api.projectsbd.me/api/cars", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        const data = await req.json();
        if (data.status !== "ok") {
          throw new Error(data.error);
        }
        setCars(data.cars);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchCars();
  }, []);

  const renderCarRows = () => {
    const carRows = [];
    console.log(cars);
    for (let i = 0; i < cars.length; i += 4) {
      const row = (
        <div className="row" key={i}>
          {cars.slice(i, i + 4).map((car, index) => (
            <div className="col" key={index}>
              <div className="car-template">
                <img
                  src={"https://d3100fec1li5ro.cloudfront.net/" + car.photo}
                  alt={car.model}
                />
                <p>Model: {car.model}</p>
                <p>Type: {car.type}</p>
                <p>Price: {car.price}</p>
                <p>Contact:{car.owner.phone}</p>
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
