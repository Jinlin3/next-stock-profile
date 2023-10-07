import ProfileDetailsCard from '@/components/ProfileDetailsCard';
import { Aggregates, AggregatesResults, Article, DailyOpenClose, PreviousClose, StockPrices, TickerNews, Tickers } from '@/models/PolygonResponse';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from "next/head";
import { useRouter } from 'next/router';
import { Open_Sans, Montserrat } from 'next/font/google';
import styles from '@/styles/quote.module.css';
import { Alert } from 'react-bootstrap';
import ArticlePreview from '@/components/ArticlePreview';
import StockChart from '@/components/StockChart';
import { companyInfo } from '@/models/FMP';

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
  companyName: string,
  stockData: StockPrices,
  articles: Article[],
  aggregates: AggregatesResults[],
}

export const getStaticPaths: GetStaticPaths = async () => {

  const dowResponse = await fetch(`https://financialmodelingprep.com/api/v3/dowjones_constituent?apikey=${process.env.FMP_API_KEY}`);
  const dowResponseJson: companyInfo[] = await dowResponse.json();
  console.log(dowResponseJson);
  const nasdaqResponse = await fetch(`https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${process.env.FMP_API_KEY}`);
  const nasdaqResponseJson: companyInfo[] = await nasdaqResponse.json();
  console.log(nasdaqResponseJson);

  const dowCompanies: string[] = dowResponseJson.map((company: companyInfo) => company.symbol);
  const nasdaqCompanies: string[] = nasdaqResponseJson.map((company: companyInfo) => company.symbol);

  const companies: string[] = [...dowCompanies, ...nasdaqCompanies];
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
  const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`); // Previous Close
  const previousCloseResponse: PreviousClose = await response.json();
  const response2 = await fetch(`https://api.polygon.io/v2/reference/news?ticker=${symbol}&limit=10&apiKey=${process.env.POLYGON_API_KEY}`); // Ticker News
  const tickerNewsResponse: TickerNews = await response2.json();
  const response3 = await fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/10/minute/${formattedDate}/${formattedDate}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_API_KEY}`); // Aggregates
  const aggregatesResponse: Aggregates = await response3.json();
  const response4 = await fetch(`https://api.polygon.io/v3/reference/tickers?ticker=${symbol}&active=true&apiKey=${process.env.POLYGON_API_KEY}`);
  const tickersResponse: Tickers = await response4.json();
  return {
    props: {
      companyName: tickersResponse.results[0].name,
      stockData: previousCloseResponse.results[0],
      articles: tickerNewsResponse.results,
      aggregates: aggregatesResponse.results,
    },
    revalidate: 5 * 60,
  }
}

const Quote = ({companyName, stockData, articles, aggregates} : QuoteProps) => {
  console.log(stockData);
  const router = useRouter();
  const symbol = router.query.quote?.toString();
  return (
    <>
      <Head>
        <title key="title">{`TidalWave - ${symbol}`}</title>
      </Head>
      <main className={openSans.className}>
        <div className="d-flex flex-column align-items-center pb-3">
          <h1 className={`display-5 text-center mt-3 mb-4 fw-bold ${styles.companyNameStyles}`}>{ companyName }</h1>
          <h3 className={`text-white text-center text-nowrap ${styles.h4Styles}`}>{`Date: ${formattedDate}`}</h3>
        </div>
        <Alert className="text-center mb-4">
          This page uses <strong>Dynamic Routing and getStaticProps</strong> for fast loading speeds, and it uses <strong>incremental static regeneration</strong> to show new data
        </Alert>
        <ProfileDetailsCard stockData={ stockData } date={ formattedDate } />
        <h2 className={`text-center mt-5 display-4 ${styles.h2Styles}`}>{`Stock Price`}</h2>
        <StockChart aggregates={aggregates} />
        <h2 className={`display-4 text-center mt-5 mb-3 ${styles.h1Styles}`}>{`Top Headlines`}</h2>
        {articles.map((article) => (
          <ArticlePreview key={article.title} article={article}></ArticlePreview>
        ))}
      </main>
    </>
  );
}
 
export default Quote;