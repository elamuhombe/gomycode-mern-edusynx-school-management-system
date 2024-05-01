import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    event.preventDefault()
    onPageChange(page);
  };

  return (
    <nav className="mt-4">
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </nav>
  );
};

export default Pagination;
