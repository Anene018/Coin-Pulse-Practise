import Category from '@/components/home/Category'
import Overview from '@/components/home/Overview'
import TrendingCoins from '@/components/home/TrendingCoins'
import OverviewSkeleton from '@/components/skeletons/OverviewSkeleton'
import TrendingCoinsSkeleton from '@/components/skeletons/TrendingCoinsSkeleton'
import CategorySkeleton from '@/components/skeletons/CategorySkeleton'
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

      <section className='mt-7 w-full space-y-4'>
        <Suspense fallback={<CategorySkeleton />}>
          <Category />
        </Suspense>
      </section>
    </main>
  )
}

export default page
