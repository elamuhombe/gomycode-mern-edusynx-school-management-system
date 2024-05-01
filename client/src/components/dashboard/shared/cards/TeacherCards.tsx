import React, { useEffect, useState } from "react";

const TeacherCards: React.FC = () => {
  const [teachers, setTeachers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make GET request to fetch all teachers
        const response = await fetch(`${import.meta.env.VITE_API_URL}/teacher`);

        // Check if request was not successful
        if (!response.ok) {
          setError("Failed to fetch guardians");
          return;
        }

        // Parse response data
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        // Handle any errors
        setError("Error fetching teachers:");
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const description = teachers.length;

  return (
    <div>
      {/* Render the number of guardians */}
      <p>{description}</p>
    </div>
  );
};

export default TeacherCards;
