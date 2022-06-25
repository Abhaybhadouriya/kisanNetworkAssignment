import React,{useState} from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun,faMoon } from '@fortawesome/free-solid-svg-icons'


const Header = (props) => {
  



  let headerOuter = props.darkMode? styles.headerOuterDark:styles.headerOuter
  let title = props.darkMode?styles.headerNameDark:styles.headerName
  let darkModeIcon = props.darkMode?styles.darkModeIconDark:styles.darkModeIcon
  return (
    <div className={headerOuter}>
      <img className={styles.headerIcon} src="./leaf.png" />
      <span className={title}> Kisan Network</span>
      {props.darkMode? <FontAwesomeIcon icon={faMoon}  onClick={()=>props.setDarkModeFunction()}  className={darkModeIcon} />:
      <FontAwesomeIcon icon={faSun}  onClick={()=>props.setDarkModeFunction()}  className={darkModeIcon}/>}
     
             {/* <i onClick={()=>props.setDarkModeFunction()}  className={`${darkModeIcon} ${"fa fa-sun-o"}` } aria-hidden="true"/> */}
    </div>
  );
};

export default Header;
