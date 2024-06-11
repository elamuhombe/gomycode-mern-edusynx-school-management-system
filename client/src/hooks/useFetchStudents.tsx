import { useState, useEffect } from 'react';

const useFetchStudents = () => {
  const [studentsByClass, setStudentsByClass] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch students data from the API
        const response = await fetch(`${import.meta.env.VITE_API_URL}/student/populated`);
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        // Organize students by class
        const studentsByClassObject: { [key: string]: any[] } = {};
        data.forEach((student: any) => {
          if (!studentsByClassObject[student.clas.className]) {
            studentsByClassObject[student.clas.className] = [];
          }
          studentsByClassObject[student.clas.className].push(student);
        });
        setStudentsByClass(studentsByClassObject);
      } catch (error) {
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { studentsByClass, loading, setLoading, setError, error, setStudentsByClass };
};

export default useFetchStudents;
