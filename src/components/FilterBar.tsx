import React from "react";
import { Filter } from "../components";

const FilterBar: React.FC = () => {
  return (
    <div className="bg-gray-200 ">
      <div className="max-w-7xl mx-auto">
        <Filter />
      </div>
    </div>
  );
};

export default FilterBar;
