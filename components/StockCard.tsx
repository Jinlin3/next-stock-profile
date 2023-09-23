import { DailyOpenClose } from "@/models/DailyOpenClose";
import { Card, Container, Row, Col } from "react-bootstrap";
import StatsGrid from "./StatsGrid";

interface StockCardProps {
  stockData: DailyOpenClose,
}

const StockCard = ({ stockData }: StockCardProps) => {
  return (
    <Card className="h-100">
      <Card.Title className="display-6 pt-4 text-center">{ stockData.from }</Card.Title>
      <Card.Body>
        <StatsGrid stockData={stockData}/>
      </Card.Body>
    </Card>
  );
}
 
export default StockCard;