import { Suspense } from 'react'
import CoinsContent from './CoinsContent'
import { CategorySkeleton } from '@/components/skeletons'

interface NextPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}
const page = ({ searchParams }: NextPageProps) => {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CoinsContent searchParams={searchParams} />
    </Suspense>
  )
}

export default page
