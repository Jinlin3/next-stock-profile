import Head from 'next/head';
import { Open_Sans, Montserrat } from 'next/font/google';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import ProfilePreviewCard from '@/components/ProfilePreviewCard';
import { CompanyNameAndURL } from '@/models/CompanyNameAndURL';
import { DailyOpenClose, PreviousClose, StockPrices } from '@/models/PolygonResponse';
import { GetServerSideProps } from 'next';
import styles from '@/styles/home.module.css';
import Link from 'next/link';
import GraphOffline from '@/components/GraphOffline';

interface companyPreviewData {
  name: string,
  imageURL: string,
}

interface HomeProps {
  techCompaniesData: companyPreviewData[],
  otherCompaniesData: companyPreviewData[],
}

const openSans = Open_Sans({ subsets: ['latin'] });
const montserrat = Montserrat({subsets: ['latin']});

const techCompanies: CompanyNameAndURL[] = [
  { name: 'AAPL', URL: 'https://static.vecteezy.com/system/resources/previews/017/221/833/non_2x/apple-logo-free-png.png'},
  { name: 'MSFT', URL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png'},
  { name: 'IBM', URL: 'data:image/png;base64,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'},
  { name: 'GOOG', URL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png'},
  { name: 'INTC', URL: 'https://pbs.twimg.com/profile_images/1410623479318159360/xYe7Xray_400x400.jpg'},
  { name: 'NVDA', URL: 'https://cdn-icons-png.flaticon.com/512/732/732230.png'},
  { name: 'META', URL: 'https://cdn-icons-png.flaticon.com/512/6033/6033716.png'},
  { name: 'TSLA', URL: 'https://s3-symbol-logo.tradingview.com/tesla--600.png'},
];

const otherCompanies: CompanyNameAndURL[] = [
  { name: 'ALGN', URL: 'https://companiesmarketcap.com/img/company-logos/256/ALGN.png'},
  { name: 'GS', URL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/1200px-Goldman_Sachs.svg.png'},
  { name: 'NKE', URL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTNoD9oT_VnEYNKKeOor8U4qK5T1LF4bC2iRDD75fQdveQMHTUA'},
  { name: 'WBA', URL: 'https://play-lh.googleusercontent.com/gK5U3QZnDLSysaBFcsiCOyknNRZpG669NmreEUvGqlamTQwafKoVTUVUoZ8rqdBzlMsw'},
  { name: 'DIS', URL: 'https://i.pinimg.com/originals/1a/51/a8/1a51a83a7bcdd42e2a49758a11234caa.jpg'},
  { name: 'VZ', URL: 'https://www.mainstreetsm.com/wp-content/uploads/2018/05/Verizon-Logo-Square.png'},
  { name: 'KO', URL: 'https://seeklogo.com/images/C/coca-cola-circle-logo-A9EBD3B00A-seeklogo.com.png'},
  { name: 'MCD', URL: 'https://cdn-icons-png.flaticon.com/512/5977/5977588.png'},
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
  let techCompaniesData: companyPreviewData[] = [];
  for (const company of techCompanies) {
    techCompaniesData.push({
      name: company.name,
      imageURL: company.URL,
    });
  }
  let otherCompaniesData: companyPreviewData[] = [];
  for (const company of otherCompanies) {
    otherCompaniesData.push({
      name: company.name,
      imageURL: company.URL,
    });
  }
  return {
    props: {
      techCompaniesData,
      otherCompaniesData,
    }
  }
}

export default function Home({techCompaniesData, otherCompaniesData}: HomeProps) {
  return (
    <>
      <Head>
        <title key="title">Home - TidalWave</title>
      </Head>
      <main className={`${openSans.className}`}>
        <div className="d-flex flex-column align-items-center pb-3">
          <h1 className={`display-1 text-center ${styles.h1Styles} ${montserrat.className}`}>TidalWave</h1>
          <h2 className={`text-center text-nowrap ${styles.subHeadingStyles}`}>Simple and Accurate Data</h2>
          <h3 className="mt-2 text-center text-white text-nowrap">{`Date: ${formattedDate}`}</h3>
        </div>
        <Alert className="text-center">
          This page uses <strong>getServerSideProps</strong> to fetch for server-side data fetching, which allows for <strong>improved user experience and SEO.</strong>
        </Alert>
        <Alert className="text-center">
          This page runs on <strong><a href="https://site.financialmodelingprep.com/" target="_blank">Financial Modeling Prep</a></strong> and <strong><a href="https://polygon.io/" target="_blank">polygon.io</a></strong>.
        </Alert>
        <h2 className="display-5 text-center my-4 text-white">Popular Tech Companies</h2>
        <div className="pb-2">
          <Row xs={1} sm={2} xl={3} className="g-4 align-items-center">
            {techCompaniesData.map((company) => (
              <Col xl={3} lg={3} md={6} xs={10} key={company.name} className="mx-auto">
                <ProfilePreviewCard name={company.name} imageURL={company.imageURL} />
              </Col>
            ))}
          </Row>  
        </div>
        <h2 className="display-5 text-center my-4 text-white">Other Companies</h2>
        <div className="pb-5">
          <Row xs={1} sm={2} xl={3} className="g-4 align-items-center">
            {otherCompaniesData.map((company) => (
              <Col xl={3} lg={3} md={6} xs={10} key={company.name} className="mx-auto">
                <ProfilePreviewCard name={company.name} imageURL={company.imageURL} />
              </Col>
            ))}
          </Row>  
        </div>    
      </main>
    </>
  );
}
