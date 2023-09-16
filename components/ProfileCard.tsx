import { Card } from "react-bootstrap";
import styles from "@/styles/app.module.css";

interface ProfileCardProps {
  companyName: string,
}

const ProfileCard = ( {companyName} : ProfileCardProps ) => {
  return (
    <Card className={`border-primary border-5 ${styles.cardDimensions}`} bg="light" text="muted">
      <Card.Body className="d-flex align-items-center justify-content-center">
        <Card.Text className="display-4 text-center">{ companyName }</Card.Text>
      </Card.Body>
    </Card>
  );
}
 
export default ProfileCard;