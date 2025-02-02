import React from "react";

interface SelectedZipCodesProps {
  selectedZipCodes: string[];
  onRemoveZipCode: (zip: string) => void;
}

const SelectedZipCodes: React.FC<SelectedZipCodesProps> = ({
  selectedZipCodes,
  onRemoveZipCode,
}) => {
  if (selectedZipCodes.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="text-sm text-gray-600">Filtered by:</span>
      {selectedZipCodes.map((zip) => (
        <button
          key={zip}
          onClick={() => onRemoveZipCode(zip)}
          className="px-3 py-1 rounded-full text-sm bg-blue-500 text-white"
        >
          {zip} ×
        </button>
      ))}
    </div>
  );
};

export default SelectedZipCodes;
