import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  
  const [apiFetched, setApiFetched] = useState(false);

  
  const addUser = async (newUser) => {
  
  if (!apiFetched) {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers([newUser, ...res.data]);
      setApiFetched(true);
    } catch (error) {
      console.error("Error fetching users", error);
      setUsers([newUser]); 
    }
  } else {
    
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  }
};

const fetchUsers = async () => {
  if (apiFetched) return;
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    setUsers(res.data);
    setApiFetched(true); 
  } catch (error) {
    console.error("Error fetching users", error);
  }
};

  
  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <UserContext.Provider
      value={{ users, fetchUsers, addUser, updateUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
