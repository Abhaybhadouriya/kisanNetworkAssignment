import React, { useState, useEffect } from "react";
import styles from "./ContactListcss.module.css";
import myData from "../../../public/contactlist.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Model from "./Model";

const ContactList = (props) => {
  let outerDivClass = props.darkMode
    ? styles.outerDivClassDark
    : styles.outerDivClass;
  let ContactListDiv = props.darkMode
    ? styles.ContactListDivDark
    : styles.ContactListDiv;
  let ContactListDivText = props.darkMode
    ? styles.ContactListDivTextDark
    : styles.ContactListDivText;
  let ContactListButton = props.darkMode
    ? styles.ContactListButtonDark
    : styles.ContactListButton;
  let inputSearch = props.darkMode
    ? styles.inputSearchDark
    : styles.inputSearch;

  useEffect(() => {
    console.log(myData);
  }, []);
  const [search, setsearch] = useState("");
  const changeSearchData = (e) => {
    setsearch(e.target.value);
  };
  const [opendetailsPan, setopendetailsPan] = useState(-1);
  const ChangeOpenDetailsPan = (e) => {
    opendetailsPan === e ? setopendetailsPan(-1) : setopendetailsPan(e);
    console.log(e);
  };

  const [sendData, setsendData] = useState([]);
  const setSendDataFunction = (e) => {
    setsendData(e);
    console.log(sendData);
  };

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className={outerDivClass}>
      <div style={{ padding: 10, display: "flex" }}>
        <input
          onChange={(e) => changeSearchData(e)}
          className={inputSearch}
          placeholder="Search Name"
        />
      </div>
      {myData["data"].map((data, index) => {
        return data["firstName"]
          .toLowerCase()
          .includes(search.toLowerCase()) ? (
          <ListItemType
            ContactListDivText={ContactListDivText}
            ContactListDiv={ContactListDiv}
            data={data}
            key={index}
            index={index}
            setSendDataFunction={setSendDataFunction}
            ContactListButton={ContactListButton}
            opendetailsPan={opendetailsPan}
            setModalShow={setModalShow}
            modalShow={modalShow}
            ChangeOpenDetailsPan={ChangeOpenDetailsPan}
          />
        ) : null;
      })}
      {modalShow ? (
        <Model
          data={sendData}
          darkMode={props.darkMode}
          setModalShow={setModalShow}
        />
      ) : null}
    </div>
  );
};

export default ContactList;

const ListItemType = (data) => {
  return (
    <div style={{ padding: 10 }}>
      <div className={data.ContactListDiv}>
        <div
          style={{ display: "flex", flexDirection: "row" }}
          onClick={() => data.ChangeOpenDetailsPan(data.index)}
        >
          <div
            className={styles.ContactListDivIcon}
            style={{ backgroundColor: getRandomColor() }}
          >
            <span> {data.data["firstName"][0]}</span>
          </div>
          <div className={styles.ContactListDivDetails}>
            <span className={data.ContactListDivText}>
              {data.data["firstName"] + " " + data.data["lastName"]}
            </span>
            <span className={data.ContactListDivText}>
              +{data.data["mobileno"]}
            </span>
          </div>
        </div>
        {data.opendetailsPan === data.index ? (
          <div>
            <hr />{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <span className={data.ContactListDivText}>
                {data.data["city"]}
              </span>
              <button
                onClick={() => {
                  data.setSendDataFunction(data.data), data.setModalShow(true);
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={data.ContactListButton}
              >
                SEND OTP
                <FontAwesomeIcon
                  style={{ width: 18, height: 18 }}
                  icon={faPaperPlane}
                />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

function getRandomColor() {
  const h = Math.floor(Math.random() * 27000);
  const randomColor = `hsl(${h}deg, 50%, 50%)`;
  return randomColor;
}
