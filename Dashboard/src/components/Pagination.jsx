import React from "react";
import { Pagination } from "flowbite-react";
import { useState } from "react";

const PaginationCom = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);
  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={100}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
};

export default PaginationCom;
