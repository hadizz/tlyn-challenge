import { Button } from '@/components/ui/button'
import { useDebouncedCallback } from '@/hooks/useDebounce'
import { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { useState } from 'react'
import { Input } from '../ui/input'
import { DataTableFacetedFilter } from './data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
  loading: boolean
  table: Table<TData>
  filterableColumns?: {
    id: string
    title: string
    options: {
      label: string
      value: string
    }[]
  }[]
  searchableColumns?: {
    id: string
    title: string
  }[]
}

export function DataTableToolbar<TData>({
  loading,
  table,
  filterableColumns = [],
  searchableColumns = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [searchValues, setSearchValues] = useState<Record<string, string>>({})

  const debouncedSearch = useDebouncedCallback((id: string, value: string) => {
    table.getColumn(id)?.setFilterValue(value)
  }, 500)

  const handleReset = () => {
    setSearchValues({})
    window.history.pushState({}, '', window.location.pathname)
    table.resetColumnFilters()
    table.setPagination({ pageIndex: 0, pageSize: 10 })
  }

  return (
    <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
      <div className="flex flex-1 flex-col items-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        {searchableColumns.length > 0 &&
          searchableColumns.map((column) => (
            <Input
              key={column.id}
              placeholder={`${column.title}...`}
              value={searchValues[column.id] || ''}
              onChange={(event) => {
                const newValue = event.target.value
                setSearchValues((prev) => ({ ...prev, [column.id]: newValue }))
                debouncedSearch(column.id, newValue)
              }}
              disabled={loading}
              className="h-8 w-full sm:w-[200px] lg:w-[250px]"
            />
          ))}
        {filterableColumns.length > 0 &&
          filterableColumns.map(({ id, title, options }) => (
            <DataTableFacetedFilter<TData>
              key={id}
              columnKey={id}
              title={title}
              table={table}
              options={options}
              paramName={id}
            />
          ))}
        {isFiltered && (
          <Button
            variant="ghost"
            disabled={loading}
            onClick={handleReset}
            className="h-8 px-2 lg:px-3"
          >
            Reset all
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
