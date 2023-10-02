import { Card, ListGroup, Spinner } from "react-bootstrap";
import styles from "@/styles/profilePreviewCard.module.css";
import { GetServerSideProps } from "next";
import { DailyOpenClose, PreviousClose, StockPrices } from "@/models/PolygonResponse";
import { useState, useEffect } from "react";
import { Montserrat } from 'next/font/google'

interface ProfilePreviewCardProps {
  name: string,
  imageURL: string,
  stockData: StockPrices,
}

const montserrat = Montserrat({subsets: ['latin']});

// Below is not working for some reason.
const ProfilePreviewCard = ( {name, imageURL, stockData} : ProfilePreviewCardProps ) => {
  console.log(stockData);
  return (
    // Will configure the anchor tag so it goes to an individual page    
    <Card className={`h-100 border-none shadow ${styles.cardStyles}`} text="white">
      <Card.Img src={imageURL} variant="top" className={`img-fluid ${styles.imageStyles}`} />
      <Card.Body className="mt-2">
        <Card.Title className={`display-5 ${styles.cardTitleStyles} ${montserrat.className}`}>{ name }</Card.Title>
      </Card.Body>
      <ListGroup variant="flush" className={`${styles.listGroupStyles}`}>
        <ListGroup.Item className={`lead ${styles.listItemStyle}`}>Open: <strong>${ stockData.o.toFixed(2) }</strong></ListGroup.Item>
        <ListGroup.Item className={`lead ${styles.listItemStyle}`}>Close: <strong>${ stockData.c.toFixed(2) }</strong></ListGroup.Item>
      </ListGroup>
    </Card>    
  );
}
 
export default ProfilePreviewCard;