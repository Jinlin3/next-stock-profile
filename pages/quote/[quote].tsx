import ProfileDetailsCard from '@/components/ProfileDetailsCard';
import { Aggregates, AggregatesResults, Article, DailyOpenClose, PreviousClose, StockPrices, TickerNews, Tickers } from '@/models/PolygonResponse';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from "next/head";
import { useRouter } from 'next/router';
import { Open_Sans } from 'next/font/google';
import styles from '@/styles/quote.module.css';
import { Alert } from 'react-bootstrap';
import ArticlePreview from '@/components/ArticlePreview';
import StockChart from '@/components/StockChart';
import { companyInfo } from '@/models/FMP';
import GraphOffline from '@/components/GraphOffline';

const currentDate = new Date();
const yesterday = new Date(currentDate);
yesterday.setDate(currentDate.getDate() - 1);
const date = yesterday.getDate().toString().padStart(2, '0');
const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
const year = yesterday.getFullYear().toString();
const formattedDate = `${year}-${month}-${date}`;

const openSans = Open_Sans({ subsets: ['latin'] });

interface QuoteProps {
  companyName: string,
  stockData: StockPrices,
  articles: Article[],
  aggregates: AggregatesResults[] | null,
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch constituent data (limit this to avoid extra load)
  const dowResponse = await fetch(`https://financialmodelingprep.com/api/v3/dowjones_constituent?apikey=${process.env.FMP_API_KEY}`);
  const dowResponseJson: companyInfo[] = await dowResponse.json();

  const nasdaqResponse = await fetch(`https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${process.env.FMP_API_KEY}`);
  const nasdaqResponseJson: companyInfo[] = await nasdaqResponse.json();

  // Combine and deduplicate symbols
  const allSymbols = [...dowResponseJson, ...nasdaqResponseJson]
    .map(company => company.symbol)
    .filter((value, index, self) => self.indexOf(value) === index);

  // Just grab the first 5 symbols to stay safe under API rate limits
  const topSymbols = allSymbols.slice(0, 5);

  const paths = topSymbols.map(symbol => ({
    params: { quote: symbol },
  }));

  return {
    paths,
    fallback: 'blocking', // other symbols will be generated on-demand
  };
};

export const getStaticProps: GetStaticProps<QuoteProps> = async ({ params }) => {
  const symbol = params?.quote?.toString();

  const previousCloseRes = await fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`);
  const previousCloseResponse: PreviousClose = await previousCloseRes.json();

  const newsRes = await fetch(`https://api.polygon.io/v2/reference/news?ticker=${symbol}&limit=10&apiKey=${process.env.POLYGON_API_KEY}`);
  const tickerNewsResponse: TickerNews = await newsRes.json();

  const aggRes = await fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/10/minute/${formattedDate}/${formattedDate}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_API_KEY}`);
  const aggregatesResponse: Aggregates = await aggRes.json();

  const tickerInfoRes = await fetch(`https://api.polygon.io/v3/reference/tickers?ticker=${symbol}&active=true&apiKey=${process.env.POLYGON_API_KEY}`);
  const tickersResponse: Tickers = await tickerInfoRes.json();

  // 🔒 Safe checks
  const hasCloseData = previousCloseResponse.results && previousCloseResponse.results.length > 0;
  const hasTickerName = tickersResponse.results && tickersResponse.results.length > 0;

  if (!hasCloseData || !hasTickerName) {
    console.warn(`Missing data for symbol: ${symbol}. Retrying...`);

    // Retry once after 3 seconds
    await new Promise(res => setTimeout(res, 3000));
    try {
      const retryCloseRes = await fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`);
      const retryCloseJson: PreviousClose = await retryCloseRes.json();
      const retryTickersRes = await fetch(`https://api.polygon.io/v3/reference/tickers?ticker=${symbol}&active=true&apiKey=${process.env.POLYGON_API_KEY}`);
      const retryTickersJson: Tickers = await retryTickersRes.json();

      const retryHasCloseData = retryCloseJson.results && retryCloseJson.results.length > 0;
      const retryHasName = retryTickersJson.results && retryTickersJson.results.length > 0;

      if (!retryHasCloseData || !retryHasName) {
        return { notFound: true };
      }

      return {
        props: {
          companyName: retryTickersJson.results[0].name,
          stockData: retryCloseJson.results[0],
          articles: [],
          aggregates: null,
        },
        revalidate: 60 * 5,
      };

    } catch (e) {
      console.error(`Retry failed for ${symbol}:`, e);
      return { notFound: true };
    }
  }

  return {
    props: {
      companyName: tickersResponse.results[0].name,
      stockData: previousCloseResponse.results[0],
      articles: tickerNewsResponse.results,
      aggregates: aggregatesResponse.resultsCount > 0 ? aggregatesResponse.results : null,
    },
    revalidate: 5 * 60,
  };
};

const Quote = ({companyName, stockData, articles, aggregates} : QuoteProps) => {
  const router = useRouter();
  const symbol = router.query.quote?.toString();
  console.log(aggregates);
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
        { !aggregates &&
          <GraphOffline />
        }
        { aggregates && 
        <>
          <h2 className={`text-center mt-5 display-4 ${styles.h2Styles}`}>{`Stock Price`}</h2>
          <StockChart aggregates={aggregates} />
        </> }

        <h2 className={`display-5 text-center mt-5 mb-3 ${styles.h2Styles}`}>{`Top Headlines`}</h2>
        {articles.map((article) => (
          <ArticlePreview key={article.title} article={article}></ArticlePreview>
        ))}
      </main>
    </>
  );
}
 
export default Quote;