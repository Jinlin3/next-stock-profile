import { AggregatesResults } from '@/models/PolygonResponse';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import styles from '@/styles/StockChart.module.css';
const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});

interface StockChartProps {
  aggregates: AggregatesResults[],
}

interface TimeData {
  t: number,
  o: number,
  h: number,
  l: number,
  c: number,
}

const chart: ApexOptions = {      
  chart: {
    type: 'candlestick',
    id: 'apexchart-example',
    width: "100%",
    height: "500px",
  },
  xaxis: {
    type: 'datetime',
    labels: {
      show: true,
      style: {
        colors: '#FFFFFF',
      }
    }
  },
  yaxis: {
    tooltip: {
      enabled: true
    },
    max: function (max) {
      return max + 1;
    },
    min: function (min) {
      return min - 1;
    },
    labels: {
      formatter: function (value) {
        return "$" + value.toFixed(2);
      },
      show: true,
      style: {
        colors: '#FFFFFF',
      }
    },
  },
};

const StockChart = ({aggregates}: StockChartProps) => {
  
  const timeDataArray: number[][] = aggregates.map((aggregate) => (
    [aggregate.t, aggregate.o, aggregate.h, aggregate.l, aggregate.c]
  ));
  const chartSeries = [{
    data: timeDataArray,
  }];
  return (
    <div className={`${styles.chartStyles}`}>
      {(typeof window !== 'undefined') && 
        <Chart
        options={chart}
        series={chartSeries}
        type="candlestick"
        height="400px"
      />
      }
    </div>
  );
}
 
export default StockChart;