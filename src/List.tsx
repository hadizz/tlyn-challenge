import { DataTable } from '@/components/data-table/data-table'
import { useTableState } from '@/hooks/useTableState'
import { useMemo } from 'react'
const mock = [
  {
    id: 1,
    purchaseDate: 1617235200000,
    purchaseAmount: '1000000',
    goldPrice: '500000',
    goldWeight: '10',
  },
  {
    id: 2,
    purchaseDate: 1619827200000,
    purchaseAmount: '2000000',
    goldPrice: '600000',
    goldWeight: '20',
  },
]

const PaymentPage = () => {
  const { columnFilters, pagination, onColumnFiltersChange, onPaginationChange } =
    useTableState({
    })

  const columns: any[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'شناسه',
      },
      {
        accessorKey: 'purchaseDate',
        header: 'تاریخ خرید',
      },
      {
        accessorKey: 'purchaseAmount',
        header: 'مبلغ خرید',
      },
      {
        accessorKey: 'goldPrice',
        header: 'قیمت طلا',
      },
      {
        accessorKey: 'goldWeight',
        header: 'وزن طلا',
      },
    ],
    []
  )

  const queryParams = useMemo(
    () => ({
      search: columnFilters.find((f) => f.id === 'description')?.value as string | undefined,
      type: columnFilters.find((f) => f.id === 'type')?.value as string[] | undefined,
      status: columnFilters.find((f) => f.id === 'status')?.value as string[] | undefined,
      page: pagination.pageIndex,
      limit: pagination.pageSize,
    }),
    [columnFilters, pagination]
  )




  return (
    <div className="flex flex-col gap-4">
      <DataTable
        loading={false}
        columns={columns}
        data={mock}
        columnFilters={columnFilters}
        pagination={pagination}
        pageCount={1}
        onColumnFiltersChange={onColumnFiltersChange}
        onPaginationChange={onPaginationChange}
        filterableColumns={[]}
        searchableColumns={[]}
      />
    </div>
  )
}

export default PaymentPage
