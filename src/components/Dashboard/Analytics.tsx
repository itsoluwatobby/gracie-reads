/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Months } from '../../utils/initStates';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type AnalyticProps = {
  analytics: AnalyticsProps[]
}

const border = ['rgb(14, 165, 233)', 'rgb(239, 68, 68)', 'rgb(34, 197, 94)'];
export default function Analytics({ analytics }: AnalyticProps) {
  const labels = analytics.map((analytic) => {
    const index = +(analytic.month.split('-')[1]) - 1;
    return Months[index];
  });

  const datalist = {} as any
  analytics.forEach((analytic) => {
    Object.entries(analytic).map(([key, value], index) => {
      if (key !== '_id' && key !== 'month') {
        if (!datalist[key]) {
          datalist[key] = {
            label: key,
            data: [value],
            borderColor: border[index],
            tension: 0.4,
          };
        } else {
          datalist[key]?.data.push(value);
        }
      }
    })
  });

  const datasets: any[] = [];
  Object.values(datalist).forEach((label: any) => datasets.push(label));
  
  const chartData = { labels, datasets };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics Overview</h2>
      <div className="h-[400px]">
        <Line data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  )
}