import { Card } from "react-bootstrap";
import styles from "@/styles/app.module.css";

interface ProfilePreviewCardProps {
  companyName: string,
}

const ProfilePreviewCard = ( {companyName} : ProfilePreviewCardProps ) => {
  return (
    <Card className={`${styles.cardDimensions}`} bg="light" text="muted">
      <Card.Body className="d-flex align-items-center justify-content-center">
        <Card.Text className="display-4 text-center">{ companyName }</Card.Text>
      </Card.Body>
    </Card>
  );
}
 
export default ProfilePreviewCard;