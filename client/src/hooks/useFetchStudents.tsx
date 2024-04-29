import { useState, useEffect } from "react";
import useSubmitForm from "./useSubmitForm"
import { IStudent } from "../types";

const useFetchStudents = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { submitForm } = useSubmitForm(); // Assuming you have a custom hook for form submission

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const path = "http://localhost:5100/student/";
      const method = "GET";
      try {
        const result = await submitForm(path, method, {});
        setStudents(result);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch student data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Fetch data only once when the component mounts

  return { students, loading, error, setLoading, setStudents, setError };
};

export default useFetchStudents;
