import ProfileDetailsCard from '@/components/ProfileDetailsCard';
import { DailyOpenClose } from '@/models/DailyOpenClose';
import { ResultItem, Ticker } from '@/models/Ticker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from "next/head";
import { useRouter } from 'next/router';

// Error: A required parameter (quote) was not provided as a string received undefined in getStaticPaths for /quote/[quote]
// gets current date to concat the api string
const currentDate = new Date();
const yesterday = new Date(currentDate);
yesterday.setDate(currentDate.getDate() - 2);
const date = yesterday.getDate().toString().padStart(2, '0');
const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
const year = yesterday.getFullYear().toString();
const formattedDate = `${year}-${month}-${date}`;
console.log(formattedDate);

interface QuoteProps {
  stockData: DailyOpenClose,
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://api.polygon.io/v3/reference/tickers?active=true&apiKey=${process.env.POLYGON_API_KEY}`);
  const apiResponse: Ticker = await response.json();
  const initialResponseResults = apiResponse.results;
  const paths = initialResponseResults.map((result: ResultItem) => ({ params: {category: result.ticker} }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<QuoteProps> = async ({params}) => {
  const symbol = params?.quote?.toString();
  console.log(symbol);
  const response = await fetch(`https://api.polygon.io/v1/open-close/${symbol}/${formattedDate}?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`);
  const apiResponse: DailyOpenClose = await response.json();
  return {
    props: { stockData: apiResponse },
    revalidate: 5 * 60,
  }
}

const Quote = ({stockData} : QuoteProps) => {
  const router = useRouter();
  const symbol = router.query.quote?.toString();
  return (
    <>
      <Head>
        <title key="title">{`Stock Price - ${symbol}`}</title>
      </Head>
      <h1 className="display-1 text-center my-3">{ stockData.symbol }</h1>
      <ProfileDetailsCard stockData={ stockData } />
    </>
  );
}
 
export default Quote;