/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { BookOpen, Eye, Heart, LucideIcon, Notebook } from 'lucide-react';
import { Analytics, BookTable, Contacts } from '../components/Dashboard';
import { helper } from '../utils';
import { useAppContext } from '../hooks';
import {
  // initAppState,
  InitStateAppDashboard,
} from '../utils/initStates';
import { appService } from '../app/appService';
import toast from 'react-hot-toast';
// MessageSquare

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts'>('overview');
  const { isServerOnline } = useAppContext();
  const [reload, setReload] = useState(0);
  const [dashboard, setDashboard] = useState<AppDashboardProps>(InitStateAppDashboard);

  const { cardDetails, analytics } = dashboard;

  useEffect(() => {
    if (!isServerOnline) return;
    (async () => {
      if (reload > 5) return;
      try {
        const dashboardData = await appService.getAppDashboard();
        setDashboard(dashboardData.data);
        setReload(0);
      } catch (err: unknown) {
        const error = err as any;
        const message = error.response?.data?.error?.message || error?.message;
        toast.error(message);
      }
    })()
  }, [isServerOnline, reload])

  return (
    <div className="h-auto bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between mobile:flex-col mobile:items-start gap-y-2 items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex space-x-4 text-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 rounded-lg ${activeTab === 'overview'
                  ? 'bg-sky-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-3 py-2 rounded-lg ${activeTab === 'contacts'
                  ? 'bg-sky-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              Contacts
            </button>
          </div>
        </div>

        {activeTab === 'overview' ? (
          <>
            {/* Stats Overview */}
            <div className="grid mobile:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">

              <AnalyticsCard title='Total Books' total={cardDetails.audios} Icon={BookOpen} />

              <AnalyticsCard title='Total Views' total={cardDetails.views} Icon={Eye} />

              <AnalyticsCard title='Total Likes' total={cardDetails.likes} Icon={Heart} />

              <AnalyticsCard title='Total Comments' total={cardDetails.comments} Icon={Notebook} />

            </div>

            {/* Analytics Chart */}
            <Analytics analytics={analytics} />

            {/* Books Table */}
            <BookTable />
          </>
        ) : (
          <Contacts />
        )}
      </div>
    </div>
  );
}

type AnalyticsCardProps = {
  title: string;
  total: number;
  Icon: LucideIcon;
}
const AnalyticsCard = ({ title, total, Icon }: AnalyticsCardProps) => {

  return (
    <div className="bg-white rounded-xl shadow-md p-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 maxScreen:text-sm text-base">{title}</p>
          <h2 className="text-2xl font-medium text-gray-800">{helper.checkCount(total)}</h2>
        </div>
        <Icon className="text-sky-600" size={24} />
      </div>
    </div>
  )
}