import React from "react";
import { Left, Right } from "../../components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}) => {
  return (
    <div className="flex justify-center items-center my-4 ">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`p-2 rounded-l-full border font-bold ${
          currentPage === 1
            ? "cursor-not-allowed bg-gray-300 text-gray-400"
            : "bg-white hover:bg-gray-200 text-black"
        }`}
      >
        <Left
          className={`${currentPage === 1 ? "text-gray-400" : "text-black"}`}
        />
      </button>
      <span className="border p-2 px-4 font-semibold">
        Página {currentPage}
      </span>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-r-full border font-bold ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-gray-300 text-gray-400"
            : "bg-white hover:bg-gray-200 text-black"
        }`}
      >
        <Right
          className={`${
            currentPage === totalPages ? "text-gray-400" : "text-black"
          }`}
        />
      </button>
    </div>
  );
};

export default Pagination;
