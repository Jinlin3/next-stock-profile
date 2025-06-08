import styles from '@/styles/NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.errorMessage}>
      <h1 className="text-center">Data currently unavailable 😵‍💫</h1>
    </div>
  );
}
 
export default NotFoundPage;