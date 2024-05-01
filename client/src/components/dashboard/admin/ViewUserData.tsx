import React, { useState, useEffect } from "react";
import useSubmitForm from "../../../hooks/useSubmitForm";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { IUser } from "../../../types";
import AddStudentForm from "./AddStudentForm";
import { useGlobalState } from "../../../hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";

const ViewUserData: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<string>("");
  const [showAddStudentForm, setShowAddStudentForm] = useState<boolean>(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<IUser | null>(null);

  const { submitForm } = useSubmitForm();
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const {
    state: { loggedInUser },
  } = useGlobalState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const path = `${import.meta.env.VITE_API_URL}/user/`;
      const method = "GET";
      try {
        const result = await submitForm(path, method, {});
        setUsers(
          result.filter((user: IUser) => {
            if ((loggedInUser?.role as string) === "enrollmentOfficer")
              return user.role === "guardian";
            return user;
          })
        );
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch student data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId: string) => {
    try {
      setLoading(true);
      // Filter out the user to be deleted from the local state
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);

      // Send a DELETE request to the server to delete the user
      const path = `${import.meta.env.VITE_API_URL}/user/${userId}`;
      const method = "DELETE";
      await submitForm(path, method, {});

      console.log(`User with ID ${userId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error deleting user
      setError("Failed to delete user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const roles = Array.from(new Set(users.map((user) => user.role)));

  const handleEditUser = (user: IUser) => {
    setEditingUserId(user._id);
    setEditedUser(user);
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      const updatedUsers = users.map((user) => {
        if (user._id === editingUserId) {
          return { ...user, ...editedUser };
        }
        return user;
      });
      setUsers(updatedUsers);
      setEditingUserId(null);
      setEditedUser(null);

      // Add logic to save the edited user data to the server
      const path = `${import.meta.env.VITE_API_URL}/user/${editingUserId}`;
      const method = "PUT";
      await submitForm(path, method, editedUser);
    } catch (error) {
      console.error("Error saving edited user:", error);
      // Handle error saving edited user data
      setError("Failed to save edited user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAddStudentForm = () => {
    setShowAddStudentForm(false);
  };

  return (
    <div className="mt-16 ml-8">
      <h1 className="text-xl font-bold mb-4">Users Data</h1>
      <div className="mb-4">
        <label htmlFor="filterRole" className="mr-2">
          Filter by Role:
        </label>
        <select
          id="filterRole"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border rounded px-2 py-1">
          <option value="">All Roles</option>
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table-auto border-collapse border">
          <thead>
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2 border-r">First Name</th>
              <th className="px-4 py-2 border-r">Last Name</th>
              <th className="px-4 py-2 border-r">Gender</th>
              <th className="px-4 py-2 border-r">Role</th>
              <th className="px-4 py-2 border-r">Email</th>
              <th className="px-4 py-2 border-r">Edit</th>
              <th className="px-4 py-2 border-r">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map(
              (user, index) =>
                (!filterRole || user.role === filterRole) && (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                      {editingUserId === user._id ? (
                        <input
                          type="text"
                          value={editedUser?.firstName || ""}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser!,
                              firstName: e.target.value,
                            })
                          }
                        />
                      ) : (
                        user.firstName
                      )}
                    </td>
                    <td className="border px-4 py-2">{user.lastName}</td>
                    <td className="border px-4 py-2">{user.gender}</td>
                    <td className="border px-4 py-2">
                      {user.role === "guardian" ? (
                        <button
                          onClick={() => {
                            setSelectedUser(user);

                            navigate("/add/add-student", {
                              state: { guardian: user },
                            });

                            setShowAddStudentForm(true);
                          }}
                          className="text-blue-500 hover:underline focus:outline-none">
                          {user.role}
                        </button>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">
                      {editingUserId === user._id ? (
                        <button
                          onClick={handleSaveEdit}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditUser(user)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          <AiOutlineEdit />
                        </button>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => user._id && handleDelete(user._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      )}
      {showAddStudentForm && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Add Student Form</h2>
          {showAddStudentForm && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Add Student Form</h2>
              <AddStudentForm
                onClose={handleCloseAddStudentForm}
                familyNumber={0}
                guardians={[]}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewUserData;
