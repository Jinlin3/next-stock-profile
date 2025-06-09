import { Card, ListGroup, Spinner } from "react-bootstrap";
import styles from "@/styles/profilePreviewCard.module.css";
import { Montserrat } from 'next/font/google'
import Link from "next/link";

interface ProfilePreviewCardProps {
  name: string,
  imageURL: string,
}

const montserrat = Montserrat({subsets: ['latin']});

// Below is not working for some reason.
const ProfilePreviewCard = ( {name, imageURL} : ProfilePreviewCardProps ) => {
  return (
    // Will configure the anchor tag so it goes to an individual page
    <Link href={`/quote/${name}`}>
      <Card className={`h-100 border-none shadow ${styles.cardStyles}`} text="white">
        <Card.Img src={imageURL} variant="top" className={`img-fluid ${styles.imageStyles}`} />
        <Card.Body className={`pt-4 ${styles.cardBodyStyles}`}>
          <Card.Title className={`display-5 ${styles.cardTitleStyles} ${montserrat.className}`}>{ name }</Card.Title>
        </Card.Body>
      </Card>    
    </Link>
  );
}
 
export default ProfilePreviewCard;