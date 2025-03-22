import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Views',
      data: [1200, 1900, 2400, 2800, 3200, 3800],
      borderColor: 'rgb(14, 165, 233)',
      tension: 0.4
    },
    {
      label: 'Likes',
      data: [400, 600, 800, 1000, 1200, 1500],
      borderColor: 'rgb(239, 68, 68)',
      tension: 0.4
    },
    {
      label: 'Comments',
      data: [100, 200, 300, 400, 500, 600],
      borderColor: 'rgb(34, 197, 94)',
      tension: 0.4
    }
  ]
};

export default function Analytics() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Analytics Overview</h2>
      <div className="h-[400px]">
        <Line data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  )
}