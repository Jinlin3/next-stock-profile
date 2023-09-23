import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import ProfilePreviewCard from '@/components/ProfilePreviewCard';
import { CompanyNameAndURL } from '@/models/CompanyNameAndURL';

const inter = Inter({ subsets: ['latin'] });

const companies: CompanyNameAndURL[] = [
  { name: 'AAPL', URL: 'https://static.vecteezy.com/system/resources/previews/017/221/833/non_2x/apple-logo-free-png.png'},
  { name: 'AMZN', URL: 'https://s3-symbol-logo.tradingview.com/amazon--600.png'},
  { name: 'GOOGL', URL: 'https://s3-symbol-logo.tradingview.com/alphabet--600.png'},
  { name: 'META', URL: 'https://static.vecteezy.com/system/resources/previews/022/100/699/original/meta-logo-transparent-free-png.png'},
  { name: 'IBM', URL: 'https://www.ibm.com/brand/experience-guides/developer/b1db1ae501d522a1a4b49613fe07c9f1/01_8-bar-positive.svg'},
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - TRADETIDE</title>
      </Head>
      <main>
        <div className="d-flex flex-column align-items-center py-3">
          <h1 className="display-1 text-center">TradeTide</h1>
          <h2 className="lead text-center">Simple, Efficient, Accurate</h2>
        </div>
        <Alert className="text-center">This section uses <strong>getServerSideProps</strong> to fetch data server-side on every request. This allows search engines to crawl the page content and <strong>improves SEO</strong>.</Alert>
        <Alert className="text-center">The <strong>Polygon API</strong> free subscription only allows for <strong>5 API Calls / Minute</strong>. Due to the API limitations, the data might not load.</Alert>
        <Form className="py-3">
          <Form.Group className="mb-3 d-flex flex-column align-items-center">
            <Form.Label className="display-4">Search Individual Stocks</Form.Label>
            <Form.Control name="searchQuery" placeholder="E.g. JNJ, WMT, TSM, ..." />
          </Form.Group>
          <div className="d-flex flex-column align-items-center">
            <Button type="submit">Search</Button>
          </div>
        </Form>
        <h2 className="display-5 text-center my-4">Popular Tech Companies</h2>
        <div className="pb-5 justify-content-center">
          <Row xs={1} sm={2} xl={3} className="g-3">
            {companies.map((company) => (
              <Col xl={3} lg={3} md={6} xs={10} key={company.name} className="mx-auto">
                <ProfilePreviewCard name={company.name} imageURL={company.URL} />
              </Col>
            ))}
          </Row>  
        </div>      
      </main>
    </>
  );
}
