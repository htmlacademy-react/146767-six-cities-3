import styles from './preloader.module.css';

export default function Preloader() {
  return (
    <div
      className={styles.preloader}
      data-testid="preloader"
      role="status"
    >
      <img
        className={styles.preloader__image}
        src="img/preloader.svg"
        alt="preloader"
      />
      <p className={styles.preloader__text}>
        Loading...
      </p>
    </div>
  );
}
