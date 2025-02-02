import React from "react";

interface PaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalDogs: number;
    pageSize: number;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    onPageChange,
    totalDogs,
    pageSize,
}) => {
    // Calculate total pages
    const totalPages = Math.ceil(totalDogs / pageSize);

    if (totalPages <= 1) return null; // Hide pagination if there's only one page

    const pagesArray = Array.from({length: totalPages}, (_, i) => i + 1);

    return (
        <div className="flex justify-center mt-6 items-center space-x-2 overflow-x-auto px-4 p-11">
            {/* Previous Button */}
            <button
                className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ←
            </button>

            {/* Page Numbers */}
            {pagesArray.map((page, index) => {
                const isCurrent = currentPage === page;
                // decide if you want to hide some page buttons
                const shouldShow =
                    Math.abs(currentPage - page) <= 2 ||
                    page === 1 ||
                    page === totalPages;

                if (shouldShow) {
                    return (
                        <button
                            key={page}
                            className={`px-4 py-2 border rounded ${isCurrent
                                    ? "bg-blue-500 text-white font-bold"
                                    : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    );
                }

                // Insert ellipses between page blocks
                // For example, if i === 1 or i === totalPages-2, show '...'
                if (
                    index === 1 ||
                    index === totalPages - 2
                ) {
                    return (
                        <span key={page} className="px-2 text-gray-400">
                            ...
                        </span>
                    );
                }

                return null;
            })}


            <button
                className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                →
            </button>
        </div>
    );
};

export default Pagination;
