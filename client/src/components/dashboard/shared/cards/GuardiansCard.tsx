import React, { useEffect, useState } from 'react';

const GuardiansCards: React.FC = () => {
  const [guardians, setGuardians] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make GET request to fetch all guardians
        const response = await fetch('http://localhost:5100/guardian');

        // Check if request was not successful
        if (!response.ok) {
          setError('Failed to fetch guardians');
          return;
        }

        // Parse response data
        const data = await response.json();
        setGuardians(data);
      } catch (error) {
        // Handle any errors
        setError('Error fetching guardians:');
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
 
  const description = guardians.length

  return (
    <div>
      {/* Render the number of guardians */}
      <p>{description}</p>
    </div>
  );
};

export default GuardiansCards;
