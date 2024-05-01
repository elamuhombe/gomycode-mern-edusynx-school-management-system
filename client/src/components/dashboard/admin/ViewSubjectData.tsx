import React, { useState, useEffect } from "react";
import useSubmitForm from "../../../hooks/useSubmitForm";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { ISubject } from "../../../types";

// import { useGlobalState } from "../../../hooks/useGlobalContext";
import Swal from "sweetalert2";

const ViewSubjectData: React.FC = () => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const [editedSubject, setEditedSubject] = useState<ISubject | null>(null);
  const { submitForm } = useSubmitForm();

  // const {
  //   state: { loggedInUser },
  // } = useGlobalState(); //Get loggedInUser from global state

  // Fetch subjects data from the server
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const path = `${import.meta.env.VITE_API_URL}/subject/`;
      const method = "GET";
      try {
        const result = await submitForm(path, method, {});
        setSubjects(
          result.filter((subject: ISubject) => {
            return subject;
          })
        );
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch subject data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (subjectId: string) => {
    // Display confirmation dialog before deletion
    const confirmResult = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You are about to delete this subject. This action cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    // If user confirms deletion
    if (confirmResult.isConfirmed) {
      try {
        setLoading(true);
        // Filter out the subject to be deleted from the local state
        const updatedSubjects = subjects.filter(
          (subject) => subject._id !== subjectId
        );
        setSubjects(updatedSubjects);

        // Send a DELETE request to the server to delete the subject
        const path = `${import.meta.env.VITE_API_URL}/subject/${subjectId}`;
        const method = "DELETE";
        await submitForm(path, method, {});

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Subject with ID ${subjectId} deleted successfully!`,
        });

        console.log(`Subject with ID ${subjectId} deleted successfully.`);
      } catch (error) {
        console.error("Error deleting subject:", error);
        // Handle error deleting subject
        setError("Failed to delete subject. Please try again.");

        // Show error message
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete subject. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // Function to handle editing of subjects
  const handleEditSubjects = (subject: ISubject) => {
    setEditingSubjectId(subject._id);
    setEditedSubject(subject);
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      const updatedSubject = subjects.map((subject) => {
        if (subject._id === editingSubjectId) {
          return { ...subject, ...editedSubject };
        }
        return subject;
      });
      setSubjects(updatedSubject);
      setEditingSubjectId(null);
      setEditedSubject(null);

      // Save the edited subject data to the server
      const path = `${import.meta.env.VITE_API_URL}/subject/${editingSubjectId}`;
      const method = "PUT";
      await submitForm(path, method, editedSubject);

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Subject data saved successfully!",
      });
    } catch (error) {
      // Handle error saving edited subject data
      setError("Failed to save edited subject data. Please try again.");

      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save edited subject data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 ml-8">
      <h1 className="text-xl font-bold mb-4">Subject Data</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table-auto border-collapse border">
          <thead>
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2 border-r">Subject Name</th>
              <th className="px-4 py-2 border-r">Department</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  {editingSubjectId === subject._id ? (
                    <input
                      type="text"
                      value={editedSubject?.subject_name || ""}
                      onChange={(e) =>
                        setEditedSubject({
                          ...editedSubject!,
                          subject_name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    subject.subject_name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingSubjectId === subject._id ? (
                    <input
                      type="text"
                      value={editedSubject?.department || ""}
                      onChange={(e) =>
                        setEditedSubject({
                          ...editedSubject!,
                          department: e.target.value,
                        })
                      }
                    />
                  ) : (
                    subject.department
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingSubjectId === subject._id ? (
                    <button
                      onClick={handleSaveEdit}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditSubjects(subject)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <AiOutlineEdit />
                    </button>
                  )}
                  <button
                    onClick={() => subject._id && handleDelete(subject._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewSubjectData;
