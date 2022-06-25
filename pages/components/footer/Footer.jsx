import React from "react";
import styles from "./Footer.module.css";

const Footer = (props) => {
  const d = new Date();
  let year = d.getFullYear();
  let outerFooter= props.darkMode?styles.outerFooterDark:styles.outerFooter;
  return (
    <div className={outerFooter}>
      <div className={styles.footerTitleDiv}>
        <img className={styles.FooterIcon} src="./leaf.png" />{" "}
        <span className={styles.FooterTitle}>Kisan Network</span>
      </div>
      <div className={styles.footerYearDiv}>
      <span className={styles.FooterYear}>Copyright <i className="fa fa-copyright" aria-hidden="true"></i> {year} | All Rights Reserved</span>
      </div>
    </div>
  );
};

export default Footer;
