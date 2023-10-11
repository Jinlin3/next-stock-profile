import Link from "next/link";
import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "@/styles/IndexCard.module.css";

interface IndexCardProps {
  name: string,
  symbol: string,
  open: number,
  close: number,
}

const IndexCard = ({ name, symbol, open, close }: IndexCardProps) => {
  return (
    <Link href={`/quote/${symbol}`}>
      <Card className={`h-100 p-2 my-1 ${styles.cardStyles}`}>
        <Container>
          <Row xs={1} md={2} xl={4} className={`d-flex align-items-center`}>
            <Col className={`fw-bold`}>{name}</Col>
            <Col className={`fw-bold text-secondary`}>{symbol}</Col>
            <Col className={``}>
              <strong>Open: </strong> ${open.toFixed(2)}
            </Col>
            <Col className={``}>
              <strong>Close: </strong> ${close.toFixed(2)}
            </Col>
          </Row>
        </Container>
      </Card>
    </Link>
  );
}
 
export default IndexCard;