import { DailyOpenClose } from '@/models/DailyOpenClose';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetServerSideProps } from 'next';
import Head from "next/head";

interface QuoteProps {
  stockData: DailyOpenClose,
}

export const getServerSideProps: GetServerSideProps<QuoteProps> = async () => {
  const response = await fetch("https://api.polygon.io/v1/open-close/AAPL/2023-01-09?adjusted=true&apiKey=" + process.env.POLYGON_API_KEY);
  const dataResponse: DailyOpenClose = await response.json();
  return {
    props: { stockData: dataResponse }
  }
}

const Quote = ({stockData} : QuoteProps) => {
  return (
    <main>
      <h1>Stock Profile</h1>
      { JSON.stringify(stockData) }
    </main>
  );
}
 
export default Quote;