import Overview from '@/components/home/Overview'
import TrendingCoins from '@/components/home/TrendingCoins'
import OverviewSkeleton from '@/components/skeletons/OverviewSkeleton'
import TrendingCoinsSkeleton from '@/components/skeletons/TrendingCoinsSkeleton'
import { Suspense } from 'react'

const page = async () => {
  return (
    <main className='main-container'>
      <section className='home-grid'>
        <Suspense fallback={<OverviewSkeleton />}>
          <Overview />
        </Suspense>

        <Suspense fallback={<TrendingCoinsSkeleton />}>
          <TrendingCoins />
        </Suspense>
      </section>

      <section className='w-full mt-7 space-y-4'>
        <p>Catergories</p>
      </section>
    </main>
  )
}

export default page
