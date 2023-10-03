import { Article } from "@/models/PolygonResponse";
import { Card } from "react-bootstrap";
import styles from '@/styles/articlePreview.module.css'

interface ArticleProps {
  article: Article,
}

const ArticlePreview = ({article}: ArticleProps) => {
  return (
    <a href={ article.article_url }>
      <Card className={`my-3 h-100 ${styles.cardStyles}`}>
      <Card.Img variant="top" src={article.image_url} className={`${styles.cardImgStyles}`}></Card.Img>
        <Card.Body>
          <Card.Title className="fw-bold">{ article.title }</Card.Title>
          <Card.Subtitle>{ article.author }</Card.Subtitle>
        </Card.Body>
      </Card>
    </a>
  );
}
 
export default ArticlePreview;