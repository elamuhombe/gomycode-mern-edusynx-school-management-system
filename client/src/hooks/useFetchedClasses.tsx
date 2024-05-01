import { useState, useEffect } from "react";
import { IClass } from "../types";

const useFetchedClasses = () => {
  const [classList, setClassList] = useState<IClass[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/class`); // Adjust the URL based on your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }
        const data = await response.json();
        setClassList(data.classes); // Assuming the response contains an array of class names
      } catch (error) {
        console.error("Error fetching classes:", error);
        setError("Failed to fetch classes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return { classList, setClassList, loading, setLoading, error, setError };
};

export default useFetchedClasses;
