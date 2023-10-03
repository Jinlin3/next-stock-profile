import { DailyOpenClose, StockPrices } from "@/models/PolygonResponse";
import { Card, Container, Row, Col } from "react-bootstrap";
import StatsGrid from "./StatsGrid";

interface StockCardProps {
  stockData: StockPrices,
  date: string,
}

const StockDetailsCard = ({ stockData, date }: StockCardProps) => {
  return (
    <Card className="h-100">
      <Card.Title className="display-6 pt-4 text-center">{ date }</Card.Title>
      <Card.Body>
        <StatsGrid stockData={stockData}/>
      </Card.Body>
    </Card>
  );
}
 
export default StockDetailsCard;