import styles from '@/styles/NotFoundPage.module.css';

const ServerError = () => {
  return (
    <div className={styles.errorMessage}>
      <h1 className="text-center">500: Internal Server Error</h1>
    </div>
  );
}
 
export default ServerError;