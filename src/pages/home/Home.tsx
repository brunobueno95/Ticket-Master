import styles from "./page.module.css";
import TicketCreate from "../../components/ticketCreate/TicketCreate";
import LayoutMain from "../../layouts/LayoutMain";
import { useState } from "react";
import PopBox from "../../components/popBox/PopBox";

const Home = () => {
  const [popBox, setPopBox] = useState(false);
  const [information, setInformation] = useState("");
  const openPopBox = (status: boolean) => {
    setPopBox(status);
  };

  const handleInformation = (info: string) => {
    setInformation(info);
  };

  return (
    <LayoutMain>
      <div className={styles.container}>
        <TicketCreate
          openPopBox={openPopBox}
          setInformation={handleInformation}
        />
        {popBox && <PopBox openPopBox={openPopBox} information={information} />}
      </div>
    </LayoutMain>
  );
};

export default Home;
