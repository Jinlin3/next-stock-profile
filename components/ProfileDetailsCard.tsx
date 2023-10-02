import { DailyOpenClose } from "@/models/PolygonResponse";
import { Card, Container, Row, Col } from "react-bootstrap";
import StatsGrid from "./StatsGrid";

interface StockCardProps {
  stockData: DailyOpenClose,
}

const StockDetailsCard = ({ stockData }: StockCardProps) => {
  return (
    <Card className="h-100">
      <Card.Title className="display-6 pt-4 text-center">{ stockData.from }</Card.Title>
      <Card.Body>
        <StatsGrid stockData={stockData}/>
      </Card.Body>
    </Card>
  );
}
 
export default StockDetailsCard;