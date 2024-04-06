import React, { useState } from "react";
import SearchBar from "../../components/dashboard/shared/SearchBar"; // Assuming SearchBar.tsx is in the same directory
import LeftMenu from "../../components/dashboard/shared/LeftMenu";
import Topbar from "../../components/shared/Topbar";
import Pagination from "../../components/pagination/Pagination";
import BackButton from "../../components/BackButton";

// Sample student data
const students = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Michael Johnson" },
  { id: 4, name: "Emily Davis" },
  { id: 5, name: "William Wilson" },
  { id: 6, name: "Olivia Brown" },
  { id: 7, name: "James Jones" },
  { id: 8, name: "Emma Taylor" },
  { id: 9, name: "Alexander Martinez" },
  { id: 10, name: "Sophia Anderson" },
  { id: 11, name: "Daniel Thomas" },
  { id: 12, name: "Madison Lee" },
  { id: 13, name: "Joseph White" },
  { id: 14, name: "Chloe Harris" },
  { id: 15, name: "Samuel Martin" },
  { id: 16, name: "Ella Jackson" },
  { id: 17, name: "Benjamin Moore" },
  { id: 18, name: "Avery Clark" },
  { id: 19, name: "Gabriel Thompson" },
  { id: 20, name: "Mia Lewis" },
  { id: 21, name: "Henry Hill" },
  { id: 22, name: "Lily Hall" },
  { id: 23, name: "Jackson Walker" },
  { id: 24, name: "Abigail Green" },
  { id: 25, name: "Matthew Adams" },
  { id: 26, name: "Charlotte Nelson" },
  { id: 27, name: "David Baker" },
  { id: 28, name: "Ava Carter" },
  { id: 29, name: "Andrew Perez" },
  { id: 30, name: "Scarlett Rivera" },
];

// ViewStudents component
const ViewStudents: React.FC = () => {
  const [searchResults, setSearchResults] = useState(students); // Initialize with all students
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Change this according to your needs

  // Function to handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update search query state
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredStudents);
    setCurrentPage(1); // Reset to first page when performing a new search
  };

  // Function to clear search data and display all data
  const handleClearSearch = () => {
    setSearchQuery(""); // Clear search query state
    setSearchResults(students);
    setCurrentPage(1); // Reset to first page when clearing search
    console.log('cleared')
  };

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index of the first and last items on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className="top-0 z-0">
        <Topbar title="View Students" />
      </div>

      <div className="flex">
        <LeftMenu />
        <div className="ml-48 mb-20">
          <BackButton />
        </div>
        <div className="flex flex-col ml-48 items-center">
          {" "}
          {/* Center the search items */}
          <SearchBar
            onClear={handleClearSearch}
            onSearch={handleSearch}
          />
          {/** <button onClick={handleClearSearch} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> 
            Clear Search
          </button>
  **/}
          <h2 className="mt-4">Search Results</h2>
          <table className="table-auto border-collapse border border-gray-500 mt-2">
            <thead>
              <tr>
                <th className="border border-gray-500 px-4 py-2">ID</th>
                <th className="border border-gray-500 px-4 py-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((student) => (
                <tr key={student.id}>
                  <td className="border border-gray-500 px-4 py-2">
                    {student.id}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {student.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(searchResults.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewStudents;
