import { GetStaticPaths, GetStaticProps } from "next";
import { companyInfo } from "@/models/FMP";
import { useRouter } from "next/router";
import { Open_Sans, Montserrat } from "next/font/google";
import { IndexCompanyPreview } from "@/models/IndexPage";
import { PreviousClose } from "@/models/PolygonResponse";
import IndexCard from "@/components/IndexCard";
import { Alert } from "react-bootstrap";

interface IndexProps {
  companies: IndexCompanyPreview[],
}

const openSans = Open_Sans({ subsets: ['latin'] });

export const getStaticPaths: GetStaticPaths = async () => {
  const indexSlugs = [
    'dowjones',
    'nasdaq',
  ];

  const paths = indexSlugs.map((slug) => (
    {
      params: { index: slug }
    }
  ));
  
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<IndexProps> = async ({params}) => {
  const index = params?.index?.toString();
  const response1 = await fetch(`https://financialmodelingprep.com/api/v3/${index}_constituent?apikey=${process.env.FMP_API_KEY}`);
  const FMPResponse: companyInfo[] = await response1.json(); // returns name information about each company

  let companyArray: IndexCompanyPreview[] = [];
  for (const company of FMPResponse) {
    const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${company.symbol}/prev?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`);
    const polygonResponse: PreviousClose = await response.json(); // returns stock prices about each company
    companyArray.push({
      name: company.name,
      symbol: company.symbol,
      open: polygonResponse.results[0].o,
      close: polygonResponse.results[0].c,
    }) 
  }

  return {
    props: {
      companies: companyArray,
      revalidate: 5 * 60,
    }
  }
}

const index = ({companies}: IndexProps) => {
  const router = useRouter();
  const indexName = router.query.index?.toString();
  let title;
  if (indexName === 'dowjones') {
    title = 'Dow Jones';
  } else if (indexName === 'nasdaq') {
    title = 'NASDAQ-100';
  }
  return (  
    <>
      <main>
        <div className={openSans.className}>
          <h1 className={`display-5 fw-bold text-center text-white`}>{title}</h1>
          <Alert className="text-center mb-2">
            This page uses <strong>Dynamic Routing and getStaticProps</strong> for fast loading speeds, and it uses <strong>incremental static regeneration</strong> to show new data
          </Alert>
          <h2 className={`text-center mb-3 display-4 text-white`}>{`Companies`}</h2>
          <div>
            {companies.map((company) => (
              <IndexCard key={company.name} name={company.name} symbol={company.symbol} open={company.open} close={company.close} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
 
export default index;
<></>