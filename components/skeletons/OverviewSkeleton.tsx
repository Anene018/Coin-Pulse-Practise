import { Skeleton } from '@/components/ui/skeleton'

const OverviewSkeleton = () => {
  return (
    <div id='coin-overview-fallback'>
      <div className='header'>
        <Skeleton className='header-image' />
        <div className='info'>
          <Skeleton className='header-line-sm' />
          <Skeleton className='header-line-lg' />
        </div>
      </div>
    </div>
  )
}

export { OverviewSkeleton }
export default OverviewSkeleton
