import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

function AddUsers() {
  const { addUser } = useContext(UserContext);
  const [peopleData, setPeopleData] = useState({
    name: "",
    username: "",
    email: "",
  });

  const addData = (e) => {
    setPeopleData({
      ...peopleData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        peopleData
      );  console.log("Response from API:", res);
      const newUser = { ...res.data, id: Date.now() };
       console.log("Adding new user:", newUser);
      addUser(newUser); 
      window.location.reload();

      setPeopleData({ name: "", username: "", email: "" });
    } catch (error) {
      console.error("Error Adding User", error);
    }
  };

  return (
    <div className="container max-w-md mx-auto p-6 bg-[var(--accent)] rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold  mb-4">Add New User</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <label className="text-md font-semibold text-left">Name: </label>
        <input
          type="text"
          name="name"
          value={peopleData.name}
          onChange={addData} 
          required placeholder="Name"
          className="inputs w-full"
        />
        <br />
        <label className="text-md font-semibold text-left">UserName: </label>
        <input
          type="text"
          name="username"
          value={peopleData.username}
          onChange={addData} placeholder="Username"
          required  className="inputs w-full"
        />
        <br />
        <label className="text-md font-semibold text-left">Email: </label>
        <input
          type="email"
          name="email"
          value={peopleData.email}
          onChange={addData} placeholder="Email"
          required  className="inputs w-full"
        />
        <br />
        <button type="submit" className="buttons ">SUBMIT</button>
      </form>
    </div>
  );
}

export default AddUsers;
