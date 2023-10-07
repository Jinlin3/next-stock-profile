import ProfileDetailsCard from '@/components/ProfileDetailsCard';
import { Article, DailyOpenClose, PreviousClose, StockPrices, TickerNews } from '@/models/PolygonResponse';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from "next/head";
import { useRouter } from 'next/router';
import { Open_Sans, Montserrat } from 'next/font/google';
import styles from '@/styles/quote.module.css';
import { Alert } from 'react-bootstrap';
import ArticlePreview from '@/components/ArticlePreview';
import StockChart from '@/components/StockChart';

const currentDate = new Date();
const yesterday = new Date(currentDate);
yesterday.setDate(currentDate.getDate() - 2);
const date = yesterday.getDate().toString().padStart(2, '0');
const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
const year = yesterday.getFullYear().toString();
const formattedDate = `${year}-${month}-${date}`;
console.log(formattedDate);

const openSans = Open_Sans({ subsets: ['latin'] });
const montserrat = Montserrat({subsets: ['latin']});

interface QuoteProps {
  stockData: StockPrices,
  articles: Article[],
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
  const previousCloseResponse: PreviousClose = await response.json();
  const response2 = await fetch(`https://api.polygon.io/v2/reference/news?ticker=${symbol}&limit=10&apiKey=${process.env.POLYGON_API_KEY}`);
  const tickerNewsResponse: TickerNews = await response2.json();
  return {
    props: {
      stockData: previousCloseResponse.results[0],
      articles: tickerNewsResponse.results,
    },
    revalidate: 5 * 60,
  }
}

const Quote = ({stockData, articles} : QuoteProps) => {
  console.log(stockData);
  const router = useRouter();
  const symbol = router.query.quote?.toString();
  return (
    <>
      <Head>
        <title key="title">{`Stock Price - ${symbol}`}</title>
      </Head>
      <main className={openSans.className}>
        <h1 className={`display-1 text-center my-3 ${styles.h1Styles}`}>{ stockData.T }</h1>
        <Alert className="text-center">
          This page uses <strong>Dynamic Routing and getStaticProps</strong> for fast loading speeds, and it uses <strong>incremental static regeneration</strong> to show new data
        </Alert>
        <ProfileDetailsCard stockData={ stockData } date={ formattedDate } />
        <h2>Chart</h2>
        <StockChart />
        <h2 className={`display-4 text-center mt-5 ${styles.h1Styles}`}>{`Top ${symbol} Headlines`}</h2>
        {articles.map((article) => (
          <ArticlePreview key={article.title} article={article}></ArticlePreview>
        ))}
      </main>
    </>
  );
}
 
export default Quote;