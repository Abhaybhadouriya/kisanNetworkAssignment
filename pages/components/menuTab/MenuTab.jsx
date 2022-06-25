import React from 'react'
import styles from "./MenuTab.module.css";

const MenuTab = (props) => {
    let outerMenuTab = props.darkMode? styles.outerMenuTabDark :styles.outerMenuTab;
    let innerMenuSelected = props.darkMode?styles.innerMenuSelectedDark:styles.innerMenuSelected;
    let menuText = props.darkMode?styles.menuTextDark:styles.menuText
  return (
    <div className={outerMenuTab}>
     <div onClick={()=>props.setSwipeTabsFunctions()} className={props.swipeTabs?styles.innerMenu:innerMenuSelected} >
     <span className={menuText}>Contacts</span>
     </div>
     <div onClick={()=>props.setSwipeTabsFunctions()} className={props.swipeTabs?innerMenuSelected:styles.innerMenu}> 
     <span className={menuText}>OutBox</span>
     </div>
    
     
    </div>
  )
}

export default MenuTab