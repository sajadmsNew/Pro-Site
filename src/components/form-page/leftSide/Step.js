import styles from "./LeftSide.module.scss";
import React from "react";
import { withNamespaces } from "react-i18next";

const Step = ({ index, title, info, isEnabled, t }) => (
  <div className={styles.stepGroup}>
    <div
      className={
        isEnabled ? styles.stepGroupEnabled : styles.stepGroupNotEnabled
      }
    >
      <h2 className={styles.subTitle}>
        {parseInt(index) + 1 + ". " + t(title)}
      </h2>
      <ul>
        {info.map((val, sub_index) => {
          return (
            <li key={sub_index + "_" + index}>
              {" "}
              <span key={"info_" + sub_index + "_" + index}>{t(val)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

export default withNamespaces()(Step);
