import { useState } from 'react';

import { BookOpen, Eye, Heart, LucideIcon } from 'lucide-react';
import { Analytics, BookTable, Contacts } from '../components/Dashboard';
import { helper } from '../utils';
// MessageSquare

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts'>('overview');

  return (
    <div className="h-auto bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'overview'
                  ? 'bg-sky-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'contacts'
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              <AnalyticsCard title='Total Books' total={24} Icon={BookOpen} />

              <AnalyticsCard title='Total Views' total={12500} Icon={Eye} />

              <AnalyticsCard title='Total Likes' total={3200} Icon={Heart} />

            </div>

            {/* Analytics Chart */}
            <Analytics />

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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">{title}</p>
          <h2 className="text-3xl font-bold text-gray-800">{helper.checkCount(total)}</h2>
        </div>
        <Icon className="text-sky-600" size={32} />
      </div>
    </div>
  )
}