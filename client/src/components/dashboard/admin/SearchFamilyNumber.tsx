import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import AddStudentForm from "./AddStudentForm";

const SearchFamilyNumber = () => {
  const [familyNumber, setFamilyNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [found, setFound] = useState<boolean>(false);
  const [guardianData, setGuardianData] = useState<any>(null); // Assuming any format for simplicity

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5100/guardian?familyNumber=${familyNumber}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data && data.length > 0) {
        const foundGuardian = data[0];
        if (foundGuardian.familyNumber === familyNumber) {
          setFound(true);
          setGuardianData(foundGuardian);
          setError(null);
        } else {
          setFound(false);
          setError("Entered family number does not match the one in the database");
        }
      } else {
        setFound(false);
        setError("No family number found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data");
    }
  };

  const displayAddStudentForm = () => {
    if (found && guardianData) {
      return (
        <div>
          <p className="font-bold text-blue">Guardian:<span className="font-normal"> {guardianData.name}</span></p>
          <p className="font-bold">Family Number: <span className="font-normal">{guardianData.familyNumber}</span></p>
          {/* AddStudentForm component */}
          <AddStudentForm familyNumber={0} />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter family number"
        value={familyNumber || ""}
        onChange={(e) => setFamilyNumber(parseInt(e.target.value))}
      />
      <button onClick={handleSearch} style={{ background: "none", border: "none", cursor: "pointer" }}>
        <FaSearch />
      </button>
      {error && <div>{error}</div>}
      {displayAddStudentForm()}
    </div>
  );
};

export default SearchFamilyNumber;
