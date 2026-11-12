import { fetcher } from '@/lib/CoinGecko.actions'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import { OverviewSkeleton } from '../skeletons'
import CandleStickChart from '../CandleStickChart'

const Overview = async () => {
 
    try {
      const [coin, coinOHLCData] = await Promise.all([
      await fetcher<CoinDetailsData>('/coins/bitcoin', {
      dex_pair_format: 'symbol'
    }),
    await fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
          vs_currency: 'usd',
          days: 1,
          // interval: 'hourly',
          precision:'full'
      })
    ])   
      
        
    return (
      <div id='coin-overview'>
        <CandleStickChart data={coinOHLCData} coinId='bitcoin'>

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
        </CandleStickChart>
      
    </div>
  )
  } catch (error) {
    console.error('Error fetching coin overview', error)
    return <OverviewSkeleton />
  }

  
}

export default Overview
