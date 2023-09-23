import { Card, Spinner } from "react-bootstrap";
import styles from "@/styles/app.module.css";
import { GetServerSideProps } from "next";
import { DailyOpenClose } from "@/models/DailyOpenClose";
import { useState, useEffect } from "react";

interface ProfilePreviewCardProps {
  name: string,
  imageURL: string,
}

const ProfilePreviewCard = ( {name, imageURL} : ProfilePreviewCardProps ) => {

  // state variables
  const [ data, setData ] = useState<DailyOpenClose | null>(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ dataError, setDataError ] = useState(false);

  // async function that retrieves data
  async function getData( name: string ) {
    try {
        setData(null);
        setIsLoading(true);
        setDataError(false);
        const response = await fetch("/api/search-prices?q=" + name);
        const stockData: DailyOpenClose = await response.json();
        console.log(`error: ${stockData.error}`)
        if (stockData.error) { // handles specific error responses from the API
          console.log("API Error:", stockData.error)
          setDataError(true);
        } else {
          setData(stockData);
          console.log(stockData);
        }
    } catch (error) { // handles other types of errors such as network errors or JSON parsing errors
        console.log(error);
        setDataError(true);
    } finally {
        setIsLoading(false);
    }
  }
  useEffect(() => {
    getData(name);
  }, [name]);
  console.log(`Error?: ${dataError}`);

  return (
    <Card className={`${styles.cardDimensions}`} bg="light" text="muted">
      <Card.Img src={imageURL} variant="top" className={ styles.cardImg } />
      <Card.Body>
        <Card.Title className="display-5">{ name }</Card.Title>
        <Card.Text>
          { isLoading && <Spinner animation="border" /> }
          { dataError && <p>Something went wrong with the API.</p> }
          { data && !dataError && (
            <div>
              <p>Open: ${data.open}</p>
              <p>Close: ${data.close}</p>
            </div>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
 
export default ProfilePreviewCard;