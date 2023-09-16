import { DailyOpenClose } from '@/models/DailyOpenClose';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetServerSideProps } from 'next';
import Head from "next/head";

export const getServerSideProps: GetServerSideProps<DailyOpenClose> = async () => {
  const response = await fetch("https://api.polygon.io/v1/open-close/AAPL/2023-09-14?adjusted=true&apiKey=" + process.env.POLYGON_API_KEY);
  const dataResponse: DailyOpenClose = await response.json();
  return {
    props: dataResponse,
  }
}

const Quote = (stockData: DailyOpenClose) => {
  return (
    <main>
      <h1>Stock Profile</h1>
      <div>{ JSON.stringify(stockData) }</div>
    </main>
  );
}
 
export default Quote;