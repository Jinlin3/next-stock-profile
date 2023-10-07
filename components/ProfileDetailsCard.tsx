import { DailyOpenClose, StockPrices } from "@/models/PolygonResponse";
import { Card, Container, Row, Col } from "react-bootstrap";
import StatsGrid from "./StatsGrid";
import styles from "@/styles/quote.module.css";

interface StockCardProps {
  stockData: StockPrices,
  date: string,
}

const StockDetailsCard = ({ stockData, date }: StockCardProps) => {
  return (
    <Card className={`h-100 ${styles.cardStyles}`}>
      <Card.Body>
        <StatsGrid stockData={stockData}/>
      </Card.Body>
    </Card>
  );
}
 
export default StockDetailsCard;