import { Col, Container, Row } from "react-bootstrap";
import { DailyOpenClose, StockPrices } from "@/models/PolygonResponse";

export interface StatsGridProps {
  stockData: StockPrices,
}

const StatsGrid = ({ stockData }: StatsGridProps) => {
  return (
    <Container fluid>
      <Row xs={1} md={3} xl={3} className="g-2">
        <Col className="lead">
          <div className="bg-secondary text-light text-center p-3 rounded border border-light">Open: ${stockData.o.toFixed(2)}</div> 
        </Col>
        <Col className="lead">
          <div className="bg-secondary text-light text-center p-3 rounded border border-light">High: ${stockData.h.toFixed(2)}</div> 
        </Col>
        <Col className="lead">
          <div className="bg-secondary text-light text-center p-3 rounded border border-light">Low: ${stockData.l.toFixed(2)}</div> 
        </Col>
        <Col className="lead" md={6} lg={4}>
          <div className="bg-secondary text-light text-center p-3 rounded border border-light">Close: ${stockData.c.toFixed(2)}</div> 
        </Col>
        <Col className="lead" md={6} lg={4}>
          <div className="bg-secondary text-light text-center p-3 rounded border border-light">Volume: {(stockData.v / 1000000).toFixed(2)}M</div>
        </Col>
        <Col className="lead" md={6} lg={4}>
          <div className="bg-secondary text-light text-center p-3 rounded border border-light">VWAP: ${stockData.vw.toFixed(2)}</div> 
        </Col>
      </Row>
    </Container>
  );
}
 
export default StatsGrid;