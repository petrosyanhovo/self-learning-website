import { UserButton, auth } from '@clerk/nextjs'
import Image from 'next/image'
import { redirect } from 'next/navigation';
import { getDhashboardCourses } from '../../../../../actions/get-dashboard-courses';
import { CoursesList } from '@/components/courses-list';
import { CheckCircle, Clock } from 'lucide-react';
import { InfoCard } from './_components/info-card';

export default async function Dashboard() {
  const {userId} = auth();

  if(!userId) {
    return redirect("/")
  }

  const {
    completedCourses,
    coursesInProgress,
  } = await getDhashboardCourses(userId);

  return (
    <div className='p-6 space-y-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <InfoCard
          icon={Clock}
          label="Ընթացքի մեջ"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Ավարված"
          numberOfItems={completedCourses.length}
          variant='success'
        />
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}
