import React from "react";
import Select from "@/components/Select";

interface FilterBarProps {
  breeds: string[];
  selectedBreed: string | undefined;
  setSelectedBreed: (breed: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  favoritesCount: number;
  onViewFavorites: () => void;
  onFindMatch: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  breeds,
  selectedBreed,
  setSelectedBreed,
  sortOrder,
  setSortOrder,
  favoritesCount,
  onViewFavorites,
  onFindMatch,
}) => {
  return (
    <div className="flex gap-4 mb-4 py-10">
      <Select
        value={selectedBreed || ""}
        onChange={setSelectedBreed}
        options={[
          { value: "", label: "All Breeds" },
          ...breeds.map((breed) => ({ value: breed, label: breed })),
        ]}
      />

      <Select
        value={sortOrder}
        onChange={(val) => setSortOrder(val as "asc" | "desc")}
        options={[
          { value: "asc", label: "Ascending" },
          { value: "desc", label: "Descending" },
        ]}
      />

      <button
        onClick={onViewFavorites}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        View Favorites
      </button>

      <button
        onClick={onFindMatch}
        disabled={favoritesCount === 0}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Find My Match
      </button>
    </div>
  );
};

export default FilterBar;
