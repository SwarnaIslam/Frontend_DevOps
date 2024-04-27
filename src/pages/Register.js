import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigation = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch(
      "https://api.projectsbd.me/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      }
    );
    const data = await response.json();
    if (data.status === "ok") {
      navigation("/login");
    }
  }
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          placeholder="Phone number"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
