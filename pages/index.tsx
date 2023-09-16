import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Col, Container, Row } from 'react-bootstrap';
import ProfileCard from '@/components/ProfileCard';

const inter = Inter({ subsets: ['latin'] });
const companies: string[] = ["APPL", "MSFT", "NVDA", "TSLA", "GOOGL", "AMZN"];

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - BENZINGA</title>
      </Head>
      <main>
        <h1 className="py-4 display-4 text-center fw-bold text-muted">Home Page</h1>
        <Row xs={1} sm={2} xl={3} className="g-4">
          {companies.map((company) => (
            <Col key={company}>
              <ProfileCard companyName={company} />
            </Col>
          ))}
        </Row>        
      </main>
    </>
  );
}
