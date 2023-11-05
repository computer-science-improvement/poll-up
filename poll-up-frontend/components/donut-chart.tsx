'use client';

import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';

const DonutChart = () => {
  const [Chart, setChart] = useState<any>();

  useEffect(() => {
    import('react-apexcharts').then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const chartOptions: ApexOptions = {
    series: [44, 55, 13],
    colors: ['#53d2dc', '#3196e2', '#ffb26c'],
    fill: {
      colors: ['#53d2dc', '#3196e2', '#ffb26c'],
    },
    labels: ['GROUP 1', 'GROUP 2', 'GROUP 3'],
    chart: {
      foreColor: 'white',
    },
    stroke: {
      show: false,
      width: 0,
    },
  };

  return (
    <div>
      {Chart && (
        <Chart
          options={chartOptions}
          series={chartOptions.series}
          type='pie'
          width={400}
        />
      )}
    </div>
  );
};

export default DonutChart;
