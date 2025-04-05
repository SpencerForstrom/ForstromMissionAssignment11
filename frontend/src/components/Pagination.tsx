interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
  }
  
  const Pagination = ({
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
    onPageSizeChange
  }: PaginationProps) => {
    return (
      <>
        {/* Pagination Buttons */}
        <div className="btn-group mb-3">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              className={`btn btn-outline-secondary ${currentPage === num + 1 ? 'active' : ''}`}
              onClick={() => onPageChange(num + 1)}
            >
              {num + 1}
            </button>
          ))}
        </div>
  
        {/* Results Per Page Selector */}
        <div className="mb-3">
          <label>
            Results per page:
            <select
              className="form-select w-auto d-inline ms-2"
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value));
                onPageChange(1); // Reset to page 1 when page size changes
              }}
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </label>
        </div>
      </>
    );
  };
  
  export default Pagination;
  