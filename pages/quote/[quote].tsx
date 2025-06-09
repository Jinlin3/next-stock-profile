import ProfileDetailsCard from '@/components/ProfileDetailsCard';
import { Aggregates, AggregatesResults, Article, DailyOpenClose, PreviousClose, StockPrices, TickerNews, Tickers } from '@/models/PolygonResponse';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";
import { useRouter } from 'next/router';
import { Open_Sans } from 'next/font/google';
import styles from '@/styles/quote.module.css';
import { Alert } from 'react-bootstrap';
import ArticlePreview from '@/components/ArticlePreview';
import StockChart from '@/components/StockChart';
import { companyInfo } from '@/models/FMP';
import GraphOffline from '@/components/GraphOffline';
import { GetServerSidePropsContext } from 'next';

const currentDate = new Date();
const yesterday = new Date(currentDate);
yesterday.setDate(currentDate.getDate() - 1);
const date = yesterday.getDate().toString().padStart(2, '0');
const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
const year = yesterday.getFullYear().toString();
const formattedDate = `${year}-${month}-${date}`;

const openSans = Open_Sans({ subsets: ['latin'] });

interface QuoteProps {
  error?: boolean,
  companyName: string,
  stockData: StockPrices,
  articles: Article[],
  aggregates: AggregatesResults[] | null,
}

// Server-side Rendering
export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const symbol = params?.quote?.toString();
  if (!symbol) {
    return { notFound: true }
  }
  try {
    const [prevCloseRes, newsRes, aggRes, tickerInfoRes] = await Promise.all([
      fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`),
      fetch(`https://api.polygon.io/v2/reference/news?ticker=${symbol}&limit=10&apiKey=${process.env.POLYGON_API_KEY}`),
      fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/10/minute/${formattedDate}/${formattedDate}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_API_KEY}`),
      fetch(`https://api.polygon.io/v3/reference/tickers?ticker=${symbol}&active=true&apiKey=${process.env.POLYGON_API_KEY}`),
    ]);
    const [prevCloseData, newsResData, aggResData, tickerInfoData] = await Promise.all([
      prevCloseRes.json(),
      newsRes.json(),
      aggRes.json(),
      tickerInfoRes.json(),
    ]);
    console.log(aggResData);

    // Error Check
    if (
      !prevCloseData.results?.length ||
      !tickerInfoData.results?.length
    ) {
      throw new Error("Missing expected results data");
    }

    return {
      props: {
        companyName: tickerInfoData.results[0].name,
        stockData: prevCloseData.results[0],
        articles: newsResData.results,
        aggregates: aggResData.resultsCount > 0 ? aggResData.results : null
      }
    }
  } catch (error) {
    console.log(`Error fetching data for`, symbol, error);
    return {
      props: {
        error: true,
        companyName: ``,
        stockData: null,
        articles: [],
        aggregates: null
      }
    }
  }
}

const Quote = ({error, companyName, stockData, articles, aggregates} : QuoteProps) => {
  const router = useRouter();
  const symbol = router.query.quote?.toString();
  
  // error page
  if (error) {
    return (
      <>
        <Head>
          <title key="title">{`TidalWave - Quote Page`}</title>
        </Head>
        <main>
          <Alert className="text-center mb-4">
            We&apos;re currently having issues fetching data for <strong>{symbol}</strong>. <br />
            The API limit has been reached or <strong>{symbol}</strong> doesn&apos;t exist.
          </Alert>
        </main>
      </>
    );
  }

  // normal page
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
          This page uses <strong>getServerSideProps</strong> for fresh data and improved SEO. <br />
          It also uses <strong>Dynamic Routing</strong> allowing for flexibility and scalability.
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