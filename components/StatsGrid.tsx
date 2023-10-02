import { Col, Container, Row } from "react-bootstrap";
import { DailyOpenClose } from "@/models/PolygonResponse";

export interface StatsGridProps {
  stockData: DailyOpenClose,
}

const StatsGrid = ({ stockData : { from, symbol, open, high, low, close, volume, afterHours, preMarket }}: StatsGridProps) => {
  return (
    <Container fluid>
      <Row xs={1} md={3} xl={3} className="g-2">
        <Col className="lead">
          <div className="bg-secondary text-light text-center p-3 rounded border border-light">Open: ${open.toFixed(2)}</div> 
        </Col>
        <Col className="lead">
          <div className="bg-secondary text-light text-center p-3 rounded border border-light">High: ${high.toFixed(2)}</div> 
        </Col>
        <Col className="lead">
          <div className="bg-secondary text-light text-center p-3 rounded border border-light">Low: ${low.toFixed(2)}</div> 
        </Col>
        <Col className="lead" md={6} lg={4}>
          <div className="bg-secondary text-light text-center p-3 rounded border border-light">Close: ${close.toFixed(2)}</div> 
        </Col>
        <Col className="lead" md={6} lg={4}>
          <div className="bg-secondary text-light text-center p-3 rounded border border-light">Volume: {(volume / 1000000).toFixed(2)}M</div>
        </Col>
        <Col className="lead" md={6} lg={4}>
          <div className="bg-secondary text-light text-center p-3 rounded border border-light">After Hours: ${afterHours.toFixed(2)}</div> 
        </Col>
        <Col className="lead" md={6} lg={12} xl={12}>
          <div className="bg-secondary text-light text-center p-3 rounded border border-light">Premarket: ${preMarket.toFixed(2)}</div> 
        </Col>
      </Row>
    </Container>
  );
}
 
export default StatsGrid;