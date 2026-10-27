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

export function DataGrid<T>({
  data,
  columns,
  ariaLabel,
}: DataGridProps<T>) {
  return (
    <table className="data-grid" aria-label={ariaLabel}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.accessorKey)} scope="col">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item, rowIndex) => (
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