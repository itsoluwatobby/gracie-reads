
import { BookOpen, Eye, Heart, Notebook } from 'lucide-react';

export const AnalyticsLoadingCard = () => {

  const Icons = [BookOpen, Eye, Heart, Notebook];
  return (
    <>
    {
      Icons.map((Icon, index) => (
        <div 
        key={index}
        className="bg-white rounded-xl shadow-md p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="bg-gray-600 animate-pulse w-10 h-3 text-base"></p>
              <h2 className="w-5 h-3 animate-pulse font-medium bg-gray-800"></h2>
            </div>
            <Icon className="text-sky-600" size={24} />
          </div>
        </div>
      ))
    }
    </>
  )
}