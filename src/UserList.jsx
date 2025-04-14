import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";

function UserList() {
  const { users, updateUser, deleteUser, fetchUsers } = useContext(UserContext);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    username: "",
    email: "",
  });

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const startEditing = (user) => {
    setEditingId(user.id);
    setEditForm({
      name: user.name,
      username: user.username,
      email: user.email,
    });
  };

  const handleUpdate = (id) => {
    updateUser({ id, ...editForm });
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-[var(--accent)] rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-[black] mb-4">User List</h2>
      <button
        className="buttons mb-4"
        onClick={fetchUsers}
      >
        Fetch Data
      </button>
      {users.length === 0 ? ( 
        <p className="text-gray-600">No data is shown. Click on "Fetch Data" to display users.</p>
      ) : (
        <ol className="ml-2 space-y-4">
          {users.map((user, index) => (
            <li key={user.id}>
              <div className="flex items-center justify-between bg-[var(--highlight)] p-4 rounded shadow">
                <div className="w-1/12 text-left font-semibold">{index + 1}.</div>
                <div className="w-7/12 text-center">
                  {editingId === user.id ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="inputs mb-1 w-full"
                      />
                      <input
                        type="text"
                        name="username"
                        value={editForm.username}
                        onChange={handleEditChange}
                        className="inputs mb-1 w-full"
                      />
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        className="inputs mb-1 w-full"
                      />
                    </>
                  ) : (
                    <span className="block">
                      {user.name} - {user.username} - {user.email}
                    </span>
                  )}
                </div>
                <div className="w-4/12 text-right space-x-2">
                  {editingId === user.id ? (
                    <>
                      <button
                        className="buttons"
                        onClick={() => handleUpdate(user.id)}
                      >
                        Update
                      </button>
                      <button
                        className="buttons bg-gray-400 hover:bg-gray-500"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="buttons bg-[#60B5FF] hover:bg-blue-500"
                        onClick={() => startEditing(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="buttons bg-red-500 hover:bg-red-600"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default UserList;
