import { Card } from "react-bootstrap";
import styles from "@/styles/GraphOffline.module.css";

const GraphOffline = () => {
  return (  
    <Card className={`mt-4 ${styles.cardStyles}`}>
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="text-center text-white mt-2">Graph is Offline</h1>
        <p className="text-center text-white lead mt-1">Due to limitations with <strong>polygon.io&apos;s</strong> free API, the graph cannot be displayed. Please try again later.</p>
      </Card.Body>
    </Card>
  );
}
 
export default GraphOffline;