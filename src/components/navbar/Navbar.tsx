import styles from "./page.module.css";
import Ticket from "../../assets/images/ticket.png";

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoAndText}>
        {" "}
        <div className={styles.logoContainer}>
          <img src={Ticket} alt="ticketIcon" className={styles.logo} />
        </div>{" "}
        <p className={styles.powerPhrase}>
          <span className={styles.spanText}> Ticket</span> Master{" "}
        </p>
      </div>

      <div className={styles.linksContainer}>
        <p className={styles.link}>React</p>
        <p className={styles.link}>Typescript</p>
        <p className={styles.link}>UI/UX</p>
      </div>
    </div>
  );
};

export default Navbar;
