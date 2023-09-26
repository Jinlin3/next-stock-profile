import Head from 'next/head'
import { Open_Sans, Montserrat } from 'next/font/google'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import ProfilePreviewCard from '@/components/ProfilePreviewCard';
import { CompanyNameAndURL } from '@/models/CompanyNameAndURL';
import { DailyOpenClose } from '@/models/DailyOpenClose';
import { GetServerSideProps } from 'next';
import styles from '@/styles/home.module.css';

interface companyPreviewData {
  name: string,
  imageURL: string,
  stockData: DailyOpenClose,
}

interface HomeProps {
  companyPreviewDataArray: companyPreviewData[],
}

const openSans = Open_Sans({ subsets: ['latin'] });
const montserrat = Montserrat({subsets: ['latin']});

const companies: CompanyNameAndURL[] = [
  { name: 'AAPL', URL: 'https://static.vecteezy.com/system/resources/previews/017/221/833/non_2x/apple-logo-free-png.png'},
  { name: 'MSFT', URL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png'},
  { name: 'V', URL: 'https://cdn-icons-png.flaticon.com/512/217/217425.png'},
  { name: 'GOOG', URL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png'},
  { name: 'AMZN', URL: 'https://s3-symbol-logo.tradingview.com/amazon--600.png'},
  { name: 'NVDA', URL: 'https://cdn-icons-png.flaticon.com/512/732/732230.png'},
  { name: 'META', URL: 'https://cdn-icons-png.flaticon.com/512/6033/6033716.png'},
  { name: 'TSLA', URL: 'https://s3-symbol-logo.tradingview.com/tesla--600.png'},
];

// gets current date to concat the api string
const currentDate = new Date();
const yesterday = new Date(currentDate);
yesterday.setDate(currentDate.getDate() - 1)
const date = yesterday.getDate().toString().padStart(2, '0');
const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
const year = yesterday.getFullYear().toString();
const formattedDate = `${year}-${month}-${date}`;
console.log(formattedDate);

// fetches data server side
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  let companyPreviewDataArray: companyPreviewData[] = [];
  for (const company of companies) {
    const response = await fetch(`https://api.polygon.io/v1/open-close/${company.name}/${formattedDate}?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`);
    const dataResponse = await response.json();
    companyPreviewDataArray.push({
      name: company.name,
      imageURL: company.URL,
      stockData: dataResponse,
    });
  }
  return {
    props: { companyPreviewDataArray }
  }
}

export default function Home({companyPreviewDataArray}: HomeProps) {
  console.log(companyPreviewDataArray);
  return (
    <>
      <Head>
        <title>Home - TRADETIDE</title>
      </Head>
      <main className={openSans.className}>
        <div className="d-flex flex-column align-items-center pb-3">
          <h1 className={`display-1 text-center ${styles.h1Styles} ${montserrat.className}`}>TradeTide</h1>
          <h2 className={`text-center ${styles.subHeadingStyles}`}>Simple and Accurate Data</h2>
          <h3 className="mt-2 text-center text-white">{`Yesterday: ${formattedDate}`}</h3>
        </div>
        <Alert className="text-center">
          This page uses <strong>getServerSideProps</strong> to fetch data server side, which allows for <strong>improved user experience and SEO.</strong>
        </Alert>
        <Alert className="text-center">
          This page runs on <strong><a href="https://polygon.io/" target="_blank">polygon.io</a></strong>.
        </Alert>
        <Form className="py-3">
          <Form.Group className="mb-3 d-flex flex-column align-items-center">
            <Form.Label className="display-4 text-white fw-300">Search Individual Stocks</Form.Label>
            <Form.Control name="searchQuery" placeholder="E.g. JNJ, WMT, TSM, ..." className={`py-3 ${styles.searchBarStyles}`}/>
          </Form.Group>
          <div className="d-flex flex-column align-items-center">
            <Button className={`btn-lg shadow-sm ${styles.searchBarButtonStyles}`} type="submit">Search</Button>
          </div>
        </Form>
        <h2 className="display-5 text-center my-4 text-white">Largest Companies</h2>
        <div className="pb-5">
          <Row xs={1} sm={2} xl={3} className="g-3 align-items-center">
            {companyPreviewDataArray.map((company) => (
              <Col xl={3} lg={3} md={6} xs={10} key={company.name} className="mx-auto">
                <ProfilePreviewCard name={company.name} imageURL={company.imageURL} stockData={company.stockData} />
              </Col>
            ))}
          </Row>  
        </div>      
      </main>
    </>
  );
}
