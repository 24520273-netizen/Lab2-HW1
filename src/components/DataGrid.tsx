import { useId, useState } from 'react';

export interface ColumnDef<T> {
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
}

export interface DataGridProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowSelect?: (item: T) => void;
  ariaLabel: string;
}

type SortDirection = 'asc' | 'desc';

interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

const PAGE_SIZE = 3;

function getRowKey<T>(item: T, rowIndex: number): string | number {
  if (typeof item === 'object' && item !== null && 'id' in item) {
    const id = (item as { id?: unknown }).id;

    if (typeof id === 'string' || typeof id === 'number') {
      return id;
    }
  }

  return rowIndex;
}

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value);
}

function compareValues(
  firstValue: unknown,
  secondValue: unknown,
): number {
  if (
    typeof firstValue === 'number' &&
    typeof secondValue === 'number'
  ) {
    return firstValue - secondValue;
  }

  return String(firstValue).localeCompare(String(secondValue));
}

export function DataGrid<T>({
  data,
  columns,
  ariaLabel,
}: DataGridProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const filterInputId = useId();

  const handleSort = (column: ColumnDef<T>) => {
    if (!column.sortable) {
      return;
    }

    setSortConfig((currentSort) => {
      if (currentSort?.key === column.accessorKey) {
        return {
          key: column.accessorKey,
          direction:
            currentSort.direction === 'asc' ? 'desc' : 'asc',
        };
      }

      return {
        key: column.accessorKey,
        direction: 'asc',
      };
    });
  };

  const handleFilterChange = (value: string) => {
    setFilterQuery(value);
    setCurrentPage(1);
  };

  const normalizedFilterQuery = filterQuery.trim().toLowerCase();

  const filteredData = normalizedFilterQuery
    ? data.filter((item) =>
        columns.some((column) => {
          const value = item[column.accessorKey];

          return formatCellValue(value)
            .toLowerCase()
            .includes(normalizedFilterQuery);
        }),
      )
    : data;

  const sortedData = sortConfig
    ? [...filteredData].sort((firstItem, secondItem) => {
        const firstValue = firstItem[sortConfig.key];
        const secondValue = secondItem[sortConfig.key];

        const comparison = compareValues(firstValue, secondValue);

        return sortConfig.direction === 'asc'
          ? comparison
          : -comparison;
      })
    : filteredData;

  const totalPages = Math.max(
    1,
    Math.ceil(sortedData.length / PAGE_SIZE),
  );

  const pageStartIndex = (currentPage - 1) * PAGE_SIZE;

  const paginatedData = sortedData.slice(
    pageStartIndex,
    pageStartIndex + PAGE_SIZE,
  );

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  return (
    <>
      <section className="data-grid-filter">
        <label htmlFor={filterInputId}>
          Filter data
        </label>

        <input
          id={filterInputId}
          type="search"
          value={filterQuery}
          onChange={(event) => handleFilterChange(event.target.value)}
          placeholder="Search data"
        />
      </section>

      <table className="data-grid" aria-label={ariaLabel}>
        <thead>
          <tr>
            {columns.map((column) => {
              const isSorted =
                sortConfig?.key === column.accessorKey;

              const ariaSort = isSorted
                ? sortConfig.direction === 'asc'
                  ? 'ascending'
                  : 'descending'
                : undefined;

              const sortIndicator = isSorted
                ? sortConfig.direction === 'asc'
                  ? ' ↑'
                  : ' ↓'
                : '';

              return (
                <th
                  key={String(column.accessorKey)}
                  scope="col"
                  aria-sort={ariaSort}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className="sort-button"
                      onClick={() => handleSort(column)}
                      aria-label={`Sort by ${column.header}`}
                    >
                      {column.header}
                      <span aria-hidden="true">
                        {sortIndicator}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, rowIndex) => (
              <tr key={getRowKey(item, rowIndex)}>
                {columns.map((column) => (
                  <td key={String(column.accessorKey)}>
                    {formatCellValue(item[column.accessorKey])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>
                No matching results.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <nav
        className="data-grid-pagination"
        aria-label="Data grid pagination"
      >
        <button
          type="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <p>
          Page {currentPage} of {totalPages}
        </p>

        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </nav>
    </>
  );
}