import React from 'react';
import { Line } from 'react-chartjs-2';

interface EarningsProps {
    data: { date: string; amount: number }[];
}

const Earnings: React.FC<EarningsProps> = ({ data }) => {
  const dates = data.map(entry => entry.date);
  const amounts = data.map(entry => entry.amount);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Earnings',
        data: amounts,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };



  return (
    <div className="earnings-card">
      <h2>Earnings</h2>
      <div className="earnings-details">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Earnings;
