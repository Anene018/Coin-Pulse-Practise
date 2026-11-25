import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

const TrendingCoinsSkeleton = () => {
  return (
    <div id='trending-coins-fallback'>
      <h4>Trending Coins</h4>
      <Table className='custom-scrollbar trending-coins-table'>
        <TableHeader>
          <TableRow className='hover:bg-transparent!'>
            <TableHead className='bg-dark-400 py-4 text-purple-100 first:pl-5 last:pr-5'>
              Name
            </TableHead>
            <TableHead className='bg-dark-400 py-4 text-purple-100 first:pl-5 last:pr-5'>
              24 hour change
            </TableHead>
            <TableHead className='bg-dark-400 py-4 text-purple-100 first:pl-5 last:pr-5'>
              Price
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 6 }).map((_, index) => (
            <TableRow
              key={index}
              className='hover:bg-dark-400/30! relative overflow-hidden rounded-lg border-b border-purple-100/5'
            >
              <TableCell className='name-cell py-4 first:pl-5 last:pr-5'>
                <div className='name-link'>
                  <Skeleton className='name-image' />
                  <Skeleton className='name-line' />
                </div>
              </TableCell>
              <TableCell className='change-cell py-4 first:pl-5 last:pr-5'>
                <div className='price-change'>
                  <Skeleton className='change-icon' />
                  <Skeleton className='change-line' />
                </div>
              </TableCell>
              <TableCell className='price-cell py-4 first:pl-5 last:pr-5'>
                <Skeleton className='price-line' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { TrendingCoinsSkeleton }
export default TrendingCoinsSkeleton
