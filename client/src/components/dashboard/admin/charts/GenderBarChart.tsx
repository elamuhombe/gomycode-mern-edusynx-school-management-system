import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions}from 'chart.js';

import { Chart as ChartJS, registerables } from 'chart.js';





// Extend the Chart.js with the necessary scales


ChartJS.register(...registerables);

interface GenderBarChartProps {
  girlsData: number;
  boysData: number;
}

const GenderBarChart: React.FC<GenderBarChartProps> = ({ girlsData, boysData }) => {
  const data: ChartData<'bar', number[], string> = {
    labels: ['Girls', 'Boys'],
    datasets: [
      {
        label: 'Number of Students',
        backgroundColor: ['#FF6384', '#36A2EB'],
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [girlsData, boysData],
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
      x: {
        type: 'category', // Use category scale for labels
        ticks: {
          autoSkip: false,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GenderBarChart;
