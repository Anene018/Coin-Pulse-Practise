import { fetcher } from '@/lib/CoinGecko.actions'
import DataTable from '../DataTable'
import { CategorySkeleton } from '../skeletons'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'

const Category = async () => {
  let categories

  try {
    categories = await fetcher<Category[]>('/coins/categories')
  } catch (error) {
    console.error('Error fetching categories', error)
    return <CategorySkeleton />
  }

  const columns: DataTableColumn<Category>[] = [
    {
      header: 'Category',
      cellClassName: 'category-cell',
      cell: category => category.name,
    },
    {
      header: 'Top Gainers',
      cellClassName: 'top-gainers-cell',
      cell: category =>
        category.top_3_coins.map(item => (
          <Image src={item} alt={item} width={28} height={28} key={item} />
        )),
    },
    {
      header: '24 Hour Change',
      cellClassName: 'change-header-cell',
      cell: category => {
        const item = category.market_cap_change_24h
        const isTrendingUp = item > 0
        return (
          <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
            <p>
              {isTrendingUp ? (
                <TrendingUp width={16} height={16} />
              ) : (
                <TrendingDown width={16} height={16} />
              )}
            </p>
            <p className='flex items-center'>
              {isTrendingUp ? '+' : ''}
              {formatPercentage(category.market_cap_change_24h)}
            </p>
          </div>
        )
      },
    },
    {
      header: 'Market Cap',
      cellClassName: 'market-cap-cell',
      cell: category => formatCurrency(category.market_cap),
    },
    {
      header: '24h Volume',
      cellClassName: 'volume-cell',
      cell: category => formatCurrency(category.volume_24h),
    },
  ]

  return (
    <div id='categories' className='custom-scrollbar'>
      <h4>Top Categories</h4>

      <DataTable
        columns={columns}
        data={categories?.splice(0, 10)}
        rowKey={(_, index) => index}
        tableClassName='mt-3'
      />
    </div>
  )
}

export default Category
