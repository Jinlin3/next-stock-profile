import { DailyOpenClose } from "@/models/DailyOpenClose";
import { Card, Container, Row, Col } from "react-bootstrap";

interface StockCardProps {
  stockData: DailyOpenClose,
}

const StockCard = ({ stockData : { from, symbol, open, high, low, close, volume, afterHours, preMarket }}: StockCardProps) => {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title className="display-6">{symbol}</Card.Title>
        <Card.Subtitle className="my-3">From: {from}</Card.Subtitle>
        <Card.Text>Open: {open}</Card.Text>
        <Card.Text>High: {high}</Card.Text>
        <Card.Text>Low: {low}</Card.Text>
        <Card.Text>Close: {close}</Card.Text>
        <Card.Text>Volume: {volume}</Card.Text>
        <Card.Text>After Hours: {afterHours}</Card.Text>
        <Card.Text>Premarket: {preMarket}</Card.Text>
      </Card.Body>
    </Card>
  );
}
 
export default StockCard;