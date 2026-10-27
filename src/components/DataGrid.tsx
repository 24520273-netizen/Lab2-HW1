import { useState } from 'react';

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

  const sortedData = sortConfig
    ? [...data].sort((firstItem, secondItem) => {
        const firstValue = firstItem[sortConfig.key];
        const secondValue = secondItem[sortConfig.key];

        const comparison = compareValues(firstValue, secondValue);

        return sortConfig.direction === 'asc'
          ? comparison
          : -comparison;
      })
    : data;

  return (
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
        {sortedData.map((item, rowIndex) => (
          <tr key={getRowKey(item, rowIndex)}>
            {columns.map((column) => (
              <td key={String(column.accessorKey)}>
                {formatCellValue(item[column.accessorKey])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}