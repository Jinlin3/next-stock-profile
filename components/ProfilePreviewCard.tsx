import { Card, ListGroup, Spinner } from "react-bootstrap";
import styles from "@/styles/profilePreviewCard.module.css";
import { GetServerSideProps } from "next";
import { DailyOpenClose } from "@/models/DailyOpenClose";
import { useState, useEffect } from "react";

interface ProfilePreviewCardProps {
  name: string,
  imageURL: string,
  stockData: DailyOpenClose,
}

// Below is not working for some reason.
const ProfilePreviewCard = ( {name, imageURL, stockData} : ProfilePreviewCardProps ) => {
  return (
    <Card className="h-100" bg="light" text="muted" style={{ width: '18rem' }}>
      <Card.Img src={imageURL} variant="top" className="img-fluid" />
      <Card.Body>
        <Card.Title className="display-5">{ name }</Card.Title>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item className={`lead ${styles.listItemStyle}`}>Open: <strong>${ (stockData.open)?.toFixed(2) }</strong></ListGroup.Item>
        <ListGroup.Item className={`lead ${styles.listItemStyle}`}>Close: <strong>${ stockData.close?.toFixed(2) }</strong></ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
 
export default ProfilePreviewCard;