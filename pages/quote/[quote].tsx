import ProfileDetailsCard from '@/components/ProfileDetailsCard';
import { DailyOpenClose, PreviousClose, StockPrices } from '@/models/PolygonResponse';
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
  stockData: StockPrices,
}

export const getStaticPaths: GetStaticPaths = async () => {
  const companies = [
    'AAPL',
    'MSFT',
    'V',
    'GOOG',
    'AMZN',
    'NVDA',
    'META',
    'TSLA',
  ]
  const paths = companies.map(company => ({ params: {quote: company} }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<QuoteProps> = async ({params}) => {
  const symbol = params?.quote?.toString();
  console.log(symbol);
  const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`);
  const apiResponse: PreviousClose = await response.json();
  return {
    props: { stockData: apiResponse.results[0] },
    revalidate: 5 * 60,
  }
}

const Quote = ({stockData} : QuoteProps) => {
  console.log(stockData);
  const router = useRouter();
  const symbol = router.query.quote?.toString();
  return (
    <>
      <Head>
        <title key="title">{`Stock Price - ${symbol}`}</title>
      </Head>
      <h1 className="display-1 text-center my-3">{ stockData.T }</h1>
      <ProfileDetailsCard stockData={ stockData } date={ formattedDate } />
    </>
  );
}
 
export default Quote;