import React from "react";
import Header from "./Header";
import "./App.css";
import AddUsers from "./AddUsers";
import UserList from "./UserList";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <div className="app-container flex flex-col items-center text-center bg-[var(--secondary)] min-h-screen p-4">
        <Header />
        <AddUsers />
        <UserList />
      </div>
    </UserProvider>
  );
}

export default App;
