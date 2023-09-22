import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import ProfilePreviewCard from '@/components/ProfilePreviewCard';

const inter = Inter({ subsets: ['latin'] });
const companies: string[] = ["APPL", "MSFT", "NVDA", "TSLA", "GOOGL", "AMZN"];

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
        <Alert>This page uses <strong>getServerSideProps</strong> to fetch data server-side on every request. This allows search engines to crawl the page content and <strong>improves SEO</strong>.</Alert>
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
        <div className="pb-5">
          <Row xs={1} sm={2} xl={3} className="g-4">
            {companies.map((company) => (
              <Col key={company}>
                <ProfilePreviewCard companyName={company} />
              </Col>
            ))}
          </Row>  
        </div>      
      </main>
    </>
  );
}
