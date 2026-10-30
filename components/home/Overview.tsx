import { fetcher } from '@/lib/CoinGecko.actions'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'

const Overview = async () => {
  const coin = await fetcher<CoinDetailsData>('/coins/bitcoin', {
    dex_pair_format: 'symbol'
  })

  return (
    <div id='coin-overview'>
      <div className='header'>
        <Image
          src={coin.image.large}
          alt={coin.name.toLocaleUpperCase()}
          width={56}
          height={56}
        />
        <div className='info'>
          <p>
            {coin.name} / {coin.symbol.toUpperCase()}
          </p>
          <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
        </div>
      </div>
    </div>
  )
}

export default Overview
