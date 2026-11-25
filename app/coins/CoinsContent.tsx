import { fetcher } from '@/lib/CoinGecko.actions'
import DataTable from '@/components/DataTable'
import { CategorySkeleton } from '@/components/skeletons'
import { cn, formatCurrency, formatPercentage } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import CoinsPagination from '@/components/CoinsPagination'

interface CoinsContentProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

const CoinsContent = async ({ searchParams }: CoinsContentProps) => {
  const { page } = await searchParams

  const currentPage = Number(page) || 1
  const perPage = 10

  let coins
  try {
    coins = await fetcher<CoinMarketData[]>('/coins/markets', {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page: currentPage,
      sparkline: 'false',
      price_change_percentage: '24h',
    })
  } catch (error) {
    console.error('Error fetching categories', error)
    return <CategorySkeleton />
  }

  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: 'Rank',
      cellClassName: 'rank-cell',
      cell: coin => (
        <>
          #{coin.market_cap_rank}
          <Link href={`/coins/${coin.id}`} aria-label='View coin' />
        </>
      ),
    },
    {
      header: 'Token',
      cellClassName: 'token-cell',
      cell: coin => (
        <div className='token-info'>
          <Image src={coin.image} alt={coin.name} width={36} height={36} />
          <p>
            {coin.name} ({coin.symbol.toUpperCase()})
          </p>
        </div>
      ),
    },

    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: coin => formatCurrency(coin.current_price),
    },
    {
      header: '24 Hour Change',
      cellClassName: 'change-header-cell',
      cell: coin => {
        const item = coin.price_change_24h
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
              {formatPercentage(coin.price_change_24h)}
            </p>
          </div>
        )
      },
    },
    {
      header: 'Market Cap',
      cellClassName: 'market-cap-cell',
      cell: coin => formatCurrency(coin.market_cap),
    },
  ]

  const hasMorePages = coins.length === perPage

  const estimatedTotalPages = currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100

  return (
    <main id='coins-page'>
      <div className='content'>
        <h3>All Coins</h3>

        <DataTable
          columns={columns}
          data={coins?.splice(0, 10)}
          rowKey={coin => coin.id}
          tableClassName='coin-table'
        />

        <CoinsPagination
          currentPage={currentPage}
          totalPages={estimatedTotalPages}
          hasMorePages={hasMorePages}
        />
      </div>
    </main>
  )
}

export default CoinsContent
