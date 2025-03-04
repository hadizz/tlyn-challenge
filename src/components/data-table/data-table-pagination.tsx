import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface DataTablePaginationProps<TData> {
  loading: boolean
  table: Table<TData>
}

export function DataTablePagination<TData>({ loading, table }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col-reverse gap-4 sm:items-center sm:justify-end md:flex-row md:justify-start">
      <div className="flex items-center justify-center space-x-2" id="pagination-rows-per-page">
        <p className="text-sm font-medium">اندازه هر صفحه</p>
        <Select
          disabled={loading}
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPagination({
              pageIndex: 0,
              pageSize: Number(value),
            })
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-center gap-2" id="pagination-page-info">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          صفحه {table.getState().pagination.pageIndex + 1} از {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || loading}
          >
            <span className="sr-only">بعدی</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage() || loading}
          >
            <span className="sr-only">آخرین صفحه</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>


          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage() || loading}
          >
            <span className="sr-only">بروزترین صفحه</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || loading}
          >
            <span className="sr-only">اخرین صفحه</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
