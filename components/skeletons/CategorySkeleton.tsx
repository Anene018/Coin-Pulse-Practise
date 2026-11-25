import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

const CategorySkeleton = () => {
  return (
    <div id='categories-fallback' className='custom-scrollbar'>
      <h4>Top Categories</h4>
      <Table className='custom-scrollbar mt-3'>
        <TableHeader>
          <TableRow className='hover:bg-transparent!'>
            <TableHead className='bg-dark-400 py-4 text-purple-100 first:pl-5 last:pr-5'>
              Category
            </TableHead>
            <TableHead className='bg-dark-400 py-4 text-purple-100 first:pl-5 last:pr-5'>
              Top Gainers
            </TableHead>
            <TableHead className='bg-dark-400 py-4 text-purple-100 first:pl-5 last:pr-5'>
              24 Hour Change
            </TableHead>
            <TableHead className='bg-dark-400 py-4 text-purple-100 first:pl-5 last:pr-5'>
              Market Cap
            </TableHead>
            <TableHead className='bg-dark-400 py-4 text-purple-100 first:pl-5 last:pr-5'>
              24h Volume
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow
              key={index}
              className='hover:bg-dark-400/30! relative overflow-hidden rounded-lg border-b border-purple-100/5'
            >
              <TableCell className='category-cell py-4 first:pl-5 last:pr-5'>
                <Skeleton className='category-skeleton' />
              </TableCell>
              <TableCell className='top-gainers-cell py-4 first:pl-5 last:pr-5'>
                <div className='flex gap-1'>
                  <Skeleton className='coin-skeleton' />
                  <Skeleton className='coin-skeleton' />
                  <Skeleton className='coin-skeleton' />
                </div>
              </TableCell>
              <TableCell className='change-header-cell py-4 first:pl-5 last:pr-5'>
                <div className='change-cell'>
                  <Skeleton className='change-icon' />
                  <Skeleton className='value-skeleton-sm' />
                </div>
              </TableCell>
              <TableCell className='market-cap-cell py-4 first:pl-5 last:pr-5'>
                <Skeleton className='value-skeleton-lg' />
              </TableCell>
              <TableCell className='volume-cell py-4 first:pl-5 last:pr-5'>
                <Skeleton className='value-skeleton-md' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { CategorySkeleton }
export default CategorySkeleton
