import styles from "./pade.module.css";
import DarkBlurryLayer from "../darkBlurryLayer/DarkBlurryLayer";
import { IoCloseCircle } from "react-icons/io5";
import { useState } from "react";

interface Props {
  information: string;
  openPopBox: (status: boolean) => void;
}
const PopBox = ({ information, openPopBox }: Props) => {
  const [boxOpen, setBoxOpen] = useState(true);
  return (
    <DarkBlurryLayer>
      <div className={`${styles.popBox} ${boxOpen ? styles.open : ""}`}>
        <div className={styles.closingCntainer}>
          <IoCloseCircle
            className={styles.closingIcon}
            onClick={() => {
              openPopBox(false);
              setBoxOpen(false);
            }}
          />
        </div>
        <div className={styles.infoContainer}>
          {" "}
          <p>{information}</p>
        </div>
      </div>
    </DarkBlurryLayer>
  );
};

export default PopBox;
